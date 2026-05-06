"use client";

import type { ReactNode } from "react";
import { ACCENT } from "../constants";
import { Icon } from "../icon";

function Tag({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      style={{
        fontSize: 10.5,
        padding: "2px 7px",
        borderRadius: 10,
        background: color ? `${color}14` : "#f5f5f7",
        color: color || "#3a3a3c",
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

const PARTICIPANTS = [
  { n: "Олег Иванов", r: "Менеджер", i: "ОИ" },
  { n: "Марина Соколова", r: "Юрист", i: "МС" },
  { n: "ООО «СтройКом»", r: "Подрядчик", i: "СК" },
];

const SOURCES = [
  "Шаблон договора подряда 2026.docx",
  "Положение о закупках ГК ССК.pdf",
  "Протокол №14 от 12.04.2026",
];

export function PlatformContextPanel() {
  return (
    <aside
      style={{
        width: 280,
        flexShrink: 0,
        height: "100%",
        borderLeft: "1px solid rgba(0,0,0,0.06)",
        background: "#fafafa",
        padding: 20,
        overflow: "auto",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#86868b",
          fontWeight: 500,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Контекст
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 14,
          border: "1px solid rgba(0,0,0,0.06)",
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 11.5, color: "#86868b", marginBottom: 8 }}>
          Объект
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#1d1d1f",
            letterSpacing: "-0.005em",
          }}
        >
          ЖК «Северный», кв. 3
        </div>
        <div style={{ fontSize: 12, color: "#3a3a3c", marginTop: 2 }}>
          Москва, ул. Берёзовая, 14
        </div>
        <div
          style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}
        >
          <Tag>№ ОБ-142</Tag>
          <Tag color={ACCENT}>в работе</Tag>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 14,
          border: "1px solid rgba(0,0,0,0.06)",
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 11.5, color: "#86868b", marginBottom: 8 }}>
          Участники
        </div>
        {PARTICIPANTS.map((p) => (
          <div
            key={p.n}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "6px 0",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "#f5f5f7",
                color: "#3a3a3c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 500,
              }}
            >
              {p.i}
            </div>
            <div style={{ lineHeight: 1.2, flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12.5,
                  color: "#1d1d1f",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {p.n}
              </div>
              <div style={{ fontSize: 11, color: "#86868b" }}>{p.r}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 14,
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ fontSize: 11.5, color: "#86868b", marginBottom: 8 }}>
          Источники ответа
        </div>
        {SOURCES.map((s) => (
          <div
            key={s}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 0",
              fontSize: 12,
              color: "#1d1d1f",
            }}
          >
            <Icon name="doc" size={12} color="#86868b" />
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
