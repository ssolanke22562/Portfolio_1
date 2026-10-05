import React, { useState, useEffect, useCallback } from 'react';
import { Chess, Square, PieceSymbol, Color } from 'chess.js';
import { AnimatedTitle } from '../Common/AnimatedText';
import { Magnetic } from '../Common/Magnetic';
import { FiRefreshCw, FiRotateCcw, FiAward } from 'react-icons/fi';
import './ChessArena.css';

type Difficulty = 'Beginner' | 'Intermediate' | 'Master';

// Pure helper minimax evaluator for embedded chess bot
const evaluateBoard = (g: Chess): number => {
  const pieceValues: Record<PieceSymbol, number> = {
    p: 10,
    n: 30,
    b: 30,
    r: 50,
    q: 90,
    k: 900
  };

  let totalEvaluation = 0;
  const currentBoard = g.board();
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = currentBoard[r][c];
      if (piece) {
        const val = pieceValues[piece.type];
        totalEvaluation += piece.color === 'w' ? val : -val;
      }
    }
  }
  return totalEvaluation;
};

const minimax = (g: Chess, depth: number, alpha: number, beta: number, isMaximizing: boolean): number => {
  if (depth === 0 || g.isGameOver()) {
    return -evaluateBoard(g);
  }

  const moves = g.moves({ verbose: true });

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      g.move(move);
      const evaluation = minimax(g, depth - 1, alpha, beta, false);
      g.undo();
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      g.move(move);
      const evaluation = minimax(g, depth - 1, alpha, beta, true);
      g.undo();
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

export const ChessArena: React.FC = () => {
  const [game, setGame] = useState<Chess>(() => new Chess());
  const [board, setBoard] = useState(game.board());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('Intermediate');
  const [isThinking, setIsThinking] = useState(false);
  const [gameStatus, setGameStatus] = useState<string>('Your turn (White)');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  const updateStatus = useCallback((currentGame: Chess) => {
    if (currentGame.isCheckmate()) {
      setGameStatus(`Checkmate! ${currentGame.turn() === 'w' ? 'Black (AI)' : 'White (You)'} wins!`);
    } else if (currentGame.isDraw()) {
      setGameStatus('Draw / Stalemate!');
    } else if (currentGame.inCheck()) {
      setGameStatus(`Check! (${currentGame.turn() === 'w' ? 'White' : 'Black'})`);
    } else {
      setGameStatus(currentGame.turn() === 'w' ? 'Your turn (White)' : "AI is thinking (Black)...");
    }
  }, []);

  const makeBotMove = useCallback(() => {
    if (game.isGameOver()) return;

    setIsThinking(true);
    setTimeout(() => {
      const moves = game.moves({ verbose: true });
      if (moves.length === 0) {
        setIsThinking(false);
        return;
      }

      let chosenMove = moves[0];

      if (difficulty === 'Beginner') {
        const captureMoves = moves.filter(m => m.captured);
        if (captureMoves.length > 0 && Math.random() > 0.4) {
          chosenMove = captureMoves[Math.floor(Math.random() * captureMoves.length)];
        } else {
          chosenMove = moves[Math.floor(Math.random() * moves.length)];
        }
      } else {
        const depth = difficulty === 'Master' ? 3 : 2;
        let bestVal = -Infinity;
        const shuffledMoves = [...moves].sort(() => Math.random() - 0.5);

        for (const move of shuffledMoves) {
          game.move(move);
          const evaluation = minimax(game, depth - 1, -Infinity, Infinity, false);
          game.undo();

          if (evaluation > bestVal) {
            bestVal = evaluation;
            chosenMove = move;
          }
        }
      }

      game.move(chosenMove);
      setBoard([...game.board()]);
      setMoveHistory(game.history());
      updateStatus(game);
      setIsThinking(false);
    }, 350);
  }, [game, difficulty, updateStatus]);

  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    if (isThinking || game.isGameOver()) return;

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const square = `${files[colIndex]}${ranks[rowIndex]}` as Square;
    const piece = board[rowIndex][colIndex];

    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setPossibleMoves([]);
        return;
      }

      const move = game.move({
        from: selectedSquare,
        to: square,
        promotion: 'q'
      });

      if (move) {
        setBoard([...game.board()]);
        setMoveHistory(game.history());
        setSelectedSquare(null);
        setPossibleMoves([]);
        updateStatus(game);

        if (!game.isGameOver()) {
          makeBotMove();
        }
        return;
      }
    }

    if (piece && piece.color === 'w') {
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true });
      setPossibleMoves(moves.map(m => m.to as Square));
    } else {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setBoard(newGame.board());
    setSelectedSquare(null);
    setPossibleMoves([]);
    setMoveHistory([]);
    setIsThinking(false);
    updateStatus(newGame);
  };

  const undoMove = () => {
    if (isThinking) return;
    game.undo();
    game.undo();
    setBoard([...game.board()]);
    setMoveHistory(game.history());
    setSelectedSquare(null);
    setPossibleMoves([]);
    updateStatus(game);
  };

  const renderPieceSymbol = (type: PieceSymbol, color: Color) => {
    const symbols: Record<PieceSymbol, { w: string; b: string }> = {
      p: { w: '♙', b: '♟' },
      r: { w: '♖', b: '♜' },
      n: { w: '♘', b: '♞' },
      b: { w: '♗', b: '♝' },
      q: { w: '♕', b: '♛' },
      k: { w: '♔', b: '♚' }
    };
    return symbols[type][color];
  };

  useEffect(() => {
    updateStatus(game);
  }, [game, updateStatus]);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  return (
    <section id="chess" className="section chess-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>09 // STRATEGY & LOGIC</span>
          </div>
          <AnimatedTitle className="section-title">
            CHALLENGE MY CHESS BOT
          </AnimatedTitle>
          <p className="section-subtitle">
            Test your tactical intuition against a built-in neural chess engine.
          </p>
        </div>

        <div className="chess-arena-layout">
          {/* Main Board Container */}
          <div className="bracket-card chess-board-card">
            <div className="chess-board">
              {board.map((row, rIdx) => (
                <div key={rIdx} className="chess-row">
                  {row.map((piece, cIdx) => {
                    const square = `${files[cIdx]}${ranks[rIdx]}` as Square;
                    const isDark = (rIdx + cIdx) % 2 === 1;
                    const isSelected = selectedSquare === square;
                    const isPossible = possibleMoves.includes(square);

                    return (
                      <div
                        key={cIdx}
                        className={`chess-cell ${isDark ? 'dark' : 'light'} ${
                          isSelected ? 'selected' : ''
                        } ${isPossible ? 'possible-move' : ''}`}
                        onClick={() => handleSquareClick(rIdx, cIdx)}
                      >
                        {cIdx === 0 && <span className="cell-coord rank">{ranks[rIdx]}</span>}
                        {rIdx === 7 && <span className="cell-coord file">{files[cIdx]}</span>}

                        {isPossible && !piece && <span className="move-indicator-dot" />}
                        {isPossible && piece && <span className="capture-indicator-ring" />}

                        {piece && (
                          <span
                            className={`chess-piece ${piece.color === 'w' ? 'white' : 'black'}`}
                          >
                            {renderPieceSymbol(piece.type, piece.color)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Controls & Game State Sidebar */}
          <div className="bracket-card chess-sidebar-card">
            <div className="chess-status-banner">
              <div className="status-indicator">
                <span className={`status-led ${isThinking ? 'thinking' : ''}`} />
                <span className="status-label">{gameStatus}</span>
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="chess-control-group">
              <label className="control-title">BOT DIFFICULTY</label>
              <div className="difficulty-pills">
                {(['Beginner', 'Intermediate', 'Master'] as Difficulty[]).map((level) => (
                  <button
                    key={level}
                    className={`diff-pill ${difficulty === level ? 'active' : ''}`}
                    onClick={() => setDifficulty(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Controls */}
            <div className="chess-btn-actions">
              <Magnetic strength={0.3}>
                <button className="btn-secondary chess-action-btn" onClick={undoMove}>
                  <FiRotateCcw size={16} />
                  <span>Undo Move</span>
                </button>
              </Magnetic>
              <Magnetic strength={0.3}>
                <button className="btn-primary chess-action-btn" onClick={resetGame}>
                  <FiRefreshCw size={16} />
                  <span>New Game</span>
                </button>
              </Magnetic>
            </div>

            {/* Move History */}
            <div className="move-history-panel">
              <div className="history-header">
                <FiAward className="meta-icon" />
                <span>MOVE HISTORY ({moveHistory.length} moves)</span>
              </div>
              <div className="history-log">
                {moveHistory.length === 0 ? (
                  <span className="history-empty">Make your first move on the board.</span>
                ) : (
                  <div className="history-chips">
                    {moveHistory.map((m, idx) => (
                      <span key={idx} className="move-chip">
                        {idx % 2 === 0 ? `${Math.floor(idx / 2) + 1}. ` : ''}
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
