import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { PANELS, type CartItem } from "./panel-types";
import { PanelFrame } from "@/components/PanelFrame";
import Y5homeLogo from "@/assets/Y5home_Technologies.webp";

function PanelDescription({ it, isSingle }: { it: CartItem; isSingle?: boolean }) {
  const panelLabel = PANELS[it.config.type]?.label || "Unknown Frame";
  const series = it.config.series;
  const seriesLabel =
    series === "elite"
      ? "Elite"
      : series === "pro"
        ? "Pro"
        : series === "pro-plus"
          ? "Pro+"
          : "Classic";
  const colorLabel =
    it.config.color === "black"
      ? "Black"
      : it.config.color === "white"
        ? "White"
        : it.config.color === "grey"
          ? "Grey"
          : it.config.color === "rose-gold"
            ? "Rose Gold"
            : "Black";

  return createElement(
    "div",
    {
      style: {
        color: "#7a5a0f",
        fontSize: isSingle ? "14px" : "12px",
        fontWeight: 600,
        margin: "0 auto",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        gap: isSingle ? "5px" : "3px",
        lineHeight: 1.3,
      },
    },
    createElement("span", null, `Name: ${panelLabel}`),
    createElement("span", null, `Series: ${seriesLabel} (${colorLabel})`),
    it.config.location ? createElement("span", null, `Location: ${it.config.location}`) : null,
    createElement("span", null, `Qty: ${it.qty} pcs`)
  );
}

async function renderHidden(node: React.ReactNode): Promise<HTMLDivElement> {
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-99999px";
  host.style.top = "0";
  host.style.background = "white";
  document.body.appendChild(host);
  const root = createRoot(host);
  root.render(node as any);
  await new Promise((r) => setTimeout(r, 250));
  (host as any).__root = root;
  return host;
}

function cleanup(host: HTMLDivElement) {
  try {
    (host as any).__root?.unmount();
  } catch {}
  host.remove();
}

async function snap(el: HTMLElement) {
  return html2canvas(el, {
    backgroundColor: "#ffffff",
    scale: 3,
    useCORS: true,
  });
}

