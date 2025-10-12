import React from "react";
import { Link } from "react-router-dom";

const featureList = [
  { icon: "📝", text: "Task assignment and tracking" },
  { icon: "🤝", text: "Team collaboration" },
  { icon: "🔑", text: "Role-based access (User, Manager, Admin)" },
  { icon: "📈", text: "Progress monitoring and reporting" },
];

const decorativeImg =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80";

const About = () => (
  <div
    style={{
      minHeight: "100vh",
      width: "100vw",
      fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
      background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Animated gradient blob backgrounds */}
    <div
      style={{
        position: "absolute",
        top: "-120px",
        left: "-120px",
        width: "400px",
        height: "400px",
        background:
          "radial-gradient(circle at 60% 40%, #fcb69f 0%, #a1c4fd 100%)",
        opacity: 0.35,
        filter: "blur(60px)",
        zIndex: 1,
        animation: "blobMove 16s ease-in-out infinite alternate",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: "-120px",
        right: "-120px",
        width: "400px",
        height: "400px",
        background:
          "radial-gradient(circle at 60% 40%, #38b6ff 0%, #fdcbf1 100%)",
        opacity: 0.25,
        filter: "blur(60px)",
        zIndex: 1,
        animation: "blobMove2 18s ease-in-out infinite alternate",
      }}
    />
    {/* Animated grid pattern overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background:
          "url('data:image/svg+xml;utf8,<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"0\" y=\"0\" width=\"40\" height=\"40\" fill=\"none\"/><rect x=\"0\" y=\"0\" width=\"40\" height=\"40\" fill=\"none\"/><circle cx=\"20\" cy=\"20\" r=\"1.5\" fill=\"%23b3c6e0\" opacity=\"0.18\"/></svg>') repeat",
        opacity: 0.25,
        animation: "gridMove 18s linear infinite",
      }}
    />
    <style>
      {`
        @keyframes blobMove {
          0% {transform: translate(0,0) scale(1);}
          100% {transform: translate(80px, 60px) scale(1.2);}
        }
        @keyframes blobMove2 {
          0% {transform: translate(0,0) scale(1);}
          100% {transform: translate(-80px, -60px) scale(1.1);}
        }
        @keyframes gridMove {
          0% {background-position: 0 0;}
          100% {background-position: 40px 40px;}
        }
        .about-btn:hover {
          filter: brightness(1.08);
          box-shadow: 0 4px 18px #a1c4fd66;
          transform: translateY(-2px) scale(1.04);
        }
        .about-card {
          animation: fadeInCard 1.2s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(40px) scale(0.98);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        .about-img {
          transition: transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.3s;
        }
        .about-img:hover {
          transform: scale(1.06) rotate(-2deg);
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.28);
        }
        @media (max-width: 600px) {
          .about-card {
            padding: 24px 8px 24px 8px !important;
            max-width: 98vw !important;
          }
        }
      `}
    </style>
    <header
      style={{
        width: "100%",
        maxWidth: "900px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "32px 40px 0 40px",
        boxSizing: "border-box",
        background: "transparent",
        zIndex: 2,
      }}
    >
      <Link
        to="/login"
        className="about-btn"
        style={{
          textDecoration: "none",
          color: "#4f8cff",
          border: "2px solid #4f8cff",
          padding: "10px 28px",
          borderRadius: "8px",
          fontWeight: 600,
          background: "#fff",
          marginRight: "16px",
          boxShadow: "0 2px 8px rgba(79,140,255,0.08)",
          transition:
            "background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.1s",
        }}
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="about-btn"
        style={{
          textDecoration: "none",
          background: "linear-gradient(90deg, #4f8cff 0%, #38b6ff 100%)",
          color: "#fff",
          border: "none",
          padding: "10px 28px",
          borderRadius: "8px",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(79,140,255,0.12)",
          transition:
            "background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.1s",
        }}
      >
        Sign Up
      </Link>
    </header>

    <main
      className="about-card"
      style={{
        width: "100%",
        maxWidth: "480px",
        margin: "48px auto 0 auto",
        background: "rgba(255,255,255,0.85)",
        borderRadius: "28px",
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
        padding: "56px 36px 36px 36px",
        textAlign: "center",
        zIndex: 2,
        border: "1.5px solid rgba(255,255,255,0.25)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative image */}
      <img
        src={decorativeImg}
        alt="Project Collaboration"
        className="about-img"
        style={{
          width: "100%",
          maxWidth: "340px",
          height: "160px",
          objectFit: "cover",
          borderRadius: "18px",
          marginBottom: "1.2rem",
          boxShadow: "0 4px 18px #a1c4fd44",
          border: "2px solid #eaf2ff",
        }}
      />
      {/* Logo and subtitle */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/9068/9068679.png"
        alt="Logo"
        style={{
          width: "64px",
          height: "64px",
          marginBottom: "0.5rem",
          filter: "drop-shadow(0 2px 8px #a1c4fd)",
        }}
      />
      <h1
        style={{
          color: "#4f8cff",
          fontSize: "2.2rem",
          fontWeight: 800,
          marginBottom: "8px",
          letterSpacing: "1px",
          textShadow: "0 2px 8px #e0eaff",
        }}
      >
        Project Management Dashboard
      </h1>
      <div
        style={{
          fontSize: "1.08rem",
          color: "#234567",
          marginBottom: "18px",
          fontWeight: 500,
        }}
      >
        Organize your projects, tasks, and teams efficiently.
      </div>
      <div
        style={{
          background: "rgba(246,248,250,0.85)",
          borderRadius: "16px",
          padding: "22px 18px",
          marginBottom: "24px",
          boxShadow: "0 2px 8px rgba(161,196,253,0.08)",
          border: "1px solid #eaf2ff",
        }}
      >
        <h3
          style={{
            color: "#38b6ff",
            fontWeight: 700,
            marginBottom: "16px",
            fontSize: "1.15rem",
            letterSpacing: "0.5px",
          }}
        >
          Key features include:
        </h3>
        <ul
          style={{
            textAlign: "left",
            color: "#234567",
            fontSize: "1.08rem",
            margin: "0 0 0 18px",
            padding: 0,
            lineHeight: "2.1",
            listStyle: "none",
          }}
        >
          {featureList.map((f, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "1.25em",
                  marginRight: "10px",
                  background:
                    "linear-gradient(90deg, #4f8cff 0%, #38b6ff 100%)",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px #a1c4fd44",
                }}
              >
                {f.icon}
              </span>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <p
        style={{
          fontSize: "1.08rem",
          color: "#234567",
          marginBottom: "0",
        }}
      >
        Sign up to get started or log in if you already have an account.
      </p>
    </main>
    {/* Decorative bottom fade */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "120px",
        background:
          "linear-gradient(0deg, #a1c4fd 0%, rgba(255,255,255,0) 100%)",
        zIndex: 1,
      }}
    />
    {/* Decorative bottom SVG wave */}
    <svg
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "140px",
        zIndex: 1,
        pointerEvents: "none",
      }}
      viewBox="0 0 1440 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0,80 C360,160 1080,0 1440,80 L1440,140 L0,140 Z"
        fill="#a1c4fd"
        opacity="0.45"
      />
      <path
        d="M0,120 C480,60 960,180 1440,120 L1440,140 L0,140 Z"
        fill="#c2e9fb"
        opacity="0.35"
      />
    </svg>
  </div>
);

export default About;