import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yohan Front",
  description: "Application frontend développée avec Next.js et Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
