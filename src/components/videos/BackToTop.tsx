"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    const f = () => setShow(Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop) > 400);
    f();
    window.addEventListener("scroll", f, true);
    return () => window.removeEventListener("scroll", f, true);
  }, []);
  if (!ready || !show) return null;
  const up = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  };
  return createPortal(
    <button
      type="button"
      aria-label="Back to top"
      onClick={up}
      style={{ position: "fixed", bottom: 96, right: 16, zIndex: 9999, width: 52, height: 52, borderRadius: 9999, background: "#16a34a", color: "#fff", border: "2px solid #fff", boxShadow: "0 4px 14px rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
    >
      <FaArrowUp />
    </button>,
    document.body
  );
}
