"use client";

import type { CSSProperties } from "react";
import { Icon } from "../icon";

const headerBtn: CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "7px 11px",
  borderRadius: 7,
  fontSize: 12.5,
  color: "#3a3a3c",
  fontFamily: "inherit",
  fontWeight: 500,
};

export function PlatformChatHeader() {
  return (
    <div
      style={{
        height: 56,
        flexShrink: 0,
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 12,
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: "#1d1d1f",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="doc" size={15} color="#fff" />
      </div>
      <div style={{ flex: 1, lineHeight: 1.2 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#1d1d1f",
            letterSpacing: "-0.01em",
          }}
        >
          Агент «Документы»
        </div>
        <div
          style={{
            fontSize: 11.5,
            color: "#86868b",
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 2,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#30d158",
              display: "inline-block",
            }}
          />
          Готов к работе · подключён к базе знаний
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button type="button" style={headerBtn}>
          Инструкция
        </button>
        <button type="button" style={headerBtn}>
          История
        </button>
        <button type="button" style={{ ...headerBtn, padding: 8 }}>
          <Icon name="more" size={16} color="#3a3a3c" />
        </button>
      </div>
    </div>
  );
}
