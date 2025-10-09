import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Trinity Fitness",
  description: "Premium fitness equipment for home and commercial use.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950  antialiased">
        <Navbar />
        <div className="pt-2 px-2 sm:px-2 md:px-2">{children}</div>
      </body>
    </html>
  );
}
