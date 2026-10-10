import type { Metadata } from "next";
import { Schibsted_Grotesk,Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";

const schibsted_grotesk = Schibsted_Grotesk({
  subsets:["latin"],
  variable: "--font-schibsted-grotesk"
})

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian-mono",
});


import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CollabHUB",
  description: "The hub for hackathon and events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibsted_grotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
      >
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
            <LightRays
              raysOrigin="top-center-offset"
              raysColor="#5dfeca"
              raysSpeed={0.5}
              lightSpread={0.9}
              rayLength={1.4}
              followMouse={true}
              mouseInfluence={0.02}
              noiseAmount={0.0}
              distortion={0.01}
              className="custom-rays"
            />
          </div>

        <Navbar />
        <main>
          { children}
        </main>
      </body>
    </html>
  );
}