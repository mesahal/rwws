import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import { Toaster } from "../components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// Disable WebSockets in production
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  window.__NEXT_DEV_HMR__ = false;
}

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
    </div>
  );
}
