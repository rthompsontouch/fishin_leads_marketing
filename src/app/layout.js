import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SignupPanel from "../components/SignupPanel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fishin Leads",
  description: "Custom CRM software built for modern businesses.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/Images/brand/fishinleads_favicon_64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        url: "/Images/brand/fishinleads_favicon_large.png",
        sizes: "250x250",
        type: "image/png",
      },
    ],
    shortcut: ["/Images/brand/fishinleads_favicon_64.png"],
    apple: [
      {
        url: "/Images/brand/fishinleads_favicon_large.png",
        sizes: "250x250",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="site-navbar-wrap">
          <Navbar />
        </div>
        <main className="site-main">{children}</main>
        <SignupPanel />
      </body>
    </html>
  );
}
