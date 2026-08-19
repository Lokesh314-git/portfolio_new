const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

export const certificatesData = [
  {
    id: "azure-ai-fundamentals",
    title: "Azure AI Fundamentals",
    issuer: "Microsoft",
    year: "2024",
    image: asset("micro-1.jpg"),
    description: "Validates foundational knowledge of artificial intelligence and machine learning concepts and Microsoft Azure AI services.",
    skills: ["AI Fundamentals", "Azure AI", "Machine Learning Concepts"]
  },
  {
    id: "azure-ai-advanced",
    title: "Azure AI Advanced",
    issuer: "Microsoft",
    year: "2024",
    image: asset("micro-2.jpg"),
    description: "Builds on AI fundamentals with practical AI implementation skills, computer vision, and NLP workloads on Azure.",
    skills: ["Azure Cognitive Services", "Custom Vision", "NLP Workloads"]
  },
  {
    id: "xe-conclave",
    title: "Xe-Conclave",
    issuer: "Xebia",
    year: "2024",
    image: asset("Xe-Conclave.jpg"),
    description: "Attended industry tech event focused on emerging technology trends, cloud architecture, and modern software engineering practices.",
    skills: ["Cloud Architecture", "Emerging Tech", "Industry Networking"]
  },
  {
    id: "azure-secure-storage",
    title: "Secure Storage: Azure Files & Blob Storage",
    issuer: "Microsoft",
    year: "2025",
    image: asset("lokesh_3rd.jpg"),
    description: "Demonstrates applied skills in securing Azure storage solutions, including access controls, data encryption, Blob Storage lifecycle management, and security compliance.",
    skills: ["Azure Blob Storage", "Data Protection", "Access Control & Security"]
  }
];
