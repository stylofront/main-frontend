import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
