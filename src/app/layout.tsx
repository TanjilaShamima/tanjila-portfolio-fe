import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tanjila Akter - Senior Software Engineer | React.js & Next.js Expert",
  description: "Senior Software Engineer with 5 years of experience in React.js, Next.js, Node.js, and TypeScript. Passionate about building scalable, modern web applications.",
  keywords: "Tanjila Akter, Senior Software Engineer, React.js, Next.js, Node.js, TypeScript, MERN Stack, Full Stack Developer, Dhaka Bangladesh",
  authors: [{ name: "Tanjila Akter", url: "https://tanjila-shamima.web.app" }],
  creator: "Tanjila Akter",
  publisher: "Tanjila Akter",
  openGraph: {
    title: "Tanjila Akter - Senior Software Engineer",
    description: "Senior Software Engineer specializing in React.js, Next.js, and modern web technologies. Building scalable applications with 5 years of experience.",
    url: "https://tanjila-shamima.web.app",
    siteName: "Tanjila Akter Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tanjila Akter - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanjila Akter - Senior Software Engineer",
    description: "Senior Software Engineer specializing in React.js, Next.js, and modern web technologies.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://tanjila-shamima.web.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e1b4b" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
