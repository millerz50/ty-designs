// app/layout.tsx

import { Montserrat } from "next/font/google";
import "./globals.css"; // Assuming you're using global styles

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "TY Designs",
  description: "Creative Portfolio of Tinotenda James",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="bg-white text-black font-montserrat">{children}</body>
    </html>
  );
}
