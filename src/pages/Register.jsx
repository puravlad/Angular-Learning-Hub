import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    enrollment: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }


  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.enrollment.trim() ||
      !formData.password
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      setError(
        "Cannot connect to the server. Please ensure the backend is running."
      );
    }
  }

  return (
    <main className="register-page">
      {/* LEFT PANEL */}

      <section className="register-left">
        <Link to="/login" className="register-brand">
          <div className="register-brand-icon">
            <BookOpen size={25} />
          </div>

          <div>
            <h2>AngularJS</h2>
            <p>Learning Hub</p>
          </div>
        </Link>

        <div className="register-intro">
          <span className="register-badge">
            <GraduationCap size={16} />
            Start your learning journey
          </span>

          <h1>
            Your next chapter
            <br />
            starts <span>here.</span>
          </h1>

          <p>
            Create your student account and explore AngularJS
            tutorials, practical examples, and learning resources
            designed to help you grow.
          </p>

          <div className="register-benefit">
            <span>01</span>
            <div>
              <h3>Learn at your own pace</h3>
              <p>Study topics whenever you want.</p>
            </div>
          </div>

          <div className="register-benefit">
            <span>02</span>
            <div>
              <h3>Practice your skills</h3>
              <p>Understand concepts with examples.</p>
            </div>
          </div>

          <div className="register-benefit">
            <span>03</span>
            <div>
              <h3>Track your progress</h3>
              <p>Keep your learning organized.</p>
            </div>
          </div>
        </div>

        <p className="register-left-footer">
          ©️ 2026 AngularJS Learning Hub
        </p>
      </section>

      {/* RIGHT PANEL */}

      <section className="register-right">
        <div className="register-card">
          <div className="register-heading">
            <span>CREATE ACCOUNT</span>

            <h1>Join the Learning Hub</h1>

            <p>
              Enter your details to create your student account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-field">
              <label htmlFor="fullName">Full name</label>

              <div className="register-input-wrapper">
                <User size={18} />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="email">Email address</label>

              <div className="register-input-wrapper">
                <Mail size={18} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="enrollment">Enrollment number</label>

              <div className="register-input-wrapper">
                <GraduationCap size={18} />

                <input
                  id="enrollment"
                  name="enrollment"
                  type="text"
                  placeholder="Enter your enrollment number"
                  value={formData.enrollment}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="password">Password</label>

              <div className="register-input-wrapper">
                <Lock size={18} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <small>Use at least 6 characters.</small>
            </div>

            {error && (
              <p className="register-error">{error}</p>
            )}

            <button type="submit" className="register-submit">
              Create account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="register-login-link">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>

          <div className="register-security-note">
            <Lock size={15} />
            Your information will be securely managed after
            backend integration.
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;