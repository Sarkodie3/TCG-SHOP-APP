"use client";
import { useState, useRef, useEffect } from "react";

// =====================================================
// KNOWLEDGE BASE — built from site content
// =====================================================
const KB = [
  {
    keywords: ["shipping", "delivery", "ship", "how long", "dispatch", "arrive", "international"],
    reply: `📦 **Shipping Info:**
• Orders dispatch within **2–5 business days** from Japan (next business day after payment).
• Weekends & Japanese public holidays: processed the next business day.
• Estimated delivery times:
  — USA & Canada: 7–14 days
  — Europe: 10–18 days
  — Australia & NZ: 7–12 days
  — Asia: 5–10 days
  — Rest of World: 14–21 days
• All orders include full tracking. 🌍`,
  },
  {
    keywords: ["duty", "duties", "tax", "vat", "customs", "tariff", "import fee"],
    reply: `✅ **Duties & Taxes:**
All duties, VAT, and import fees are **collected at checkout** for most supported countries — zero surprise charges at delivery!

For EU countries, VAT is automatically calculated based on your country's rate (17%–27%). For unsupported countries, your local customs may collect fees upon arrival.`,
  },
  {
    keywords: ["refund", "return", "exchange", "money back", "wrong item", "damaged"],
    reply: `↩️ **Returns & Refunds:**
We accept returns within **7 days** of receiving your order if:
• Item is significantly not as described
• Item arrived damaged in transit
• Wrong item was sent

❌ **Cannot be returned:**
• Opened booster boxes / sealed products
• Items damaged by the customer

To request a return, contact us with your order number + photos. Refunds process in 5–10 business days.`,
  },
  {
    keywords: ["condition", "grade", "nm", "near mint", "excellent", "very good", "played", "grading standard"],
    reply: `📋 **Card Condition Grades:**
• **NM (Near Mint)** — Virtually no wear, barely visible factory marks
• **EX (Excellent)** — Minor edge/corner wear, clean face
• **VG (Very Good)** — Moderate edge wear, light scratches
• **G (Good)** — Noticeable wear, possible creasing, still playable
• **P (Poor/Played)** — Heavy wear, for player use only

⚠️ These are our **internal grades**, NOT related to PSA/BGS/CGC grading.`,
  },
  {
    keywords: ["psa", "grading", "grade card", "submit", "professional grading", "cgc", "bgs"],
    reply: `🏆 **Grading Cards:**
We offer PSA grading submission services! We handle the entire process from Japan.

Options: Economy, Standard, Express

Visit our **Grading Cards** page for pricing and to add to cart. We recommend contacting us for photos before purchase if submitting for PSA grading.`,
  },
  {
    keywords: ["wholesale", "bulk", "b2b", "business", "reseller", "wholesale order"],
    reply: `💼 **Wholesale & B2B:**
We cater to global wholesale buyers! Benefits include:
• Minimum order: 3 boxes per SKU
• Tiered pricing — better prices with larger orders
• Ships to 50+ countries
• Secure invoicing & payment
• 24-hour response time (Japan time)

Fill out the **Wholesale Inquiry form** on our Wholesale page or contact us directly. Include: business name, country, products, quantities.`,
  },
  {
    keywords: ["authentic", "genuine", "fake", "real", "factory sealed", "official"],
    reply: `✅ **Authenticity Guarantee:**
All our products are **100% authentic** and sourced directly from Japan. Booster boxes and cases are **factory sealed** — we never open or tamper with products.

We are an official importer of Japanese TCG products.`,
  },
  {
    keywords: ["pokemon", "pokémon", "booster box", "sv11", "m5", "m6", "abyss eye", "white flare", "storm emeralda"],
    reply: `⚡ **Pokémon Cards:**
We stock the full range of Japanese Pokémon TCG:
• **Booster BOX & CASE** — Latest sets like M6 Storm Emeralda, 30th Celebration, M5 Abyss Eye, White Flare & more
• **Single Cards** — Individual card purchases with condition grades
• **Deck BOX/SET** — Premium collector decks and sets

Visit the **Pokémon Cards** section to browse all available products!`,
  },
  {
    keywords: ["one piece", "onepiece", "op-17", "op-16", "op-15", "op-14", "luffy", "op booster"],
    reply: `⚓ **One Piece TCG:**
We carry the full Japanese ONE PIECE Card Game lineup:
• **OP-17** The World's Strongest Warriors (New!)
• **OP-16** The Time Of Battle
• **OP-15** Adventure on the Island of the Gods
• **OP-14** The Azure Sea's Seven
• Older sets also available

Visit the **One Piece Cards** section to shop!`,
  },
  {
    keywords: ["dragon ball", "fb", "fusion world", "dragonball"],
    reply: `🐉 **Dragon Ball Super TCG:**
We stock **Fusion World** Booster BOX & CASE sets from the Dragon Ball Super Card Game. Visit the **Dragon Ball Cards** section to browse current stock.`,
  },
  {
    keywords: ["disney", "lorcana", "disney lorcana"],
    reply: `✨ **Disney LORCANA:**
We carry Disney LORCANA Booster Boxes and sets. Visit the **Disney LORCANA** section for all available stock.`,
  },
  {
    keywords: ["payment", "pay", "credit card", "paypal", "klarna", "visa", "mastercard", "how to pay"],
    reply: `💳 **Payment Methods:**
We accept the following payment methods:
• Visa & Mastercard
• American Express
• PayPal
• Klarna (Buy Now, Pay Later)

All transactions are secure and encrypted.`,
  },
  {
    keywords: ["track", "tracking", "where is my order", "order status"],
    reply: `🔍 **Order Tracking:**
Once your order is dispatched, you'll receive a **shipping confirmation email** with a tracking number. Use it on the carrier's website to monitor your package in real time.

If you haven't received a tracking email within 5 business days of your order, please contact us.`,
  },
  {
    keywords: ["contact", "email", "support", "help", "question", "reach"],
    reply: `📬 **Contact Us:**
You can reach our support team through:
• The **Wholesale Inquiry form** for business enquiries
• Social media: **Facebook**, **Instagram**, **Threads** @tcg_shop_kasumi

Our team is based in Japan and responds within 24 hours.`,
  },
  {
    keywords: ["eu", "europe", "european", "eu vat", "member state"],
    reply: `🇪🇺 **EU Member States:**
We collect VAT at checkout for all EU countries including Germany (19%), France (20%), Spain (21%), Italy (22%), Sweden (25%), and many more.

See our **EU Member States Eligible** page for a full list with VAT rates.`,
  },
  {
    keywords: ["pre-order", "preorder", "pre order", "coming soon"],
    reply: `📅 **Pre-orders:**
We do carry pre-order items for upcoming sets! If your order contains both a pre-order and an in-stock item, the **entire order ships together** once the pre-order is available.

To receive in-stock items sooner, place a separate order for them.`,
  },
  {
    keywords: ["cancel", "cancellation", "cancel order"],
    reply: `🚫 **Order Cancellation:**
Order cancellations may be possible if the order hasn't been dispatched yet. Please contact us as soon as possible. Once an order has been shipped, it cannot be cancelled — you would need to follow our returns process.`,
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy"],
    reply: `👋 Hello! Welcome to **TCG SHOP KASUMI** — your trusted source for authentic Japanese Trading Card Game products!

How can I help you today? You can ask me about:
• 📦 Shipping & Delivery
• 💳 Payment Methods
• ↩️ Returns & Refunds
• ⚡ Pokémon or ⚓ One Piece Cards
• 🏆 PSA Grading Services
• 💼 Wholesale Inquiries`,
  },
  {
    keywords: ["price", "how much", "cost", "cheap", "expensive", "pricing"],
    reply: `💰 **Pricing:**
Our prices vary by product and are listed in your selected currency on each product page. We offer:
• Booster Boxes from ~$65–$95 USD
• Single Cards from ~$6 USD
• Deck Sets from ~$130 USD
• Grading services from ~$50 USD

Wholesale pricing available — contact us for volume discounts!`,
  },
];

