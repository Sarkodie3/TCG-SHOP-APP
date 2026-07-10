import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CartProvider from "@/context/CartContext";
import Chatbot from "@/components/Chatbot/Chatbot";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "TCG SHOP KASUMI | Japanese TCG Store",
  description:
    "Japanese Pokémon & ONE PIECE Cards for sale. Booster BOX & Case, Single Cards, Grading Cards, Deck Set, and more. Factory sealed, worldwide shipping.",
  keywords:
    "Pokémon cards, One Piece cards, Japanese TCG, Booster Box, Single Cards, Grading, Dragon Ball cards, Disney Lorcana",
  openGraph: {
    title: "TCG SHOP KASUMI | Japanese TCG Store",
    description:
      "Japanese Pokémon & ONE PIECE Cards for sale. Booster BOX & Case, Single Cards, Grading Cards, Deck Set, etc.",
    type: "website",
    url: "https://tcgshoKasumi.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <Chatbot />
        </CartProvider>
      </body>
    </html>
  );
}
