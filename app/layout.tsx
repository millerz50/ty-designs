import WhatsAppBubble from "@/components/WhatsAppBubble"; // ✅ Import the bubble
import { Montserrat } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "TY Designs – Affordable Creative Studio in Zimbabwe",
  description:
    "Explore the creative portfolio of Tinotenda James: Affordable graphic designing, videography, and photoshoots in Zimbabwe. Bold brand identities and modern design.",
  keywords: [
    "TY Designs",
    "Tinotenda James",
    "Graphic Design Zimbabwe",
    "Videography Zimbabwe",
    "Photoshoot Zimbabwe",
    "Affordable Design Services",
    "Brand Identity Zimbabwe",
    "Creative Studio in Zimbabwe",
    "Modern Design Portfolio",
    "Cheap Graphic Design",
    "Cheap Videography",
    "Cheap Photoshoot",
  ],
  openGraph: {
    title: "TY Designs – Affordable Graphic Design & Videography",
    description:
      "View the modern and affordable creative portfolio of Tinotenda James. Graphic Design, Videography & Photoshoots in Zimbabwe.",
    url: "https://ty-designs.vercel.app/",
    siteName: "TY Designs",
    images: [
      {
        url: "https://yourdomain.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "TY Designs – Zimbabwe Creative Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TY Designs – Graphic & Visual Studio in Zimbabwe",
    description:
      "Check out Tinotenda James’ creative portfolio showcasing graphic design, videography, and photoshoots in Zimbabwe.",
    images: ["https://yourdomain.com/preview.jpg"],
    creator: "@your_twitter_handle",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className="bg-white text-black font-montserrat">
        {children}
        <WhatsAppBubble phoneNumber="263780618259" />{" "}
        {/* 💬 Floating WhatsApp Chat */}
      </body>
    </html>
  );
}
