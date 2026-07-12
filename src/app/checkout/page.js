import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Checkout - KAGAMI",
  description: "Secure checkout for KAGAMI",
};

export default function CheckoutPage() {
  return (
    <main style={{ padding: "4rem 0", background: "var(--color-bg)" }}>
      <div className="container">
        <CheckoutClient />
      </div>
    </main>
  );
}
