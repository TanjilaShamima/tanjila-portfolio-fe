import type { Metadata } from "next";
import { Hind_Siliguri, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
// Bengali glyphs for Bangla posts; Latin text keeps using Plus Jakarta Sans.
const bangla = Hind_Siliguri({ subsets: ["bengali"], weight: ["400", "500", "600", "700"], variable: "--font-bn-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://tanjila-shamima.web.app"),
  title: "Tanjila Akter - Senior Software Engineer | React.js & Next.js Expert",
  description: "Senior Software Engineer with 6+ years of experience in React.js, Next.js, Node.js, and TypeScript. Passionate about building scalable, modern web applications.",
  keywords: "Tanjila Akter, Senior Software Engineer, React.js, Next.js, Node.js, TypeScript, MERN Stack, Full Stack Developer, Dhaka Bangladesh",
  authors: [{ name: "Tanjila Akter", url: "https://tanjila-shamima.web.app" }],
  creator: "Tanjila Akter",
  publisher: "Tanjila Akter",
  openGraph: {
    title: "Tanjila Akter - Senior Software Engineer",
    description: "Senior Software Engineer specializing in React.js, Next.js, and modern web technologies. Building scalable applications with 6+ years of experience.",
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

// Runs before paint so the saved (or system) theme applies without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;if(t==='dark')d.classList.add('dark');d.classList.add('no-transition');window.addEventListener('load',function(){setTimeout(function(){d.classList.remove('no-transition')},50)})}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f7f7f8" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0b0b0d" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${sans.variable} ${mono.variable} ${bangla.variable} font-sans`}>{children}</body>
    </html>
  );
}
