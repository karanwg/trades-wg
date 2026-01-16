import type { Metadata } from "next";
import "./globals.css";
import { QuestionProvider } from "@/lib/sequencing/context";

export const metadata: Metadata = {
  title: "Sequence Question",
  description: "Master procedural skills through interactive sequencing questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <QuestionProvider>
          {children}
        </QuestionProvider>
      </body>
    </html>
  );
}
