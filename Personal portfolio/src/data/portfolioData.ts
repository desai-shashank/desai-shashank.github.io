// ============================================================
// PORTFOLIO DATA — Edit this file to update all content
// ============================================================

export const siteConfig = {
  name: "Shashank Desai",
  title: "Data Analytics & Software Developer",
  location: "Ontario, Canada",
  email: "desaishashank7@gmail.com",
  phone: "+1 (289) 783-0756",
  resumePath: "/resume.pdf", // Place your resume PDF in /public/resume.pdf
  links: {
    linkedin: "https://linkedin.com/in/shashankdesai", // Replace with your actual LinkedIn URL
    github: "https://github.com/shashankdesai",         // Replace with your actual GitHub URL
    portfolio: "#",                                       // This site
  },
};

export const heroData = {
  eyebrow: "Data Analyst | Software Developer | Business Intelligence",
  headline: "Building software and turning raw data",
  headlineAccent: "into decisions teams can act on.",
  description:
    "I combine software development and data analytics to build useful technology and transform complex data into actionable insights, dashboards, and business-focused recommendations.",
  ctas: [
    { label: "View My Work", href: "#projects", variant: "primary" as const },
    { label: "Download Resume", href: siteConfig.resumePath, variant: "secondary" as const, download: true },
    { label: "Contact Me", href: "#contact", variant: "ghost" as const },
  ],
};

// The dark "current focus" panel in the hero.
export const focusData = {
  status: "Open to data analyst & software developer roles",
  timezone: "Eastern Time",
  title: "KPI tracking, dashboards, and data-driven web products.",
  description:
    "My work blends analytics and engineering: clean the data, find the story, then build the report or product that puts it in front of the people who decide.",
  pillars: [
    { label: "Analytics", text: "Google Analytics, KPIs & market research" },
    { label: "BI", text: "Power BI, Tableau & Excel dashboards" },
    { label: "Engineering", text: "Full-stack web, REST APIs & .NET" },
  ],
  tools: ["Python", "SQL", "Power BI", "Tableau", "Excel", "R"],
};

export const aboutData = {
  intro: `I'm a Data Analytics professional and Software Developer with a Master's in Data Analytics and a background in Computer Science and Engineering. I'm passionate about bridging the gap between code and data — building robust software while transforming complex datasets into clear, actionable insights.`,
  detailParagraph: `With hands-on experience analyzing KPIs, customer behavior, web and campaign performance, and market trends, I bring a unique combination of strong analytical and technical skills. I thrive in cross-functional environments where I can collaborate with stakeholders to deliver data-driven solutions that make a real impact.`,
  cards: [
    {
      title: "Data Analytics",
      description: "KPI tracking, data visualization, exploratory analysis, and business intelligence reporting.",
      icon: "chart",
    },
    {
      title: "Software Development",
      description: "Full-stack web development, REST APIs, front-end and back-end feature delivery.",
      icon: "code",
    },
    {
      title: "Business Intelligence",
      description: "Power BI, Tableau, dashboards, market research, and stakeholder presentations.",
      icon: "briefcase",
    },
    {
      title: "Web Development",
      description: "HTML, CSS, JavaScript, PHP, .NET — responsive interfaces and SEO optimization.",
      icon: "globe",
    },
  ],
};

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  tags: string[];
  type: "technical" | "professional";
}

