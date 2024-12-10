import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gift Genie - AI-Powered Gift Recommendations",
  description: "Find the perfect gift for your loved ones with our AI-powered recommendation engine.",
  openGraph: {
    title: "Gift Genie - AI-Powered Gift Recommendations",
    description: "Find the perfect gift for your loved ones with our AI-powered recommendation engine.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gift Genie - AI-Powered Gift Recommendations",
    description: "Find the perfect gift for your loved ones with our AI-powered recommendation engine.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}