export async function exportCartPdf(
  items: CartItem[],
  mode: "sheet" | "single",
  customerDetails?: { name?: string; phone?: string; address?: string }
) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  if (mode === "single") {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const host = await renderHidden(
        createElement(
          "div",
          {
            style: {
              padding: "60px 60px 70px 60px",
              width: "700px",
              height: "990px",
              fontFamily: "Arial, Helvetica, sans-serif",
              background: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "geometricPrecision",
            },
          },
          // Top Section: Header
          createElement(
            "div",
            { style: { width: "100%" } },
            createElement(
              "div",
              { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" } },
              createElement("img", { src: Y5homeLogo, style: { height: "45px", width: "auto" } }),
              createElement(
                "div",
                { style: { textAlign: "right" } },
                createElement(
                  "h1",
                  { style: { fontSize: "26px", fontWeight: 800, color: "#014730", margin: 0 } },
                  "Order Switch Configuration",
                ),
                customerDetails && (customerDetails.name || customerDetails.phone || customerDetails.address) && createElement(
                  "div",
                  { style: { fontSize: "14px", color: "#111827", fontWeight: 600, marginTop: "6px", display: "flex", flexDirection: "column", gap: "3px", textAlign: "right" } },
                  customerDetails.name && createElement("div", null, `Customer: ${customerDetails.name}`),
                  customerDetails.phone && createElement("div", null, `Phone: ${customerDetails.phone}`),
                  customerDetails.address && createElement("div", { style: { maxWidth: "400px", wordBreak: "break-word", marginLeft: "auto" } }, `Address: ${customerDetails.address}`),
                ),
              ),
            ),
            createElement("div", {
              style: {
                borderBottom: "2px solid #014730",
              },
            }),
          ),
          // Middle Section: Centered Frame inside Bordered container box
          createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                margin: "40px 0",
              }
            },
            createElement(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2.5px solid #014730",
                  borderRadius: "14px",
                  padding: "48px",
                  background: "#f9fafb",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  minWidth: "300px",
                }
              },
              (() => {
                const panelDef = PANELS[it.config.type];
                const scale = panelDef ? Math.min(480 / panelDef.frame.w, 480 / panelDef.frame.h) : 1.4;
                return createElement(PanelFrame as any, { config: it.config, scale });
              })()
            ),
          ),
          // Bottom Section: Details & Name
          createElement(
            "div",
            { style: { textAlign: "center", width: "100%" } },
            createElement(
              "p",
              {
                style: {
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#014730",
                  margin: "0 0 6px 0",
                },
              },
              it.name,
            ),
            createElement(PanelDescription, { it, isSingle: true })
          ),
        ),
      );
      const canvas = await snap(host.firstElementChild as HTMLElement);
      cleanup(host);
      if (i > 0) pdf.addPage();
      const img = canvas.toDataURL("image/png");
      pdf.addImage(img, "PNG", 0, 0, pageW, pageH);
    }
  } else {
    // reference sheet grid: 3 per row
    const host = await renderHidden(
      createElement(
        "div",
        {
          style: {
            padding: "40px",
            width: "950px",
            background: "white",
            fontFamily: "Arial, Helvetica, sans-serif",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            textRendering: "geometricPrecision",
          },
        },
        // Header with Logo (Left) and Details (Right)
        createElement(
          "div",
          { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" } },
          createElement("img", { src: Y5homeLogo, style: { height: "45px", width: "auto" } }),
          createElement(
            "div",
            { style: { textAlign: "right" } },
            createElement(
              "h1",
              { style: { fontSize: "28px", fontWeight: 800, color: "#014730", margin: 0 } },
              "Order Switch Configuration",
            ),
            customerDetails && (customerDetails.name || customerDetails.phone || customerDetails.address) && createElement(
              "div",
              { style: { fontSize: "14px", color: "#111827", fontWeight: 600, marginTop: "6px", display: "flex", flexDirection: "column", gap: "3px", textAlign: "right" } },
              customerDetails.name && createElement("div", null, `Customer: ${customerDetails.name}`),
              customerDetails.phone && createElement("div", null, `Phone: ${customerDetails.phone}`),
              customerDetails.address && createElement("div", { style: { maxWidth: "400px", wordBreak: "break-word", marginLeft: "auto" } }, `Address: ${customerDetails.address}`),
            ),
          ),
        ),
        // Divider Line
        createElement("div", {
          style: {
            borderBottom: "2px solid #014730",
            margin: "0 0 32px",
          },
        }),
        createElement(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px 20px",
              justifyItems: "center",
            },
          },
          ...items.map((it) =>
            createElement(
              "div",
              {
                key: it.id,
                style: {
                  border: "2px solid #014730",
                  borderRadius: "10px",
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  background: "#f9fafb",
                  width: "260px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                },
              },
              (() => {
                const panelDef = PANELS[it.config.type];
                const scale = panelDef ? Math.min(210 / panelDef.frame.w, 160 / panelDef.frame.h) : 0.6;
                return createElement(PanelFrame as any, { config: it.config, scale });
              })(),
              createElement(
                "p",
                {
                  style: {
                    color: "#014730",
                    fontSize: "14px",
                    fontWeight: 700,
                    textAlign: "center",
                    margin: 0,
                    maxWidth: "220px",
                  },
                },
                it.name,
              ),
              createElement(PanelDescription, { it, isSingle: false })
            ),
          ),
        ),
      ),
    );
    const canvas = await snap(host.firstElementChild as HTMLElement);
    cleanup(host);
    const img = canvas.toDataURL("image/png");
    const ratio = canvas.height / canvas.width;
    const w = pageW - 40;
    const h = w * ratio;
    if (h <= pageH - 40) {
      pdf.addImage(img, "PNG", 20, 20, w, h);
    } else {
      // paginate vertically
      let remaining = h;
      let offset = 0;
      while (remaining > 0) {
        pdf.addImage(img, "PNG", 20, 20 - offset, w, h);
        remaining -= pageH - 40;
        offset += pageH - 40;
        if (remaining > 0) pdf.addPage();
      }
    }
  }

  pdf.save(`kiosk-order-${Date.now()}.pdf`);
}
