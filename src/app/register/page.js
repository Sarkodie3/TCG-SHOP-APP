"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // For now, any registration works - redirect to login
      router.push("/login");
    }, 1200);
  };

  return (
    <div className="section" style={{ minHeight: "calc(100vh - 200px)", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ width: "100%", maxWidth: "460px", margin: "0 auto" }}>
        
        <div style={{ 
          background: "var(--color-bg-card)", 
          border: "1px solid var(--color-border)", 
          borderRadius: "var(--radius-xl)", 
          padding: "2.5rem 2.5rem",
          boxShadow: "var(--shadow-md)" 
        }}>
          
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Create an Account</h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
              Join TCG SHOP KASUMI for faster checkout and exclusive updates.
            </p>
          </div>

          {error && (
            <div className="info-banner warning" style={{ margin: "0 0 1.5rem 0", padding: "1rem" }}>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="name">Full Name</label>
              <input 
                id="name" 
                type="text" 
                className="form-input" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="email">Email Address</label>
              <input 
                id="email" 
                type="email" 
                className="form-input" 
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                className="form-input" 
                placeholder="At least 8 characters" 
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
              <input 
                id="confirmPassword" 
                type="password" 
                className="form-input" 
                placeholder="Repeat password" 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div style={{ 
            marginTop: "2rem", 
            textAlign: "center", 
            fontSize: "0.9rem",
            color: "var(--color-text-muted)" 
          }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--color-accent-primary)", fontWeight: "600" }}>
              Sign in
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
