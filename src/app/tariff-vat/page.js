import Link from "next/link";
import { euVatRates } from "@/lib/data";

export const metadata = {
  title: "TCG Tariff & VAT Page | KAGAMI - Friendly Guide",
  description: "All duties, taxes, and import fees (including VAT and GST) are collected at checkout for supported countries.",
};

export default function TariffVatPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Tariff &amp; VAT Page</span>
          </nav>
          <h1>Tariff &amp; VAT Information</h1>
          <p>A friendly guide to understanding duties, taxes, and import fees for your TCG order.</p>
        </div>
      </section>

      <div className="container section">
        <div className="policy-content">
          <div className="info-banner">
            <span style={{ fontSize: "1.5rem" }}>✅</span>
            <div>
              <p><strong>Good news!</strong> All duties, taxes, and import fees (including VAT and GST) are collected at checkout for supported countries. You will not face any surprise charges upon delivery.</p>
            </div>
          </div>

          <h2>How It Works</h2>
          <p>When you place an order, the applicable duties and taxes for your country are automatically calculated and added to your order total at checkout. This means:</p>
          <ul>
            <li>You pay the full, final price at checkout — no surprise bills at the door.</li>
            <li>Your package will clear customs smoothly without delays.</li>
            <li>We handle all the paperwork and compliance on our end.</li>
          </ul>

          <h2>De Minimis Thresholds</h2>
          <p>Depending on your country, De Minimis thresholds may apply. For example, in Australia, orders valued under <strong>1,000 AUD</strong> may be exempt from additional import duties. Similar thresholds exist in many other countries.</p>
          <p>Our checkout system automatically determines whether duties apply to your specific order based on its declared value and destination country.</p>

          <h2>Unsupported Countries</h2>
          <p>For countries not yet supported by our automated duty collection system, customs duties and taxes may be collected by your local customs authority upon delivery. In these cases:</p>
          <ul>
            <li>You will be responsible for any applicable customs charges.</li>
            <li>We recommend checking your country's import regulations before ordering.</li>
            <li>Contact us if you have specific questions about your country.</li>
          </ul>

          <h2>EU Member States</h2>
          <p>We are registered for VAT collection in the EU. VAT is collected at checkout for all EU member states. See our{" "}
            <Link href="/eu-member-states" style={{ color: "var(--color-accent-primary)" }}>EU Member States Eligible page</Link>{" "}
            for a full list of countries and applicable VAT rates.
          </p>
        </div>
      </div>
    </>
  );
}
