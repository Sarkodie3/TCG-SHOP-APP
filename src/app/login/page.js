"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    
    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // For now, any login works - redirect to home
      router.push("/");
    }, 1000);
  };

  return (
    <div className="section" style={{ minHeight: "calc(100vh - 200px)", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ width: "100%", maxWidth: "440px", margin: "0 auto" }}>
        
        <div style={{ 
          background: "var(--color-bg-card)", 
          border: "1px solid var(--color-border)", 
          borderRadius: "var(--radius-xl)", 
          padding: "2.5rem 2rem",
          boxShadow: "var(--shadow-md)" 
        }}>
          
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Welcome Back</h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
              Sign in to view your orders and saved items.
            </p>
          </div>

          {error && (
            <div className="info-banner warning" style={{ margin: "0 0 1.5rem 0", padding: "1rem" }}>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="email">Email Address</label>
              <input 
                id="email" 
                type="email" 
                className="form-input" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label className="form-label" htmlFor="password">Password</label>
                <Link href="#" style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", textDecoration: "underline" }}>
                  Forgot password?
                </Link>
              </div>
              <input 
                id="password" 
                type="password" 
                className="form-input" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={{ 
            marginTop: "2rem", 
            textAlign: "center", 
            fontSize: "0.9rem",
            color: "var(--color-text-muted)" 
          }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: "var(--color-accent-primary)", fontWeight: "600" }}>
              Create one
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
