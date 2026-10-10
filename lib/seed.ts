import mongoose from "mongoose";
import "@next/env";
import { loadEnvConfig } from "@next/env";
import Event from "../database/event.model";

loadEnvConfig(process.cwd());

const sampleEvents = [
  {
    title: "React Summit US 2025",
    slug: "react-summit-us-2025",
    description: "The biggest React conference in the US bringing together engineers and leaders from around the world.",
    overview: "Join thousands of React developers in San Francisco for talks on React Server Components, Turbopack, Compiler, and AI in frontend.",
    image: "/images/event1.png",
    venue: "Moscone Center",
    location: "San Francisco, CA, USA",
    date: "2026-11-07",
    time: "09:00",
    mode: "In-Person",
    audience: "Frontend Engineers, Full-Stack Developers, Tech Leads",
    agenda: ["Keynote: Future of React", "Deep Dive: React Compiler", "Server Components in Practice", "Networking & Afterparty"],
    organizer: "GitNation",
    tags: ["React", "JavaScript", "Frontend", "WebDev"],
  },
  {
    title: "KubeCon + CloudNativeCon Europe 2026",
    slug: "kubecon-cloudnativecon-eu-2026",
    description: "The Cloud Native Computing Foundation flagship conference gathering adopters and technologists from leading open source communities.",
    overview: "Explore Kubernetes architectures, service meshes, eBPF, and cloud native storage and monitoring.",
    image: "/images/event2.png",
    venue: "Messe Wien Exhibition Congress Center",
    location: "Vienna, Austria",
    date: "2026-03-18",
    time: "10:00",
    mode: "Hybrid",
    audience: "DevOps Engineers, SREs, Platform Engineers, Cloud Architects",
    agenda: ["CNCF Keynotes", "Kubernetes Scaling Best Practices", "GitOps at Enterprise Scale", "Cloud Native Security Summit"],
    organizer: "Cloud Native Computing Foundation (CNCF)",
    tags: ["Kubernetes", "DevOps", "Cloud", "Docker"],
  },
  {
    title: "AWS re:Invent 2025",
    slug: "aws-reinvent-2025",
    description: "Amazon Web Services annual global learning conference featuring keynote announcements, training, and technical sessions.",
    overview: "Learn about the newest AWS services, generative AI capabilities on Bedrock, serverless compute, and database innovations.",
    image: "/images/event3.png",
    venue: "The Venetian",
    location: "Las Vegas, NV, USA",
    date: "2026-12-01",
    time: "08:30",
    mode: "In-Person",
    audience: "Cloud Engineers, Solution Architects, Developers, Executives",
    agenda: ["CEO Keynote: Cloud Innovations", "Hands-on Builders Sessions", "AI/ML Breakout Tracks", "re:Play Party"],
    organizer: "Amazon Web Services",
    tags: ["AWS", "Cloud", "Serverless", "AI"],
  },
  {
    title: "Next.js Conf 2025",
    slug: "nextjs-conf-2025",
    description: "The premier global conference for Next.js and React developers hosted by Vercel.",
    overview: "Discover what is new in Next.js, Turbopack, Partial Prerendering, and caching innovations.",
    image: "/images/event4.png",
    venue: "Bangalore International Exhibition Centre",
    location: "Banglore, INDIA (Hybrid)",
    date: "2026-11-12",
    time: "09:30",
    mode: "Hybrid",
    audience: "Next.js Developers, Web Architects, Full-Stack Engineers",
    agenda: ["Opening Keynote by Guillermo Rauch", "Turbopack Deep Dive", "Building Fast Apps with Cache Components", "Community Lightning Talks"],
    organizer: "Vercel",
    tags: ["Next.js", "Vercel", "Turbopack", "React"],
  },
  {
    title: "Google Cloud Next 2026",
    slug: "google-cloud-next-2026",
    description: "Google Cloud flagship gathering showcasing the latest in generative AI, cloud infrastructure, and enterprise data solutions.",
    overview: "Connect with Google experts and discover breakthroughs in Gemini, Vertex AI, Kubernetes Engine, and BigQuery.",
    image: "/images/event5.png",
    venue: "Jio World Convention Centre",
    location: "Mumbai, INDIA",
    date: "2026-04-07",
    time: "09:00",
    mode: "In-Person",
    audience: "Cloud Practitioners, Data Scientists, Software Developers",
    agenda: ["Google Cloud Keynote", "Generative AI Showcase", "Hands-on Labs", "Developer Zone Meetups"],
    organizer: "Google Cloud",
    tags: ["Google Cloud", "AI", "Gemini", "BigData"],
  },
  {
    title: "ETHGlobal Hackathon: Paris 2026",
    slug: "ethglobal-paris-2026",
    description: "The world leading Web3 and Ethereum hackathon bringing together builders, founders, and protocols.",
    overview: "Hack for 36 hours with mentorship from top protocol developers, prizes, and demo sessions in the heart of Paris.",
    image: "/images/event6.png",
    venue: "Palais Brongniart",
    location: "Paris, France",
    date: "2026-07-10",
    time: "10:00",
    mode: "In-Person",
    audience: "Web3 Builders, Smart Contract Engineers, Designers, Founders",
    agenda: ["Opening Ceremony & Team Formation", "36-Hour Hackathon", "Workshops by Sponsor Protocols", "Judging & Closing Demos"],
    organizer: "ETHGlobal",
    tags: ["Web3", "Ethereum", "Hackathon", "Solidity"],
  },
  {
    title: "Open Source Summit North America 2026",
    slug: "oss-na-2026",
    description: "The premier event for open source developers, technologists, and community leaders to collaborate and learn.",
    overview: "Covering Linux kernel, open source AI, supply chain security, and open source community leadership.",
    image: "/images/event-full.png",
    venue: "Vancouver Convention Centre",
    location: "Vancouver, Canada",
    date: "2026-06-22",
    time: "09:00",
    mode: "In-Person",
    audience: "Open Source Maintainers, Systems Engineers, Linux Developers",
    agenda: ["Linux Foundation Keynotes", "Kernel Internals Track", "Open Source AI & Data", "Community Reception"],
    organizer: "The Linux Foundation",
    tags: ["OpenSource", "Linux", "Community", "Security"],
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set!");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  for (const eventData of sampleEvents) {
    await Event.findOneAndUpdate(
      { slug: eventData.slug },
      { $set: eventData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`Seeded event: ${eventData.title}`);
  }

  console.log("Seeding finished successfully!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
