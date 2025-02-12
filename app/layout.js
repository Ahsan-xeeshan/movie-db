import CustomHead from "@/components/Home/CustomHead";
import Navbar from "@/components/Navbar";
import { dbConnect } from "@/services/mongo";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Movies - MOVIE DB",
  description: "A complete entertainment arena",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <AuthProvider>
          <CustomHead />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
