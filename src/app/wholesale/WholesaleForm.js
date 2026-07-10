"use client";
import { useState } from "react";

export default function WholesaleForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{
        background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.3)",
        borderRadius: "var(--radius-md)",
        padding: "2rem",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <h3 style={{ marginBottom: "0.5rem" }}>Inquiry Sent!</h3>
        <p style={{ color: "var(--color-text-muted)" }}>
          Thank you for your inquiry. Our team will respond within 24 hours (Japan time).
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" id="wholesale-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="business-name">Business Name *</label>
        <input id="business-name" type="text" className="form-input" placeholder="Your Company Name" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-name">Contact Name *</label>
        <input id="contact-name" type="text" className="form-input" placeholder="Your Full Name" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="email">Email Address *</label>
        <input id="email" type="email" className="form-input" placeholder="your@email.com" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="country">Country *</label>
        <input id="country" type="text" className="form-input" placeholder="Your Country" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="products">Products of Interest *</label>
        <input id="products" type="text" className="form-input" placeholder="e.g. Pokémon Booster Boxes, One Piece Cases..." required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="message">Additional Details</label>
        <textarea id="message" className="form-textarea" placeholder="Tell us more about your order requirements, estimated quantities, and any questions you have..." />
      </div>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }} id="wholesale-submit-btn">
        Send Inquiry
      </button>
    </form>
  );
}
