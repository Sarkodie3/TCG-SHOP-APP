import Link from "next/link";
import { euVatRates } from "@/lib/data";

export const metadata = {
  title: "EU Member States Eligible for TCG Sales | TCG SHOP KASUMI",
  description: "List of EU countries eligible for VAT-included TCG sales from TCG SHOP KASUMI Japan.",
};

export default function EuMemberStatesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/tariff-vat">Tariff &amp; VAT Page</Link>
            <span>/</span>
            <span>EU Member States Eligible</span>
          </nav>
          <h1>EU Member States Eligible for Sales</h1>
          <p>Countries within the European Union where we collect VAT at checkout.</p>
        </div>
      </section>

      <div className="container section">
        <div className="policy-content" style={{ maxWidth: 700 }}>
          <div className="info-banner">
            <span style={{ fontSize: "1.5rem" }}>🇪🇺</span>
            <p>For all EU member states listed below, VAT is automatically calculated and collected at checkout. You will <strong>not</strong> face any additional charges upon delivery.</p>
          </div>

          <h2>VAT Rates by EU Country</h2>
          <p>The following countries are eligible and their applicable VAT rates are listed below:</p>

          <div className="eu-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>VAT Rate</th>
                </tr>
              </thead>
              <tbody>
                {euVatRates.map((row) => (
                  <tr key={row.country}>
                    <td>{row.country}</td>
                    <td><strong>{row.vat}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: "1rem" }}>
            * Environmental Tax of 57 HUF/kg applies in Hungary in addition to VAT.
          </p>

          <div style={{ marginTop: "2rem" }}>
            <Link href="/tariff-vat" className="btn btn-secondary" id="back-to-customs">
              ← Back to Customs Page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
