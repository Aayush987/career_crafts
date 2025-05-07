import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Provider from "./Provider";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio Hub",
  description: "Create Personalized portfolios without any code",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
        <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
      >
        <div>
          <Provider>
            {children}
          </Provider>
          <ToastContainer />
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
