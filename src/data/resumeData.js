export const resumeData = {
  name: "Mohamed Sinan",
  title: "Full Stack Python Django Developer",
  summary:
    "Full Stack Python Developer specializing in backend development with Python, Django, and Django REST Framework, with hands-on experience building scalable REST APIs and secure, data-driven systems. Strong background in PostgreSQL optimization, API integration, and cloud deployments using AWS and Docker. Proficient in developing responsive React-based frontends that integrate seamlessly with robust backend services, with a focus on performance, reliability, and clean architecture. Applied structured error handling, input validation, and API status codes to improve reliability and maintainability of backend services.",
  resumeUrl: "/Mohamed_Sinan_FullStack.pdf",

  experience: [
    {
      id: 1,
      role: "Python Full Stack Developer",
      company: "Bridgeon Skillvercity LLP",
      location: "Calicut, Kerala",
      period: "2025 – Present",
      highlights: [
        "Engineered and deployed REST APIs using Django & DRF for authentication, data management, and core application workflows",
        "Constructed 8+ responsive UI components using React, Redux, Tailwind CSS, and Bootstrap, improving UI consistency and usability",
        "Established secure access controls using JWT-based authentication and email verification across applications",
        "Enhanced backend performance by optimizing Django ORM queries and PostgreSQL schemas, improving API response times by ~20%",
        "Integrated Razorpay payment gateway and authored documentation for 15+ APIs using Swagger",
        "Applied GitHub-based workflows for version control while collaborating in Agile-style development cycles",
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: "Aivent",
      subtitle: "Universal Event Operating System",
      highlights: [
        "Orchestrated a full-stack AI-driven event platform supporting 3 user roles (vendors, customers, admins) within a unified system",
        "Structured a microservices backend using DRF, PostgreSQL, RabbitMQ, and Docker Compose, reducing feature coupling by ~30%",
        "Delivered a modern frontend with React 19 (Vite) and Tailwind CSS, securing 100% of protected routes via JWT & OAuth",
        "Automated asynchronous workflows using Celery and AWS SQS, improving task execution reliability by ~40%",
        "Provisioned and containerized 5+ services with AWS/Kubernetes-ready configurations",
      ],
    },
    {
      id: 2,
      title: "Resiko",
      subtitle: "AI-Powered Resume Optimization Platform",
      highlights: [
        "Built a multi-agent ATS optimization system using LangGraph and Groq (Llama 3.3) for real-time resume analysis and rewriting",
        "Developed backend services with FastAPI, PostgreSQL, SQLAlchemy, and live progress updates via SSE",
        "Implemented an iterative Plan -> Modify -> Rescore loop to improve ATS scores (0–100) against job descriptions",
        "Added Missing Skills Analyzer and automated PDF/LaTeX resume generation",
        "Created a responsive UI using React (Vite) and Tailwind CSS with transparent decision traces",
      ],
    },
    {
      id: 3,
      title: "HopyfyCart",
      subtitle: "E-Commerce Platform",
      highlights: [
        "Produced a scalable e-commerce interface using React, Redux, and Tailwind CSS, ensuring responsiveness across all screen sizes",
        "Implemented and exposed 10+ RESTful endpoints with Django REST Framework and PostgreSQL, enabling secure Razorpay payments",
        "Launched and optimized the platform on AWS EC2 and S3, reducing asset load latency by ~20%",
      ],
    },
  ],

  education: [
    {
      id: 1,
      degree: "Bachelor of Computer Application (BCA)",
      institution: "Ignou University",
      period: "2025 – Present",
    },
    {
      id: 2,
      degree: "Higher Secondary Education",
      institution: "PKMMHSS Edarikode",
      period: "2023 – 2025",
    },
  ],

  skills: [
    { category: "Backend", items: ["Python", "Django", "Django REST Framework (DRF)", "FastAPI", "SQLAlchemy", "Pydantic", "Celery", "Django Channels"] },
    { category: "AI & LLM", items: ["LangChain", "LangGraph", "Agentic Workflows", "Groq (Llama 3)", "Ollama", "Prompt Engineering", "ATS Optimization"] },
    { category: "Frontend", items: ["React", "Redux", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Axios", "Vitest"] },
    { category: "Databases & Caching", items: ["PostgreSQL", "Django ORM", "Redis"] },
    { category: "Messaging & Async", items: ["RabbitMQ", "Pika", "Celery"] },
    { category: "Cloud & DevOps", items: ["AWS", "Azure", "Docker", "Kubernetes", "Nginx", "Vercel", "Netlify", "Render", "PythonAnywhere"] },
    { category: "Tools & Practices", items: ["Git", "GitHub", "Jira", "Postman", "Swagger (OpenAPI)", "Pytest", "Boto3", "Jinja2", "RESTful API Development", "Microservices Architecture", "API Integration"] },
  ],

  certifications: [
    "Prompt Engineering for Everyone - IBM Developer Skills Network",
    "Generative AI Mastermind - Outskill",
  ],

  contact: {
    email: "mohamedsinan9400@gmail.com",
    phone: "+91 9400 850 450",
    linkedin: "https://linkedin.com/in/mohamedsinann",
    github: "https://github.com/sinan_prvt",
    portfolio: "https://mohamedsinan.vercel.app",
    location: "Malappuram, Kerala",
  },
};
