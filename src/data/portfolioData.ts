export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  details: string;
  period?: string;
  score?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  type: 'Internship' | 'Simulation' | 'Leadership';
  duration: string;
  location?: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  tech: string[];
  bullets: string[];
  category: 'Full-Stack' | 'AI & Web' | 'IoT & Embedded' | 'Client Work';
  githubUrl: string; // github.com/ssolanke22562
  liveUrl?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface LeadershipItem {
  role: string;
  organization: string;
  period: string;
  bullets: string[];
}

export interface AchievementItem {
  title: string;
  issuer: string;
  highlight?: string;
  type: 'Award' | 'Rank' | 'Rating' | 'Certification' | 'Proficiency';
}

export const portfolioData = {
  identity: {
    fullName: "Sarthak Raju Solanke",
    shortName: "Sarthak",
    taglines: [
      "Full-Stack (MERN) Developer",
      "AI & Gemini Integrations Builder",
      "IoT & Embedded Systems Engineer",
      "Cybersecurity Club Vice President"
    ],
    rolesSummary: "Full-Stack Developer, AI Integrations & IoT Builder",
    email: "sarthaksolanke71@gmail.com",
    phone: "+91 93591 08321",
    location: "Kopargaon, Maharashtra, India",
    resumeUrl: "/Sarthak_Raju_Solanke.pdf",
    photoUrl: "/profile.jpg",
    socials: {
      github: "https://github.com/ssolanke22562",
      linkedin: "https://linkedin.com/in/sarthak-solanke",
      instagram: "https://instagram.com/_whoissmith",
      email: "mailto:sarthaksolanke71@gmail.com"
    }
  },

  summary: "Computer Science undergraduate (B.Tech, expected 2027) with hands-on experience building full-stack MERN applications, Gemini API integrations and IoT systems. Vice President of the Cybersecurity Club, leading a team of 18+ members and organizing CTF competitions and workshops for 150+ students.",

  whatIDo: [
    {
      id: "full-stack",
      title: "Full-Stack & MERN Engineering",
      subtitle: "Scalable Web Architectures & React UIs",
      description: "Building responsive, modern web applications with React.js, Node.js, Express.js, MongoDB, RESTful APIs, and Supabase. Focused on secure authentication, clean component architecture, and fluid user experiences.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "MERN Stack"]
    },
    {
      id: "ai-systems",
      title: "AI & Gemini API Integrations",
      subtitle: "Prompt Engineering & Intelligent Workflows",
      description: "Integrating Google Gemini API and LLM workflows to automate diagram generation, assist user queries, and optimize machine learning models for data-driven systems.",
      tags: ["Google Gemini API", "LLM Workflows", "Prompt Engineering", "ML Models", "Data Analytics"]
    },
    {
      id: "iot-embedded",
      title: "IoT & Embedded Systems",
      subtitle: "Hardware-Software Sensor Networks",
      description: "Designing real-world hardware systems with ESP32, ESP8266, Raspberry Pi 4, YOLOv8 object detection, ToF sensors, and flow meters for smart automation and assistive technologies.",
      tags: ["ESP32", "ESP8266", "Raspberry Pi 4", "YOLOv8 Nano", "Sensor Integration", "IoT"]
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity & Leadership",
      subtitle: "CTF Competitions & Tech Community",
      description: "Leading an 18+ member executive council as VP of Cyber Security Club. Organizing CTF competitions spanning web exploitation, cryptography, hashing, and steganography for 150+ students.",
      tags: ["CTF Operations", "Web Exploitation", "Steganography", "Executive Council", "Event Anchor"]
    }
  ],

  education: [
    {
      institution: "Sanjivani College of Engineering (SCOE)",
      location: "Kopargaon, Maharashtra",
      degree: "Bachelor of Technology (B.Tech), Computer Science and Engineering",
      details: "CGPA: 7.8/10",
      period: "Expected Graduation: 2027"
    },
    {
      institution: "Rajiv Gandhi Senior College",
      location: "Maharashtra",
      degree: "12th Standard (HSC), Science (PCM)",
      details: "Maharashtra State Board: 74%",
      period: "Higher Secondary"
    },
    {
      institution: "Padmashri Shankar Bapu Apengaokar English School",
      location: "Maharashtra",
      degree: "10th Standard (SSC)",
      details: "Maharashtra State Board: 85%",
      period: "Secondary School"
    }
  ] as EducationItem[],

  experience: [
    {
      role: "AI/ML Engineer Intern",
      company: "Persevex",
      type: "Internship",
      duration: "3 Months",
      bullets: [
        "Developed and optimized machine learning models for data-driven applications to improve system accuracy.",
        "Collaborated with the engineering team to integrate artificial intelligence capabilities into existing platforms."
      ]
    },
    {
      role: "AI Intern",
      company: "Unprof.Ai",
      type: "Internship",
      duration: "1 Month",
      bullets: [
        "Assisted in the research, testing, and implementation of core artificial intelligence features and prompt engineering workflows.",
        "Evaluated Large Language Model (LLM) integrations to enhance the reliability and quality of automated responses."
      ]
    },
    {
      role: "Data Analytics Virtual Experience",
      company: "Deloitte (Forage)",
      type: "Simulation",
      duration: "1 Week",
      location: "Remote",
      bullets: [
        "Extracted and cleansed raw datasets to uncover actionable business insights.",
        "Created data visualizations to communicate strategic recommendations for decision-making."
      ]
    },
    {
      role: "Quantitative Research Virtual Experience",
      company: "JPMorgan Chase & Co. (Forage)",
      type: "Simulation",
      duration: "1 Week",
      location: "Remote",
      bullets: [
        "Applied mathematical modeling and quantitative analysis to evaluate financial datasets and market trends.",
        "Analyzed quantitative trading strategies using data-driven financial methodologies."
      ]
    }
  ] as ExperienceItem[],

  projects: [
    {
      id: "nexus-ai",
      title: "Nexus AI",
      tagline: "Prompt-to-Visual Architecture Platform",
      tech: ["MERN Stack", "Google Gemini API", "React.js", "Node.js", "Express.js", "MongoDB"],
      category: "AI & Web",
      bullets: [
        "Built an AI-powered web application that converts text prompts into detailed visual architectures using the Google Gemini API, reducing manual charting time.",
        "Designed a clean, responsive React interface that streamlines the prompt-to-visualization workflow."
      ],
      githubUrl: "https://github.com/ssolanke22562",
      liveUrl: undefined
    },
    {
      id: "medi-4-u",
      title: "Medi-4-U (Medicine Redistribution Platform)",
      tagline: "Bridging Donors, NGOs & Beneficiaries",
      tech: ["HTML", "CSS", "JavaScript", "Supabase", "Role-Based Auth", "Real-Time Inventory"],
      category: "Full-Stack",
      bullets: [
        "Developed a platform connecting donors, NGOs and beneficiaries, supporting the management of 100+ medicine listings.",
        "Implemented secure role-based authentication with Supabase to protect data and transactions across distinct user types.",
        "Built a real-time inventory and order management dashboard with automated inventory updates, reducing manual tracking effort."
      ],
      githubUrl: "https://github.com/ssolanke22562",
      liveUrl: undefined
    },
    {
      id: "aquaguard",
      title: "AquaGuard",
      tagline: "Hostel Wastewater Management System",
      tech: ["IoT", "ESP8266", "YF-S201 Flow Sensor", "C++", "Hardware Design"],
      category: "IoT & Embedded",
      bullets: [
        "Designed an IoT-based wastewater management system for a hostel using an ESP8266 microcontroller and a YF-S201 flow sensor to measure water flow.",
        "Documented the system design, components and working in a detailed project report."
      ],
      githubUrl: "https://github.com/ssolanke22562",
      liveUrl: undefined
    },
    {
      id: "smart-walking-stick",
      title: "Smart Walking Stick for Visually Impaired",
      tagline: "Assistive Hybrid Navigation & Computer Vision",
      tech: ["Raspberry Pi 4", "ESP32", "YOLOv8 Nano", "OCR", "Ultrasonic & ToF Sensors", "GPS/GSM"],
      category: "IoT & Embedded",
      bullets: [
        "Designed a hybrid architecture: Raspberry Pi 4 for camera-based object detection (YOLOv8 Nano), OCR and voice output; ESP32 for ultrasonic and ToF obstacle sensing, vibration alerts, GPS and GSM.",
        "Authored a literature review on assistive navigation technology for visually impaired users."
      ],
      githubUrl: "https://github.com/ssolanke22562",
      liveUrl: undefined
    },
    {
      id: "dental-clinic",
      title: "Dental Clinic Website",
      tagline: "Freelance Client Project – Centre For Advance Dentistry",
      tech: ["Web Development", "HTML5", "CSS3", "JavaScript", "Online Booking"],
      category: "Client Work",
      bullets: [
        "Developing a website for Centre For Advance Dentistry with clinic information, online appointment booking, patient success stories and a contact page."
      ],
      githubUrl: "https://github.com/ssolanke22562",
      liveUrl: undefined
    }
  ] as ProjectItem[],

  skills: {
    categories: [
      {
        name: "Programming Languages",
        skills: ["C", "C++", "Java", "Python", "SQL"]
      },
      {
        name: "Web Development",
        skills: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "REST APIs", "MERN Stack"]
      },
      {
        name: "Databases",
        skills: ["MongoDB", "MySQL", "Supabase"]
      },
      {
        name: "IoT & Embedded",
        skills: ["ESP32", "ESP8266", "Raspberry Pi", "Sensor Integration"]
      },
      {
        name: "AI & Data",
        skills: ["Google Gemini API", "Microsoft Power BI", "Microsoft Excel", "Data Visualization"]
      },
      {
        name: "Core Concepts",
        skills: ["Data Structures & Algorithms (DSA)", "Object-Oriented Programming (OOP)", "DBMS", "Operating Systems", "Computer Networks", "Cybersecurity (CTF)", "Agile Development"]
      },
      {
        name: "Tools & Platforms",
        skills: ["Git", "GitHub", "Google Workspace"]
      }
    ] as SkillCategory[],
    physicsBalls: [
      { name: "React.js", color: "#61dafb", textColor: "#000" },
      { name: "Node.js", color: "#68a063", textColor: "#fff" },
      { name: "JavaScript", color: "#f7df1e", textColor: "#000" },
      { name: "Python", color: "#3776ab", textColor: "#fff" },
      { name: "C++", color: "#00599c", textColor: "#fff" },
      { name: "Java", color: "#e76f00", textColor: "#fff" },
      { name: "Gemini API", color: "#8b5cf6", textColor: "#fff" },
      { name: "MongoDB", color: "#47a248", textColor: "#fff" },
      { name: "Supabase", color: "#3ecf8e", textColor: "#000" },
      { name: "ESP32", color: "#e73525", textColor: "#fff" },
      { name: "Raspberry Pi", color: "#c51a4a", textColor: "#fff" },
      { name: "Git", color: "#f05032", textColor: "#fff" },
      { name: "SQL", color: "#00758f", textColor: "#fff" },
      { name: "Power BI", color: "#f2c811", textColor: "#000" }
    ]
  },

  leadership: [
    {
      role: "Vice President",
      organization: "Cyber Security Club (CSC), Sanjivani College of Engineering",
      period: "2023 – Present",
      bullets: [
        "Organize cybersecurity workshops, awareness events and Capture The Flag (CTF) competitions attended by 150+ students; CTF rounds covered hashing, steganography and web exploitation.",
        "Manage an Executive Council of 18+ members, overseeing event logistics and formal institutional communication, including budget sanction requests."
      ]
    },
    {
      role: "Lead Anchor",
      organization: "Student Alumni Relations Cell (SARC) & Entrepreneur Development Cell (EDC), SCOE",
      period: "2023 – Present",
      bullets: [
        "Serve as principal anchor for institutional events with 300+ attendees, demonstrating public speaking and audience engagement.",
        "Foster student–alumni networks and promote an entrepreneurial culture across the campus."
      ]
    }
  ] as LeadershipItem[],

  achievements: [
    {
      title: "8th Rank (National Top 10)",
      issuer: "HackIndia Spark-12 Hackathon",
      highlight: "Out of 100+ participants nationwide",
      type: "Rank"
    },
    {
      title: "1st Prize Winner",
      issuer: "Brains and Bots Presentation Competition",
      highlight: "Sanjivani College of Engineering",
      type: "Award"
    },
    {
      title: "5-Star Rating in 5 Domains",
      issuer: "HackerRank",
      highlight: "SQL, Java, Python, C++, and Problem Solving",
      type: "Rating"
    },
    {
      title: "Introduction to C++",
      issuer: "SkillUp via Simplilearn",
      type: "Certification"
    },
    {
      title: "Gemini for Google Workspace",
      issuer: "Google Cloud & Simplilearn",
      type: "Certification"
    },
    {
      title: "Power BI Data Visualization",
      issuer: "OfficeMaster",
      type: "Certification"
    },
    {
      title: "C Programming",
      issuer: "Digitize IT Station",
      type: "Certification"
    },
    {
      title: "NPTEL Employment Communication",
      issuer: "NPTEL (Score: 70%)",
      type: "Proficiency"
    },
    {
      title: "EF SET English Proficiency",
      issuer: "EF SET (B2 Level Proficient)",
      type: "Proficiency"
    }
  ] as AchievementItem[]
};
