import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My 🩷 Phong - Wedding Invitation | 28/12/2025",
  description: "Join us for our special day of love and celebration in Nam Dinh. Interactive wedding invitation with all the details you need.",
  keywords: ["wedding", "invitation", "Phong", "My", "28/12/2025"],
  authors: [{ name: "Phong Vũ" }],
  metadataBase: new URL('https://phongvudai.github.io/our-day'),
  openGraph: {
    title: "My 🩷 Phong - Wedding Invitation",
    description: "You're invited to celebrate our union on 28/12/2025 in Nam Dinh",
    type: "website",
    images: [
      {
        url: "/our-day/images/DP006368_1.avif",
        width: 1200,
        height: 630,
        alt: "My & Phong Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My 🩷 Phong - Wedding Invitation",
    description: "Join us for our special day - 28/12/2025",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FC46AA',
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
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Great+Vibes&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/our-day/images/DP006368_1.avif" />
        <link rel="preload" as="image" href="/our-day/images/DP006509_1.avif" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
