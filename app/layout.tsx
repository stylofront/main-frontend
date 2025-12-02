import type { Metadata } from "next";
import { Script } from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "StyloFront - Developer Toolkit",
  description: "Developer toolkit for StyloFront",
  icons: {
    icon: "/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo2.png" type="image/png" />
      </head>
      <body
        className={`antialiased`}
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
      </body>
    </html>
  );
}