export const experienceData: ExperienceItem[] = [
  {
    title: "Data Analyst Intern",
    company: "Happy Cramps",
    location: "Brampton, Ontario, Canada",
    period: "January 2026 – Present",
    responsibilities: [
      "Delivered a market validation and digital optimization project analyzing customer behaviour, sales processes, and customer acquisition opportunities to support business growth.",
      "Tracked and reported key performance indicators (KPIs) using Google Analytics, translating web and campaign data into actionable insights for marketing and leadership teams.",
      "Conducted market and competitor research to evaluate customer acquisition channels, marketing performance, and emerging technology use cases.",
      "Built structured analyses and presented findings and recommendations to stakeholders through business-focused presentations and reports.",
      "Collaborated with cross-functional team members to define reporting requirements and standardize how performance data was measured and communicated.",
    ],
    tags: [
      "Google Analytics",
      "KPI Tracking",
      "Market Research",
      "Customer Behaviour",
      "Data Analysis",
      "Reporting",
      "Stakeholder Presentations",
    ],
    type: "technical",
  },
  {
    title: "Sales Associate",
    company: "Winners",
    location: "Niagara Falls, Canada",
    period: "August 2025 – Present",
    responsibilities: [
      "Cross-trained and worked across multiple store functions, including Zone 1, Zone 2, Cashier, Fitting Room, and Backroom/Warehouse.",
      "Maintained merchandising standards, replenished stock, organized displays, and ensured a clean, organized, customer-ready sales floor.",
      "Processed customer transactions accurately and efficiently using POS systems.",
      "Handled cash and card payments and delivered friendly, efficient customer service.",
      "Assisted customers with sizing and product selection, managed fitting-room traffic, and organized returned merchandise.",
      "Received, sorted, and processed incoming inventory shipments and organized stockroom for efficient retrieval.",
      "Supported loss prevention and safety procedures.",
      "Built strong time-management, teamwork, and customer service skills through consistent rotation across store departments.",
    ],
    tags: [
      "Adaptability",
      "Customer Service",
      "Teamwork",
      "Time Management",
      "Reliability",
      "Fast-Paced Environments",
    ],
    type: "professional",
  },
  {
    title: "Software Developer",
    company: "InfoServOps",
    location: "Vadodara, Gujarat, India",
    period: "February 2024 – July 2024",
    responsibilities: [
      "Developed and maintained in-house web products across front-end and back-end layers, contributing to feature delivery throughout the development lifecycle.",
      "Implemented on-page SEO improvements to increase organic search visibility for company web applications.",
      "Participated in code reviews and team planning sessions, applying feedback to improve code quality and delivery timelines.",
    ],
    tags: [
      "Full-Stack Development",
      "SEO",
      "Code Reviews",
      "Web Applications",
    ],
    type: "technical",
  },
  {
    title: "Software Developer Intern",
    company: "InfoServOps",
    location: "Vadodara, Gujarat, India",
    period: "December 2023 – January 2024",
    responsibilities: [
      "Built responsive user interfaces using HTML, CSS, JavaScript, and PHP, improving usability and consistency across application screens.",
      "Debugged and resolved functional defects to ensure reliable application performance and a seamless end-user experience.",
    ],
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "UI Development",
      "Debugging",
    ],
    type: "technical",
  },
];

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    name: "Programming & Query Languages",
    icon: "terminal",
    skills: ["Python", "SQL", "R", "Java", "C++", "C#", "JavaScript", "PHP", "HTML", "CSS"],
  },
  {
    name: "Data Analytics & BI",
    icon: "chart",
    skills: [
      "Power BI",
      "Tableau",
      "Microsoft Excel",
      "PivotTables",
      "VLOOKUP",
      "Power Query",
      "Google Analytics",
    ],
  },
  {
    name: "Data & Machine Learning",
    icon: "brain",
    skills: [
      "Data Cleaning",
      "Exploratory Data Analysis",
      "Statistical Analysis",
      "Predictive Modeling",
      "Machine Learning",
      "Data Visualization",
      "Big Data Management",
    ],
  },
  {
    name: "Software & Web Development",
    icon: "code",
    skills: [".NET", "Full-Stack Web Development", "REST APIs", "UI/UX Design", "SEO Optimization"],
  },
  {
    name: "Other Technologies",
    icon: "shield",
    skills: ["Cybersecurity", "Kali Linux", "Ethical Hacking", "IoT", "CUDA", "Cloud Computing"],
  },
  {
    name: "Core Competencies",
    icon: "users",
    skills: [
      "KPI Tracking",
      "Business Intelligence Reporting",
      "Market Research",
      "Requirements Gathering",
      "Stakeholder Presentations",
      "Cross-Functional Collaboration",
    ],
  },
];

