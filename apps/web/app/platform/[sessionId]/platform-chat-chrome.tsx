"use client";

import Link from "next/link";
import { type ReactNode, type RefObject, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSessionLayout } from "../../sessions/[sessionId]/session-layout-context";
import { ACCENT, BG } from "../constants";
import { Icon } from "../icon";
import { PlatformChatHeader } from "./chat-header";
import { PlatformContextPanel } from "./context-panel";

interface PlatformChatChromeProps {
  activeChatId: string;
  sessionId: string;
  panelPortalRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

const NAV = [
  { id: "docs", label: "Документы", icon: "doc", count: 128 },
  { id: "scripts", label: "Сценарии", icon: "script", count: 14 },
  { id: "objects", label: "Объекты", icon: "cube", count: 42 },
  { id: "comms", label: "Коммуникации", icon: "chat", count: 7 },
] as const;

export function PlatformChatChrome({
  activeChatId,
  sessionId,
  panelPortalRef,
  children,
}: PlatformChatChromeProps) {
  const layout = useSessionLayout();
  const [activeNav, setActiveNav] = useState<string>("docs");
  const { chats, switchChat, createChat } = layout;

  const handleCreateChat = () => {
    const result = createChat();
    switchChat(result.chat.id);
  };

  return (
    <SidebarProvider
      className="platform-root platform-chat-shell"
      style={{
        height: "100dvh",
        minHeight: "0",
        width: "100%",
        background: BG,
        color: "#1d1d1f",
        fontFamily:
          "var(--font-platform-inter), -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        WebkitFontSmoothing: "antialiased",
        overflow: "hidden",
      }}
    >
      <aside
        style={{
          width: 260,
          background: "#fafafa",
          borderRight: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          height: "100%",
        }}
      >
        <div
          style={{
            padding: "18px 20px 14px",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Link
            href="/platform"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" fill={ACCENT} />
                <circle
                  cx="8"
                  cy="8"
                  r="6.5"
                  stroke="#fff"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>
            <div style={{ lineHeight: 1 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#1d1d1f",
                  letterSpacing: "-0.01em",
                }}
              >
                ИИ-ХАБ
              </div>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: 11,
                  color: "#86868b",
                  marginTop: 2,
                }}
              >
                ГК «ССК»
              </div>
            </div>
          </Link>
        </div>

        <div style={{ padding: "14px 14px 8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 8,
              padding: "7px 10px",
            }}
          >
            <Icon name="search" size={14} color="#86868b" />
            <input
              placeholder="Поиск"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 13,
                color: "#1d1d1f",
                flex: 1,
                fontFamily: "inherit",
              }}
            />
            <span
              style={{
                fontSize: 10,
                color: "#86868b",
                background: "#f5f5f7",
                padding: "1px 5px",
                borderRadius: 3,
              }}
            >
              ⌘K
            </span>
          </div>
        </div>

        <div style={{ padding: "6px 10px" }}>
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveNav(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: 7,
                background: activeNav === item.id ? "#fff" : "transparent",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  activeNav === item.id
                    ? "0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.05)"
                    : "none",
                fontSize: 13,
                color: "#1d1d1f",
                fontWeight: activeNav === item.id ? 500 : 400,
                textAlign: "left",
                fontFamily: "inherit",
              }}
            >
              <Icon
                name={item.icon}
                size={16}
                color={activeNav === item.id ? ACCENT : "#3a3a3c"}
              />
              <span style={{ flex: 1 }}>{item.label}</span>
              <span style={{ fontSize: 11, color: "#86868b" }}>
                {item.count}
              </span>
            </button>
          ))}
        </div>

        <div
          style={{
            height: 1,
            background: "rgba(0,0,0,0.05)",
            margin: "10px 14px",
          }}
        />

        <div style={{ padding: "0 14px 10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 10px",
              borderRadius: 8,
              background: "linear-gradient(180deg, #fff, #fafafa)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <Icon name="base" size={16} color="#3a3a3c" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "#1d1d1f", fontWeight: 500 }}>
                База знаний
              </div>
              <div style={{ fontSize: 10.5, color: "#86868b", marginTop: 1 }}>
                сессия {sessionId.slice(0, 8)}
              </div>
            </div>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#30d158",
              }}
            />
          </div>
        </div>

        <div style={{ padding: "0 14px 8px" }}>
          <button
            type="button"
            onClick={handleCreateChat}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "9px 10px",
              borderRadius: 8,
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              cursor: "pointer",
              fontSize: 13,
              color: "#1d1d1f",
              fontWeight: 500,
              fontFamily: "inherit",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
            }}
          >
            <Icon name="plus" size={14} color="#1d1d1f" />
            <span>Новый чат</span>
          </button>
        </div>

        <div
          style={{
            padding: "4px 14px 6px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "#86868b",
              fontWeight: 500,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            Недавние
          </span>
        </div>

        <div style={{ padding: "0 10px", flex: 1, overflow: "auto" }}>
          {chats.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => switchChat(c.id)}
              style={{
                width: "100%",
                display: "block",
                textAlign: "left",
                padding: "7px 10px",
                borderRadius: 6,
                background:
                  activeChatId === c.id
                    ? "rgba(192, 48, 33, 0.06)"
                    : "transparent",
                border: "none",
                cursor: "pointer",
                marginBottom: 2,
                fontFamily: "inherit",
              }}
            >
              <div
                style={{
                  fontSize: 12.5,
                  color: activeChatId === c.id ? "#1d1d1f" : "#3a3a3c",
                  fontWeight: activeChatId === c.id ? 500 : 400,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {c.title || "Без названия"}
              </div>
            </button>
          ))}
        </div>

        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Link
            href="/sessions"
            style={{
              fontSize: 11.5,
              color: "#86868b",
              textDecoration: "none",
              flex: 1,
            }}
          >
            ← К сессиям
          </Link>
          <Link
            href="/platform"
            style={{
              fontSize: 11.5,
              color: "#86868b",
              textDecoration: "none",
            }}
          >
            Демо
          </Link>
        </div>
      </aside>

      <div
        className="platform-chat-center"
        style={{
          flex: 1,
          display: "flex",
          minWidth: 0,
          flexDirection: "column",
          background: "#fff",
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <PlatformChatHeader />
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </div>

      <PlatformContextPanel />

      <div
        ref={panelPortalRef}
        aria-hidden="true"
        style={{ display: "none" }}
      />
    </SidebarProvider>
  );
}
