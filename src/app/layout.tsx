import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yohan Front',
  description: 'Portfolio professionnel de Yohan Doens',
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