export interface EducationItem {
  degree: string;
  field?: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  coursework: string[];
  featured: boolean;
}

export const educationData: EducationItem[] = [
  {
    degree: "Master of Data Analytics",
    institution: "University of Niagara Falls Canada",
    location: "Niagara Falls, Ontario",
    period: "2025 – 2026",
    gpa: "3.72 / 4.0",
    coursework: [
      "Data Analytics",
      "Business Intelligence",
      "Machine Learning",
      "Predictive Modeling",
      "Data Visualization",
      "Big Data Management",
      "Statistical Analysis",
    ],
    featured: true,
  },
  {
    degree: "Bachelor of Engineering",
    field: "Computer Science and Engineering",
    institution: "Parul University",
    location: "Vadodara, Gujarat, India",
    period: "2021 – 2024",
    gpa: "7.39 / 10",
    coursework: [
      "Artificial Intelligence",
      "Software Development",
      "Cybersecurity",
      "Cloud Computing",
      "Web Development",
    ],
    featured: false,
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "Parul University",
    location: "Vadodara, Gujarat, India",
    period: "2018 – 2021",
    gpa: "8.75 / 10",
    coursework: [],
    featured: false,
  },
];

export interface Certification {
  name: string;
  provider?: string;   // Add provider when available
  date?: string;        // Add date when available
  credentialId?: string; // Add credential ID when available
  url?: string;          // Add certificate URL when available
}

export const certificationsData: Certification[] = [
  { name: "Python Programming" 
    url: "https://drive.google.com/file/d/1Q0JDu6ffQXvbVt4USvUe5wx55RpqzRb9/view?usp=drive_link",
  },
  { name: "Machine Learning" 
    url: "https://drive.google.com/file/d/1ougNOb755NHU_VYDXcjeMHSEDbDStlAO/view?usp=drive_link",
  },
  { name: "Cyber Security and Applied Ethical Hacking" 
    url: "https://drive.google.com/file/d/1jUWZiVJUhtsxWZknqepEmr3SNiBIiIKh/view?usp=drive_link",
  },
  { name: "Kali Linux" 
    url: "https://drive.google.com/file/d/1FhJJc-5Wy9uenKbUYJ1IY_a_3jngTsAz/view?usp=drive_link",
  },
  { name: "Internet of Things (IoT)" 
    url: "https://drive.google.com/file/d/1Y4Pms-CAgz3ZbaLV8CYysbZmz_RuvyD3/view?usp=drive_link",
  },
];

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string; // Path to project image
  placeholder: boolean;
}

export const projectsData: Project[] = [
  // ============================================================
  // ADD YOUR REAL PROJECTS HERE
  // Example:
  // {
  //   title: "Customer Analytics Dashboard",
  //   description: "Interactive Power BI dashboard analyzing customer behavior and sales KPIs.",
  //   technologies: ["Power BI", "SQL", "Python"],
  //   features: ["Real-time KPI tracking", "Customer segmentation", "Trend analysis"],
  //   githubUrl: "https://github.com/shashankdesai/project-name",
  //   liveUrl: "https://project-demo.com",
  //   image: "/projects/dashboard.png",
  //   placeholder: false,
  // },
  // ============================================================
];

// Sections shown in the navigation. "Projects" is added automatically
// once projectsData has at least one entry.
export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const developerFlowSteps = [
  { label: "IDE / Code", icon: "code", description: "Python, JavaScript, Java, C++, PHP" },
  { label: "API / Backend", icon: "server", description: "REST APIs, .NET, Full-Stack" },
  { label: "Database / SQL", icon: "database", description: "SQL, Data Cleaning, ETL" },
  { label: "Analytics", icon: "chart", description: "EDA, Statistical Analysis, ML" },
  { label: "Visualization", icon: "eye", description: "Power BI, Tableau, Dashboards" },
  { label: "Business Insight", icon: "lightbulb", description: "KPIs, Reports, Decisions" },
];
