"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import avatar from "../public/tino.jpg";

type Props = {
  phoneNumber: string;
  designerName?: string;
  title?: string;
  initialMessage?: string;
};

const WhatsAppBubble: React.FC<Props> = ({
  phoneNumber,
  designerName = "tyno james",
  title = "Lead Designer",
  initialMessage = "Hey, how can I help you today?",
}) => {
  const [open, setOpen] = useState(false);

  const handleStartChat = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Floating WhatsApp Icon */}
      <button
        aria-label="Open WhatsApp Chat"
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          background: "#25D366",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          transition: "transform 0.3s ease",
        }}>
        <FaWhatsapp size={32} color="white" />
      </button>

      {/* Chat Bubble UI */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "280px",
            padding: "1rem",
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.6)",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            zIndex: 999,
            border: "1px solid rgba(255, 255, 255, 0.3)",
            transition: "opacity 0.3s ease",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.75rem",
            }}>
            <Image
              src={avatar}
              alt={designerName}
              width={48}
              height={48}
              style={{
                borderRadius: "50%",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            />
            <div style={{ marginLeft: "0.75rem" }}>
              <div style={{ fontWeight: 600, fontSize: "1rem", color: "#111" }}>
                {designerName}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#555" }}>{title}</div>
            </div>
          </div>
          <p
            style={{ fontSize: "0.9rem", color: "#222", marginBottom: "1rem" }}>
            {initialMessage}
          </p>
          <button
            onClick={handleStartChat}
            style={{
              width: "100%",
              padding: "0.6rem",
              fontSize: "0.9rem",
              fontWeight: "bold",
              backgroundColor: "#25D366",
              color: "white",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}>
            💬 Chat on WhatsApp
          </button>
        </div>
      )}
    </>
  );
};

export default WhatsAppBubble;
