import "./globals.css";
import "./responsive.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CartProvider from "@/context/CartContext";
import Chatbot from "@/components/Chatbot/Chatbot";

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
    <html lang="en">
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
