import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <NextTopLoader
          color="#31302E"
          height={3}
          crawl={false}
          showSpinner={false}
          zIndex={1600}
          showAtBottom={false}
        />
        <RootLayout>
        <main>{children}</main>
        </RootLayout> */}
        <Toaster position="top-right"/>
        <main>{children}</main>

      </body>
    </html>
  );
}
