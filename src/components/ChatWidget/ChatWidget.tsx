import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend, FiCpu } from 'react-icons/fi';
import './ChatWidget.css';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hello! I am Sarthak's AI assistant. Ask me anything about Sarthak's software projects, technical skills, cybersecurity leadership, or education."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Tell me about Sarthak's featured projects",
    "What are his core technical skills?",
    "What is his education and CGPA?",
    "Tell me about his Cybersecurity Club role",
    "How can I get in touch with Sarthak?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages.slice(-4)
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || "I'm sorry, I couldn't generate a response at this moment.";

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      // Fallback local response grounded strictly on Sarthak's resume
      let localFallback = "I'm currently unable to reach the server. However, Sarthak Raju Solanke is a Computer Science undergraduate (B.Tech expected 2027) at SCOE with a 7.8 CGPA, hands-on experience in MERN stack, Gemini API, IoT, and Vice President of the Cybersecurity Club.";
      
      const lower = messageText.toLowerCase();
      if (lower.includes('project') || lower.includes('nexus') || lower.includes('medi')) {
        localFallback = "Sarthak's key projects include:\n• Nexus AI: MERN Stack + Google Gemini API (Prompt-to-visual architecture converter)\n• Medi-4-U: Medicine redistribution platform with Supabase & role-based auth\n• AquaGuard: IoT hostel wastewater management with ESP8266 & flow sensors\n• Smart Walking Stick: Assistive navigation with Raspberry Pi 4, ESP32, YOLOv8 Nano & OCR\n• Dental Clinic Website: Freelance web project for Centre For Advance Dentistry";
      } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
        localFallback = "Sarthak's technical skills:\n• Languages: C, C++, Java, Python, SQL\n• Web: React.js, Node.js, Express.js, HTML, CSS, JavaScript, REST APIs, MERN Stack\n• Databases: MongoDB, MySQL, Supabase\n• IoT: ESP32, ESP8266, Raspberry Pi 4, Sensor Integration\n• AI & Data: Google Gemini API, Power BI, Excel, Data Visualization";
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) {
        localFallback = "You can reach Sarthak directly at:\n• Email: sarthaksolanke71@gmail.com\n• Phone: +91 93591 08321\n• LinkedIn: linkedin.com/in/sarthak-solanke\n• GitHub: github.com/ssolanke22562";
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: localFallback }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-widget-wrapper">
      {/* Floating Action Button */}
      <button
        className={`chat-widget-fab ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI chat assistant"
      >
        <span className="fab-glow-pulse" />
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
        {!isOpen && <span className="fab-badge">AI</span>}
      </button>

      {/* Chat Drawer / Modal Window */}
      {isOpen && (
        <div className="bracket-card chat-modal-window">
          {/* Header */}
          <div className="chat-modal-header">
            <div className="chat-header-info">
              <div className="ai-avatar-icon">
                <FiCpu size={18} />
              </div>
              <div className="ai-header-titles">
                <span className="ai-name">SARTHAK AI ASSISTANT</span>
                <span className="ai-online-tag">
                  <span className="status-dot" /> Online • Grounded in Resume
                </span>
              </div>
            </div>
            <button
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="chat-messages-container">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message-row ${msg.role}`}>
                <div className={`chat-bubble ${msg.role}`}>
                  {msg.content.split('\n').map((line, lIdx) => (
                    <p key={lIdx} className="message-line">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message-row assistant">
                <div className="chat-bubble assistant typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="chat-prompt-chips">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                className="prompt-chip"
                onClick={() => handleSendMessage(p)}
                disabled={isLoading}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Ask about Sarthak's skills, projects..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="chat-input"
            />
            <button
              className="chat-send-btn"
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              aria-label="Send Message"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
