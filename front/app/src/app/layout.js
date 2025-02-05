import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { TokenProvider } from "@/context/tokenContext";

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

export const metadata = {
  title: "E-Market",
  description: "Free time project (Not actual shop)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TokenProvider >
          <Navbar />
          {children}
        </TokenProvider>
      </body>
    </html>
  );
}
