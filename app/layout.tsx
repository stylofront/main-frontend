import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const siteUrl = "https://stylofront.com";
const title = "StyloFront - Modern Front-End Platform for Developers";
const description = "Modular platform with premium themes and developer tools. Simplify workflows, reduce setup time, and accelerate web development.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["front-end", "web development", "themes", "tools", "React", "Next.js", "UI components", "developer platform"],
  authors: [{ name: "StyloFront" }],
  creator: "StyloFront",
  publisher: "StyloFront",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title,
    description,
    siteName: "StyloFront",
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
        alt: "StyloFront - Modern Front-End Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/ogimage.png"],
    creator: "@stylofront",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-6Y52K4F0CP"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6Y52K4F0CP');
            `}
          </Script>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
