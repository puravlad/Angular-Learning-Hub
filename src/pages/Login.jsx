import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");

    // Temporary frontend demonstration.
    // Real authentication will be connected to the backend later.

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <main className="login-page">
      <section className="login-left">
        <div className="login-brand">
          <div className="brand-icon">
            <BookOpen size={25} />
          </div>

          <div>
            <h2>AngularJS</h2>
            <p>Learning Hub</p>
          </div>
        </div>

        <div className="login-hero">
          <div className="hero-badge">
            <Sparkles size={15} />
            Your learning journey starts here
          </div>

          <h1>
            Learn smarter.
            <br />
            Build <span>better.</span>
          </h1>

          <p className="hero-description">
            Explore AngularJS concepts, practice with examples, and
            improve your web development skills in one organized place.
          </p>

          <div className="hero-feature">
            <BookOpen size={22} />
            <div>
              <h3>Structured Learning</h3>
              <p>Topics organized for easy understanding.</p>
            </div>
          </div>

          <div className="hero-feature">
            <GraduationCap size={22} />
            <div>
              <h3>Practice and Improve</h3>
              <p>Learn concepts through examples and exercises.</p>
            </div>
          </div>

          <div className="hero-feature">
            <ShieldCheck size={22} />
            <div>
              <h3>Dedicated User Roles</h3>
              <p>Separate student and administrator areas.</p>
            </div>
          </div>
        </div>

        <p className="login-footer">
          © 2026 AngularJS Learning Hub
        </p>
      </section>

      <section className="login-right">
        <div className="login-card">
          <div className="mobile-brand">
            <div className="brand-icon">
              <BookOpen size={23} />
            </div>
            <span>AngularJS Learning Hub</span>
          </div>

          <div className="login-heading">
            <span className="welcome-label">WELCOME BACK</span>
            <h1>Sign in to your account</h1>
            <p>Enter your details to continue learning.</p>
          </div>

          <div className="role-selector">
            <button
              type="button"
              className={
                role === "student"
                  ? "role-option active"
                  : "role-option"
              }
              onClick={() => setRole("student")}
            >
              <GraduationCap size={19} />
              Student
            </button>

            <button
              type="button"
              className={
                role === "admin"
                  ? "role-option active"
                  : "role-option"
              }
              onClick={() => setRole("admin")}
            >
              <ShieldCheck size={19} />
              Admin
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="login-submit">
              Sign in
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <p className="register-prompt">
            New to the Learning Hub?{" "}
            <Link to="/register">Create an account</Link>
          </p>

          <div className="login-note">
            <ShieldCheck size={17} />
            <span>
              {role === "admin"
                ? "Administrator access selected"
                : "Student learning access selected"}
            </span>
          </div>
        </div>

        <p className="right-footer">
          Designed for a better learning experience
        </p>
      </section>
    </main>
  );
}

export default Login;