function getBotReply(input) {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.reply;
    }
  }
  return `🤔 I'm not sure about that, but our team is happy to help!

Try asking about:
• Shipping & Delivery
• Returns & Refunds
• Pokémon or One Piece products
• PSA Grading
• Wholesale

Or reach us on **Instagram / Facebook** @tcg_shop_kasumi 😊`;
}

// =====================================================
// Message renderer — supports **bold** and bullet lines
// =====================================================
function MessageText({ text }) {
  return (
    <div className="chat-bubble-text">
      {text.split("\n").map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} style={{ margin: "0.2rem 0", lineHeight: 1.55 }}>
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
          </p>
        );
      })}
    </div>
  );
}

// =====================================================
// Quick Reply Buttons
// =====================================================
const quickReplies = [
  { label: "🚚 Shipping", text: "How long does shipping take?" },
  { label: "↩️ Returns", text: "What is your refund policy?" },
  { label: "✅ Authentic?", text: "Are your products authentic?" },
  { label: "💼 Wholesale", text: "I want to place a wholesale order" },
  { label: "💳 Payment", text: "What payment methods do you accept?" },
  { label: "🏆 Grading", text: "Tell me about PSA grading" },
];

// =====================================================
// Main Chatbot Component
// =====================================================
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: `👋 Hello! Welcome to **TCG SHOP KASUMI**!\n\nI'm your support assistant. Ask me anything about our products, shipping, returns, grading services, or wholesale inquiries!`,
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { text: text.trim(), isBot: false }]);
    setInput("");
    setIsTyping(true);

    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((prev) => [...prev, { text: reply, isBot: true }]);
      setIsTyping(false);
      if (!isOpen) setHasUnread(true);
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ===== CHAT PANEL ===== */}
      <div
        className={`chatbot-container${isOpen ? " open" : ""}`}
        role="dialog"
        aria-label="Customer support chat"
        aria-modal="false"
      >
        {/* Header */}
        <div className="chatbot-header" onClick={() => setIsOpen((v) => !v)}>
          <div className="chatbot-title">
            <div className="chatbot-avatar-wrap">
              <span>KS</span>
              <span className="chatbot-online-dot" />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.2 }}>TCG SHOP KASUMI Support</p>
              <p style={{ fontSize: "0.72rem", opacity: 0.8 }}>Typically replies instantly</p>
            </div>
          </div>
          <button className="chatbot-toggle-btn" aria-label={isOpen ? "Close chat" : "Open chat"}>
            {isOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Body */}
        {isOpen && (
          <>
            <div className="chatbot-messages" id="chatbot-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-msg ${msg.isBot ? "bot" : "user"}`}>
                  {msg.isBot && (
                    <div className="chat-avatar-sm" aria-hidden="true">KS</div>
                  )}
                  <div className="chat-bubble">
                    {msg.isBot ? <MessageText text={msg.text} /> : msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="chat-msg bot">
                  <div className="chat-avatar-sm">KS</div>
                  <div className="chat-bubble typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="chatbot-quick-replies" aria-label="Quick reply suggestions">
              {quickReplies.map((qr) => (
                <button
                  key={qr.label}
                  className="quick-reply-btn"
                  onClick={() => sendMessage(qr.text)}
                >
                  {qr.label}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <form className="chatbot-input-area" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="chatbot-input"
                id="chatbot-text-input"
                aria-label="Chat message input"
                autoComplete="off"
              />
              <button
                type="submit"
                className="chatbot-send-btn"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                id="chatbot-send-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </>
        )}
      </div>

      {/* ===== FLOATING BUTTON (when closed) ===== */}
      <button
        className={`chatbot-floating-btn${isOpen ? " hidden" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open support chat"
        id="chatbot-open-btn"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {hasUnread && <span className="chatbot-unread-dot" />}
      </button>
    </>
  );
}
