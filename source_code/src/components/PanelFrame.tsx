import { PANELS, ICON_MAP, COLOR_THEMES, type PanelConfig } from "@/lib/panel-types";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Zap, Lock, Fan, Lightbulb, Power, SunDim } from "lucide-react";

export function SlotOverlay({
  overlay,
  size,
  isOn = false,
  blue = true,
}: {
  overlay?: string;
  size: number;
  isOn?: boolean;
  blue?: boolean;
}) {
  if (!overlay) return null;

  // Always use blue shade
  const standby = "rgba(29, 104, 232, 0.75)";
  const active = "#3b8eff";
  const color = isOn ? active : standby;
  const filter = isOn
    ? "drop-shadow(0 0 5px #3b8eff) drop-shadow(0 0 2px #fff)"
    : "drop-shadow(0 0 3px #1d68e8)";

  switch (overlay) {
    case "arrows":
      return (
        <div className="flex flex-col items-center justify-between h-[65%] transition-all duration-300" style={{ color, filter }}>
          <ChevronUp size={size * 0.35} strokeWidth={2.5} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          <ChevronDown size={size * 0.35} strokeWidth={2.5} />
        </div>
      );
    case "arrow-up":
      return (
        <div className="flex items-center justify-center transition-all duration-300" style={{ color, filter }}>
          <ChevronUp size={size * 0.55} strokeWidth={3} />
        </div>
      );
    case "arrow-down":
      return (
        <div className="flex items-center justify-center transition-all duration-300" style={{ color, filter }}>
          <ChevronDown size={size * 0.55} strokeWidth={3} />
        </div>
      );
    case "arrows-horizontal":
      return (
        <div className="flex items-center justify-center font-bold tracking-tighter transition-all duration-300" style={{ color, filter, fontSize: size * 0.45 }}>
          &lt;&gt;
        </div>
      );
    case "arrows-collapse":
      return (
        <div className="flex items-center justify-center font-bold tracking-tighter transition-all duration-300" style={{ color, filter, fontSize: size * 0.45 }}>
          &gt;&lt;
        </div>
      );
    case "lightning":
      return (
        <div className="flex flex-col items-center justify-center transition-all duration-300" style={{ color, filter }}>
          <Zap size={size * 0.55} fill="currentColor" strokeWidth={1} />
        </div>
      );
    case "power-droplet":
      return (
        <div className="flex flex-col items-center justify-center transition-all duration-300" style={{ color, filter }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            style={{ width: size * 0.65, height: size * 0.65 }}
          >
            {/* Droplet outline */}
            <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
            {/* Power line */}
            <path d="M12 11.5v3.5" strokeWidth={2.2} strokeLinecap="round" />
            {/* Power arc */}
            <path d="M9.5 13a3.5 3.5 0 1 0 5 0" strokeWidth={2.2} strokeLinecap="round" />
          </svg>
        </div>
      );
    case "cross":
      return (
        <div className="flex items-center justify-center w-full h-full opacity-85 transition-all duration-300" style={{ color, filter }}>
          <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </div>
      );
    case "indicator":
      return (
        <div className="w-2.5 h-2.5 rounded-full transition-all duration-300" style={{ backgroundColor: color, boxShadow: isOn ? `0 0 8px ${color}` : undefined }} />
      );
    case "hp":
      return (
        <div className="absolute inset-1.5 border flex items-center justify-center font-black select-none transition-all duration-300" style={{ borderColor: color, color, filter, fontSize: size * 0.35 }}>
          HP
        </div>
      );
    case "minus":
      return (
        <div className="flex items-center justify-center font-bold select-none transition-all duration-300" style={{ color, filter, fontSize: size * 0.55 }}>
          —
        </div>
      );
    case "plus":
      return (
        <div className="flex items-center justify-center font-bold select-none transition-all duration-300" style={{ color, filter, fontSize: size * 0.45 }}>
          +
        </div>
      );
    case "sun-dimmer":
      return (
        <div className="flex items-center justify-center transition-all duration-300" style={{ color, filter }}>
          <SunDim size={size * 0.55} strokeWidth={2.5} />
        </div>
      );
    case "fan-dimmer":
      return (
        <div className="flex items-center justify-center transition-all duration-300" style={{ color, filter }}>
          <Fan size={size * 0.55} strokeWidth={2.5} />
        </div>
      );
    default:
      return null;
  }
}

export function PowerSlotIcon({
  scale,
  size,
  isOn = false,
  blue = true,
}: {
  scale: number;
  size: number;
  isOn?: boolean;
  blue?: boolean;
}) {
  const dotW = 2.5 * scale;
  const dotH = 2.5 * scale;
  const gap = 1 * scale;

  // Always use blue shade
  const standby = "rgba(29, 104, 232, 0.75)";
  const active = "#3b8eff";
  const color = isOn ? active : standby;
  const filter = isOn
    ? "drop-shadow(0 0 5px #3b8eff) drop-shadow(0 0 2px #fff)"
    : "drop-shadow(0 0 3px #1d68e8)";

  return (
    <div className="relative w-full h-full transition-all duration-300" style={{ filter }}>
      {/* Left Dot */}
      <div className="absolute left-[12%] top-1/2 -translate-y-1/2 rounded-full" style={{ width: dotW, height: dotH, backgroundColor: color }} />
      {/* Right Dots */}
      <div className="absolute right-[12%] top-1/2 -translate-y-1/2 flex" style={{ gap }}>
        <div className="rounded-full" style={{ width: dotW, height: dotH, backgroundColor: color }} />
        <div className="rounded-full" style={{ width: dotW, height: dotH, backgroundColor: color }} />
      </div>
      {/* Center Power Button */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background flex items-center justify-center shadow-sm transition-all duration-300"
        style={{ width: Math.min(size * 0.6, 28 * scale), height: Math.min(size * 0.6, 28 * scale), borderColor: color, boxShadow: isOn ? `0 0 8px ${color}80` : undefined }}
      >
        <Power size={Math.min(size * 0.25, 12 * scale)} strokeWidth={2.5} style={{ color }} />
      </div>
      {/* Bottom 3-dot Plug Pattern */}
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ gap: gap * 0.8 }}>
        <div className="rounded-full" style={{ width: dotW, height: dotH, backgroundColor: color }} />
        <div className="flex" style={{ gap }}>
          <div className="rounded-full" style={{ width: dotW, height: dotH, backgroundColor: color }} />
          <div className="rounded-full" style={{ width: dotW, height: dotH, backgroundColor: color }} />
        </div>
      </div>
    </div>
  );
}

interface Props {
  config: PanelConfig;
  scale?: number;
  highlight?: boolean;
  onSlotClick?: (index: number) => void;
  renderSlot?: (
    index: number,
    iconId: string | null,
    cellSize: number,
    overlay?: string,
    scale?: number,
  ) => React.ReactNode;
  className?: string;
  series?: string;
}

export function PanelFrame({
  config,
  scale = 1,
  highlight = false,
  onSlotClick,
  renderSlot,
  className,
  series,
}: Props) {
  const def = PANELS[config.type];
  if (!def) return null;

  const activeSeries = series || config.series || "classic";
  const isArchitect = activeSeries === "elite" || activeSeries === "pro" || activeSeries === "pro-plus";

  const BLACK_THEME = COLOR_THEMES.find((t) => t.id === "black")
    || { id: "black", name: "Black", bg: "#0a0a0a", border: "#1a1a1a", btnBg: "#111111", text: "#FFFFFF", previewBg: "#0a0a0a" };

  // Pro series is strictly black
  const forcedColor = activeSeries === "pro" ? "black" : (config.color || "black");

  const activeTheme = forcedColor
    ? (COLOR_THEMES.find((t) => t.id === forcedColor) || BLACK_THEME)
    : BLACK_THEME;

  const w = def.frame.w * scale;
  const h = def.frame.h * scale;
  const inset = def.inset * scale;
  const innerW = w - inset * 2;
  const innerH = h - inset * 2;

  const spacing = 8 * scale;

  // Calculate cell size
  const btnW = (innerW - (def.cols - 1) * spacing) / def.cols;
  const btnH = (innerH - (def.rows - 1) * spacing) / def.rows;

  // Row heights override for LED display panels (to reduce top space and center buttons nicely in bottom space)
  const isLedPanel = def.id.startsWith("2mq-led-");
  const rowHeights = Array(def.rows).fill(btnH);
  if (isLedPanel && def.rows === 2) {
    const row0H = 90 * scale;
    const row1H = innerH - row0H - spacing;
    rowHeights[0] = row0H;
    rowHeights[1] = row1H;
  }
  // When slots span multiple columns (e.g. 10-col panels with colSpan:2), use logical cell width
  const logicalBtnW = def.cellColSpan
    ? btnW * def.cellColSpan + (def.cellColSpan - 1) * spacing
    : btnW;
  const cellSize = Math.min(logicalBtnW, btnH);
  // squareSize: the uniform size for ALL inner squares (buttons, blank, dimmer, smart-control)
  const squareSize = cellSize * 0.82;

  let currentSlotIndex = 0;

  // Compute series styling
  let frameBorderRadius = 8 * scale;
  let frameBorderWidth = (def.category === "6M" ? 3.5 : 2) * scale;
  let frameBorderColor = activeTheme.border;
  let frameBoxShadow = `0 ${1 * scale}px ${3 * scale}px rgba(0,0,0,0.08), 0 ${1 * scale}px ${2 * scale}px rgba(0,0,0,0.06)`;

  if (activeSeries === "elite") {
    frameBorderRadius = 3 * scale;
    frameBorderWidth = 1.5 * scale;
    frameBorderColor = activeTheme.id === "white" ? "#D4D4D8" : "#27272A";
    frameBoxShadow = `0 ${3 * scale}px ${10 * scale}px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.15)`;
  } else if (activeSeries === "pro") {
    frameBorderRadius = 5 * scale;
    frameBorderWidth = 1.2 * scale;
    frameBorderColor = "#1F1F1F";
    frameBoxShadow = `inset 0 0 ${8 * scale}px rgba(0,0,0,0.85), 0 ${2 * scale}px ${6 * scale}px rgba(0,0,0,0.45)`;
  } else if (activeSeries === "pro-plus") {
    frameBorderRadius = 12 * scale;
    frameBorderWidth = 2 * scale;
    if (activeTheme.id === "rose-gold") {
      frameBorderColor = "#D09489";
      frameBoxShadow = `0 ${6 * scale}px ${16 * scale}px rgba(183, 110, 121, 0.25), inset 0 1px 2px rgba(255,255,255,0.4)`;
    } else if (activeTheme.id === "grey") {
      frameBorderColor = "#80838D";
      frameBoxShadow = `0 ${6 * scale}px ${16 * scale}px rgba(75, 85, 99, 0.25), inset 0 1px 2px rgba(255,255,255,0.3)`;
    } else if (activeTheme.id === "black") {
      frameBorderColor = "#444444";
      frameBoxShadow = `0 ${6 * scale}px ${16 * scale}px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255,255,255,0.15)`;
    } else {
      frameBorderColor = "#E4E4E7";
      frameBoxShadow = `0 ${6 * scale}px ${16 * scale}px rgba(0, 0, 0, 0.05), inset 0 1px 3px rgba(255,255,255,0.8)`;
    }
  }

  return (
    <div
      className={cn(
        "relative shrink-0 border transition shadow-sm",
        highlight ? "border-amber-500 ring-2 ring-amber-500/20" : "border-border",
        className,
      )}
      style={{
        width: w,
        height: h,
        borderColor: frameBorderColor,
        borderWidth: frameBorderWidth,
        borderRadius: frameBorderRadius,
        backgroundColor: activeTheme.bg,
        boxShadow: frameBoxShadow,
      }}
    >
      {/* Pro+ inner glow highlighting */}
      {activeSeries === "pro-plus" && (
        <>
          <div
            className="absolute inset-[1.5px] pointer-events-none"
            style={{
              border: `1px solid ${activeTheme.id === "white"
                ? "rgba(255,255,255,0.9)"
                : activeTheme.id === "rose-gold"
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(255,255,255,0.12)"
                }`,
              borderRadius: frameBorderRadius - 1.5,
            }}
          />
          {/* Left curved side cap */}
          <div
            className="absolute left-0 top-0 bottom-0 pointer-events-none z-10"
            style={{
              width: 12 * scale,
              backgroundColor: activeTheme.id === "white"
                ? "#f4f4f5"
                : activeTheme.id === "rose-gold"
                  ? "#d69c91"
                  : activeTheme.id === "grey"
                    ? "#7c7f8a"
                    : "#242424",
              borderRight: `1px solid ${activeTheme.id === "white"
                ? "rgba(0,0,0,0.08)"
                : "rgba(255,255,255,0.08)"
                }`,
              borderTopLeftRadius: frameBorderRadius - 1,
              borderBottomLeftRadius: frameBorderRadius - 1,
              boxShadow: activeTheme.id === "white"
                ? "inset 1px 0 0 rgba(255,255,255,0.8)"
                : "inset 1px 0 0 rgba(255,255,255,0.05)",
            }}
          />
          {/* Right curved side cap */}
          <div
            className="absolute right-0 top-0 bottom-0 pointer-events-none z-10"
            style={{
              width: 12 * scale,
              backgroundColor: activeTheme.id === "white"
                ? "#f4f4f5"
                : activeTheme.id === "rose-gold"
                  ? "#d69c91"
                  : activeTheme.id === "grey"
                    ? "#7c7f8a"
                    : "#242424",
              borderLeft: `1px solid ${activeTheme.id === "white"
                ? "rgba(0,0,0,0.08)"
                : "rgba(255,255,255,0.08)"
                }`,
              borderTopRightRadius: frameBorderRadius - 1,
              borderBottomRightRadius: frameBorderRadius - 1,
              boxShadow: activeTheme.id === "white"
                ? "inset -1px 0 0 rgba(255,255,255,0.8)"
                : "inset -1px 0 0 rgba(255,255,255,0.05)",
            }}
          />
        </>
      )}
      {/* Tiny brand logo watermark */}
      <div
        className="absolute flex items-center justify-center text-muted-foreground/30 pointer-events-none"
        style={{
          left: def.category === "2M" ? 12 * scale : w / 2 - 4 * scale,
          top: h / 2 - 4 * scale,
          width: 8 * scale,
          height: 8 * scale,
        }}
      >
        <svg viewBox="0 0 24 24" className="fill-current">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.58,20C9,20 12,18 15,15C18,12 20,9 20,6H17V8Z" />
        </svg>
      </div>

      {/* Grid container with absolute positioned elements */}
      <div
        className="absolute"
        style={{
          left: inset,
          top: inset,
          width: innerW,
          height: innerH,
        }}
      >
        {/* Draw horizontal groove line for LED display panels */}
        {def.id.startsWith("2mq-led-") && (
          <div
            className="absolute left-0 w-full border-t pointer-events-none opacity-80 z-10"
            style={{
              top: rowHeights[0] + spacing / 2,
              borderColor: activeTheme.id === "white" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
              boxShadow: activeTheme.id === "white" ? "0 1px 0 rgba(255,255,255,0.8)" : "0 1px 0 rgba(255,255,255,0.05)",
            }}
          />
        )}
        {/* Render grid items */}
        {def.items.map((item, i) => {
          const colSpan = item.colSpan || 1;
          const rowSpan = item.rowSpan || 1;

          const left = item.x * (btnW + spacing);
          const width = colSpan * btnW + (colSpan - 1) * spacing;

          let top = 0;
          for (let r = 0; r < item.y; r++) {
            top += rowHeights[r] + spacing;
          }

          let height = 0;
          for (let r = 0; r < rowSpan; r++) {
            height += rowHeights[item.y + r];
          }
          height += (rowSpan - 1) * spacing;

          const itemStyle = {
            position: "absolute" as const,
            left,
            top,
            width,
            height,
          };

          const spannedW = (colSpan - 1) * (btnW + spacing) + squareSize;
          const currentCellH = rowHeights[item.y];
          const spannedH = (rowSpan - 1) * (btnH + spacing) + squareSize;
          const spannedL = left + (logicalBtnW - squareSize) / 2;
          const spannedT = top + (currentCellH - squareSize) / 2;

          if (item.type === "blank") {
            if (item.specialType === "spacer") {
              return <div key={i} style={itemStyle} className="pointer-events-none opacity-0" />;
            }
            if (item.specialType === "led-bar") {
              return (
                <div
                  key={i}
                  style={itemStyle}
                  className="flex items-center justify-center pointer-events-none"
                >
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: Math.min(width * 0.75, 48 * scale),
                      height: 8 * scale,
                      backgroundColor: "#0d0d0d",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.8)",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Glowing blue LED bar inside */}
                    <div
                      className="rounded-full bg-[#3b8eff]"
                      style={{
                        width: "85%",
                        height: "50%",
                        boxShadow: "0 0 6px #3b8eff, 0 0 2px #fff",
                        opacity: 0.9,
                      }}
                    />
                  </div>
                </div>
              );
            }
            // Blank: perfect square = Math.min(spannedW, spannedH), centered in spanned area
            let sqSize = Math.min(spannedW, spannedH);
            if (def.category === "12M" && !item.specialType) {
              // Ensure 12M blanks have consistent sizing and spacing without overlapping staggered buttons
              sqSize = Math.min(sqSize, 175 * scale);
            }
            if (isArchitect && !item.specialType) {
              sqSize = sqSize * 1.15;
            }
            const isLeftEdge = item.x === 0;
            const isRightEdge = item.x + colSpan === def.cols;

            let finalBlankL = spannedL;
            if (isLeftEdge) {
              finalBlankL = left + (logicalBtnW - squareSize) / 2;
            } else if (isRightEdge) {
              finalBlankL = innerW - (logicalBtnW - squareSize) / 2 - sqSize;
            } else {
              finalBlankL = spannedL + (spannedW - sqSize) / 2;
            }
            const sqOffsetY = (spannedH - sqSize) / 2;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: finalBlankL,
                  top: spannedT + sqOffsetY,
                  width: sqSize,
                  height: sqSize,
                  borderColor: activeTheme.border,
                  borderWidth: Math.max(1.5, 2 * scale),
                  borderStyle: "solid",
                  backgroundColor: activeTheme.bg,
                  borderRadius: 3 * scale,
                  boxShadow: activeTheme.id !== "neutral" && activeTheme.id !== "white"
                    ? "inset 0 1px 3px rgba(0,0,0,0.4), 0 0.5px 1px rgba(255,255,255,0.15)"
                    : "inset 0 1px 2px rgba(0,0,0,0.06)",
                }}
                className="transition-all duration-200"
              />
            );
          }

          if (item.type === "special") {
            const isSemiRounded = item.specialType === "dimmer-bar" || item.specialType === "smart-control";

            // Calculate alignment dimensions
            let specialW = width;
            let specialH = height;
            let specialL = left;
            let specialT = top;

            if (item.specialType === "dimmer-bar") {
              // Dimmer: narrow column, full button height span — semi-rounded pill
              specialW = squareSize;
              specialH = spannedH;
              specialL = spannedL;
              specialT = spannedT;
            } else if (item.specialType === "smart-control") {
              // Smart-control: fill full spanned area (4x size)
              specialW = spannedW;
              specialH = spannedH;
              specialL = spannedL;
              specialT = spannedT;
            }

            const isSocket = item.specialType === "socket" || item.specialType === "socket-2" || item.specialType === "socket-usbc";
            if (isSocket) {
              // Sockets: render as a perfect square centered in the cell span area
              let sqSize = Math.min(width, height);
              if (isArchitect) {
                sqSize = sqSize * 1.15;
              }
              specialL = left + width - sqSize; // Align to the right edge
              specialT = top + (height - sqSize) / 2;
              specialW = sqSize;
              specialH = sqSize;
            }

            const socketBg = activeTheme.btnBg;
            const socketHoleBg = activeTheme.id === "black" ? "#0a0a0a" : "#ffffff";

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: specialL,
                  top: specialT,
                  width: specialW,
                  height: specialH,
                  backgroundColor: activeTheme.btnBg,
                  borderColor: activeTheme.border,
                  color: activeTheme.text,
                  borderRadius: isSemiRounded ? 12 * scale : 3 * scale,
                }}
                className="border flex flex-col items-center justify-center relative p-2 select-none shadow-inner"
              >
                {((item.specialType === "socket" && !isArchitect) || item.specialType === "socket-2" || item.specialType === "socket-usbc") && (
                  <svg version="1.1" id="Layer_1" x="0px" y="0px"
                    width={width * 0.85} height={height * 0.85} viewBox="0 0 778 768" enable-background="new 0 0 778 768">
                    <path fill={socketBg} opacity="1.000000" stroke="none" color="#000000"
                      d="
                    M1.000000,300.000000 
                      C1.000000,200.000000 1.000000,100.500000 1.000000,1.000000 
                      C260.333344,1.000000 519.666687,1.000000 779.000000,1.000000 
                      C779.000000,257.000000 779.000000,513.000000 779.000000,769.000000 
                      C519.666687,769.000000 260.333344,769.000000 1.000000,769.000000 
                      C1.000000,612.833313 1.000000,456.666656 1.000000,300.000000 
                    M307.109711,463.466766 
                      C304.252106,458.324890 302.636932,450.854218 298.277100,448.528168 
                      C289.328674,443.754059 290.189392,436.801849 290.329285,429.291229 
                      C290.350983,428.125214 290.462921,426.940826 290.308502,425.795227 
                      C289.785095,421.912048 291.201263,419.702179 294.798157,417.574646 
                      C323.537659,400.575775 331.091736,361.005432 309.075470,336.020966 
                      C301.515533,327.441803 299.028961,319.418884 300.029572,309.075745 
                      C300.125397,308.085236 300.055786,307.077179 300.040192,306.077637 
                      C299.855377,294.224609 291.054260,285.135071 279.270142,284.895203 
                      C270.775421,284.722321 262.272186,284.733398 253.776810,284.887085 
                      C242.048584,285.099274 233.309509,293.726013 232.910614,305.420654 
                      C232.728943,310.746887 232.680649,316.091644 232.913788,321.413025 
                      C233.064041,324.842468 232.046494,327.122253 229.378616,329.520752 
                      C204.702942,351.704681 204.808990,391.995148 231.012054,411.968292 
                      C240.615448,419.288422 243.969604,426.435852 242.316971,437.329773 
                      C242.242844,437.818451 242.256470,438.334290 242.315918,438.827026 
                      C242.646713,441.568481 241.735031,443.213470 239.110321,444.734406 
                      C231.157104,449.343048 226.240997,456.318237 225.683182,465.668091 
                      C225.247437,472.971924 225.012314,480.337769 225.435013,487.632751 
                      C226.414688,504.540497 236.620285,517.700989 252.276230,521.496704 
                      C258.634125,523.038147 265.490753,523.125610 272.093872,522.938232 
                      C290.875397,522.405212 306.649750,507.224487 307.254456,489.308075 
                      C307.535217,480.989899 307.219604,472.651581 307.109711,463.466766 
                    z"/>
                    <g transform="translate(0, 469)">
                      <path fill={socketBg} opacity="1.000000" stroke="none" d="
                      M620.000183,197.500000 
                        C620.000183,217.252716 620.000183,237.005432 620.000183,256.687988 
                        C643.661621,256.687988 666.718872,256.687988 689.698486,256.687988 
                        C689.698486,197.666138 689.698486,138.956512 689.698486,80.311935 
                        C666.338562,80.311935 643.281311,80.311935 620.000183,80.311935 
                        C620.000183,119.248718 620.000183,157.874359 620.000183,197.500000 
                      z"/>
                    </g>
                    <path fill={socketBg} opacity="1.000000" stroke="none"
                      d="
                    M329.341309,703.127197 
                      C336.793549,703.179382 344.258636,703.527405 351.694519,703.204041 
                      C359.805664,702.851318 366.378326,699.060425 370.963531,692.338196 
                      C372.678497,689.823975 374.563477,689.048889 377.531555,689.064819 
                      C400.512573,689.188171 423.494751,689.190857 446.476135,689.107117 
                      C457.631104,689.066528 466.062042,680.615601 466.115143,669.531128 
                      C466.188599,654.210327 466.180969,638.888794 466.112885,623.567932 
                      C466.077484,615.598999 461.321075,608.531006 453.726990,605.998657 
                      C450.365173,604.877625 446.480377,604.409180 442.970673,604.820190 
                      C432.774780,606.014099 424.147614,603.323914 416.450012,596.528442 
                      C412.736969,593.250549 408.098724,591.042175 404.224854,587.920776 
                      C395.784882,581.120239 386.376282,578.100830 375.514282,578.827698 
                      C372.575775,579.024292 368.927155,578.253479 366.630981,576.546265 
                      C360.419220,571.927673 353.460602,571.382019 346.273865,571.351318 
                      C329.723175,571.280701 322.087189,577.791321 321.498047,594.343872 
                      C320.883453,611.611938 321.651367,628.926514 321.605286,646.220215 
                      C321.598602,648.738953 321.061859,651.688660 319.687653,653.698730 
                      C312.580048,664.094788 310.319885,675.331665 311.695435,687.792297 
                      C312.360077,693.812988 314.674469,697.878662 320.031586,700.208740 
                      C322.748993,701.390686 325.661713,702.123535 329.341309,703.127197 
                    M208.682922,606.506042 
                      C208.480713,601.354248 208.443878,596.189270 208.034271,591.054016 
                      C207.525970,584.681335 205.560059,578.666382 199.706238,575.369995 
                      C188.959732,569.318542 177.451645,569.440063 166.694046,574.643066 
                      C161.099106,577.348938 155.946854,579.377563 149.748886,579.011169 
                      C142.561508,578.586182 135.963867,580.384155 130.064209,584.781799 
                      C125.399780,588.258728 120.025970,590.883667 115.734695,594.740906 
                      C106.481438,603.058167 96.057541,605.746094 83.744858,604.882080 
                      C71.529411,604.024841 63.454281,612.603699 63.346863,624.952942 
                      C63.220764,639.449280 63.195293,653.948975 63.354488,668.444641 
                      C63.494762,681.217529 71.731323,689.130432 84.554359,689.140015 
                      C107.050407,689.156799 129.546783,689.201843 152.042130,689.075012 
                      C155.007187,689.058350 156.720016,690.060364 158.667267,692.271179 
                      C161.469131,695.452393 164.633423,699.053406 168.402618,700.511108 
                      C182.077057,705.799377 196.058365,705.560913 209.730484,700.135071 
                      C214.497940,698.243103 217.226089,694.577026 217.764450,689.078064 
                      C218.892654,677.554565 218.551865,666.443420 211.422684,656.593201 
                      C208.683304,652.808289 207.788986,648.662170 207.960663,643.960999 
                      C208.404190,631.816223 208.467575,619.657471 208.682922,606.506042 
                    M325.862213,162.499359 
                      C325.862213,173.930557 325.862213,185.361740 325.862213,196.778412 
                      C341.011200,196.778412 355.611176,196.778412 370.692352,196.778412 
                      C370.692352,191.284088 370.692352,186.030182 370.692352,180.442490 
                      C393.100098,187.002502 412.060089,182.856262 425.226013,163.286728 
                      C435.753113,147.639450 435.896362,130.639771 425.519623,114.899071 
                      C412.433380,95.048264 393.395477,90.585182 370.677948,97.296989 
                      C370.677948,91.701706 370.677948,86.471069 370.677948,81.194695 
                      C355.426941,81.194695 340.703705,81.194695 325.862366,81.194695 
                      C325.862366,108.185333 325.862366,134.842316 325.862213,162.499359 
                    M198.338959,197.055145 
                      C199.960754,197.055145 201.582550,197.055145 203.375427,197.055145 
                      C203.375427,158.103958 203.375427,119.618332 203.375427,81.201416 
                      C188.328445,81.201416 173.624664,81.201416 158.464813,81.201416 
                      C158.464813,86.636497 158.464813,91.703506 158.464813,97.318123 
                      C143.965942,92.528809 130.346497,93.070526 117.732971,101.090828 
                      C104.964432,109.209686 97.930084,121.069290 96.954468,136.176270 
                      C96.107559,149.290375 100.344826,160.842972 109.662292,170.129471 
                      C123.511818,183.932953 140.206345,186.166718 158.942108,180.455338 
                      C158.942108,186.400299 158.942108,191.623383 158.942108,197.055161 
                      C172.094940,197.055161 184.735687,197.055161 198.338959,197.055145 
                    z"/>
                    <g transform="translate(0, -469)">
                      <path fill={socketBg} opacity="1.000000" stroke="none" d="
                      M643.231140,586.817261 
                        C642.384949,589.466858 640.820007,592.111816 640.803162,594.766663 
                        C640.624817,622.919617 640.592773,651.074768 640.756409,679.227844 
                        C640.802612,687.176880 646.919434,692.793030 654.914246,693.030579 
                        C657.410950,693.104797 659.912476,693.082031 662.410522,693.035095 
                        C670.931519,692.874939 677.043335,687.173645 677.087463,678.644470 
                        C677.231445,650.824036 677.167847,623.002197 677.125610,595.181091 
                        C677.118042,590.205078 675.030701,586.146912 670.880127,583.313782 
                        C663.770386,578.460754 649.754578,580.007507 643.231140,586.817261 
                      z"/>
                    </g>
                    <path fill="#1d68e8" opacity={item.specialType === "socket-usbc" ? "1.000000" : "0.000000"} stroke="none"
                      d="
                    M307.142029,463.894592 
                      C307.219604,472.651581 307.535217,480.989899 307.254456,489.308075 
                      C306.649750,507.224487 290.875397,522.405212 272.093872,522.938232 
                      C265.490753,523.125610 258.634125,523.038147 252.276230,521.496704 
                      C236.620285,517.700989 226.414688,504.540497 225.435013,487.632751 
                      C225.012314,480.337769 225.247437,472.971924 225.683182,465.668091 
                      C226.240997,456.318237 231.157104,449.343048 239.110321,444.734406 
                      C241.735031,443.213470 242.646713,441.568481 242.315918,438.827026 
                      C242.256470,438.334290 242.242844,437.818451 242.316971,437.329773 
                      C243.969604,426.435852 240.615448,419.288422 231.012054,411.968292 
                      C204.808990,391.995148 204.702942,351.704681 229.378616,329.520752 
                      C232.046494,327.122253 233.064041,324.842468 232.913788,321.413025 
                      C232.680649,316.091644 232.728943,310.746887 232.910614,305.420654 
                      C233.309509,293.726013 242.048584,285.099274 253.776810,284.887085 
                      C262.272186,284.733398 270.775421,284.722321 279.270142,284.895203 
                      C291.054260,285.135071 299.855377,294.224609 300.040192,306.077637 
                      C300.055786,307.077179 300.125397,308.085236 300.029572,309.075745 
                      C299.028961,319.418884 301.515533,327.441803 309.075470,336.020966 
                      C331.091736,361.005432 323.537659,400.575775 294.798157,417.574646 
                      C291.201263,419.702179 289.785095,421.912048 290.308502,425.795227 
                      C290.462921,426.940826 290.350983,428.125214 290.329285,429.291229 
                      C290.189392,436.801849 289.328674,443.754059 298.277100,448.528168 
                      C302.636932,450.854218 304.252106,458.324890 307.142029,463.894592 
                    M245.136871,420.976746 
                      C245.136993,427.641632 245.043106,434.308502 245.184723,440.970398 
                      C245.239319,443.538330 244.692368,444.976990 242.084702,446.293823 
                      C232.816574,450.974152 228.076569,458.701630 228.131958,469.216858 
                      C228.161789,474.881744 228.122162,480.546997 228.140152,486.211975 
                      C228.191589,502.421631 239.277878,516.405518 255.132050,519.439880 
                      C260.454224,520.458496 266.097809,520.528381 271.527313,520.125916 
                      C292.240662,518.590698 304.854828,504.743591 304.862610,484.026642 
                      C304.863922,480.527649 304.679443,477.017273 304.895264,473.531647 
                      C305.725555,460.122345 300.684601,450.209167 287.862762,444.743774 
                      C287.862762,437.509308 288.102142,430.341980 287.763641,423.202087 
                      C287.589569,419.530823 288.849701,417.745239 292.017670,415.946442 
                      C320.691223,399.665833 328.460632,362.274597 306.729431,337.704193 
                      C298.614594,328.529175 296.353760,319.844482 297.294647,308.893494 
                      C297.393890,307.738403 297.329987,306.559143 297.238190,305.399323 
                      C296.382843,294.593597 289.126434,287.807648 278.207397,287.703766 
                      C270.377014,287.629303 262.544922,287.636383 254.714355,287.701721 
                      C243.159576,287.798126 235.821045,295.217163 235.699142,306.888458 
                      C235.641739,312.386322 235.494156,317.894836 235.764175,323.379974 
                      C235.919739,326.540039 234.782623,328.470093 232.452682,330.546936 
                      C204.177917,355.750549 209.013000,398.461121 242.064697,416.839050 
                      C243.306747,417.529724 244.120499,418.990692 245.136871,420.976746 
                    z"/>
                    <g transform="translate(0, 469)">
                      <path fill="#1d68e8" opacity={item.specialType === "socket-usbc" ? "1.000000" : "0.000000"} stroke="none"
                        d="
                      M620.000183,197.000000 
                        C620.000183,157.874359 620.000183,119.248718 620.000183,80.311935 
                        C643.281311,80.311935 666.338562,80.311935 689.698486,80.311935 
                        C689.698486,138.956512 689.698486,197.666138 689.698486,256.687988 
                        C666.718872,256.687988 643.661621,256.687988 620.000183,256.687988 
                        C620.000183,237.005432 620.000183,217.252716 620.000183,197.000000 
                      M686.000000,106.500038 
                        C686.000000,99.072784 686.000000,91.645531 686.000000,84.318993 
                        C664.990906,84.318993 644.599487,84.318993 624.307983,84.318993 
                        C624.307983,140.681396 624.307983,196.724304 624.307983,252.681091 
                        C645.008911,252.681091 665.400391,252.681091 686.000000,252.681091 
                        C686.000000,204.074997 686.000000,155.787506 686.000000,106.500038 
                      z"/>
                    </g>
                    <path fill="#1d68e8" opacity={item.specialType === "socket-usbc" ? "1.000000" : "0.000000"} stroke="none"
                      d="
                    M328.913696,703.093262 
                      C325.661713,702.123535 322.748993,701.390686 320.031586,700.208740 
                      C314.674469,697.878662 312.360077,693.812988 311.695435,687.792297 
                      C310.319885,675.331665 312.580048,664.094788 319.687653,653.698730 
                      C321.061859,651.688660 321.598602,648.738953 321.605286,646.220215 
                      C321.651367,628.926514 320.883453,611.611938 321.498047,594.343872 
                      C322.087189,577.791321 329.723175,571.280701 346.273865,571.351318 
                      C353.460602,571.382019 360.419220,571.927673 366.630981,576.546265 
                      C368.927155,578.253479 372.575775,579.024292 375.514282,578.827698 
                      C386.376282,578.100830 395.784882,581.120239 404.224854,587.920776 
                      C408.098724,591.042175 412.736969,593.250549 416.450012,596.528442 
                      C424.147614,603.323914 432.774780,606.014099 442.970673,604.820190 
                      C446.480377,604.409180 450.365173,604.877625 453.726990,605.998657 
                      C461.321075,608.531006 466.077484,615.598999 466.112885,623.567932 
                      C466.180969,638.888794 466.188599,654.210327 466.115143,669.531128 
                      C466.062042,680.615601 457.631104,689.066528 446.476135,689.107117 
                      C423.494751,689.190857 400.512573,689.188171 377.531555,689.064819 
                      C374.563477,689.048889 372.678497,689.823975 370.963531,692.338196 
                      C366.378326,699.060425 359.805664,702.851318 351.694519,703.204041 
                      C344.258636,703.527405 336.793549,703.179382 328.913696,703.093262 
                    M416.499573,686.695923 
                      C425.831512,686.695679 435.164886,686.799316 444.494995,686.668640 
                      C455.965912,686.508118 463.477386,679.595581 463.639923,668.706116 
                      C463.858765,654.044922 463.862549,639.375488 463.637360,624.714478 
                      C463.475067,614.147644 456.027832,607.227295 445.316559,607.127563 
                      C440.317749,607.081116 435.305817,607.324097 430.324646,607.024170 
                      C428.164459,606.894104 425.785645,606.148987 423.988007,604.956726 
                      C414.696716,598.794373 405.740234,592.109253 396.280884,586.227417 
                      C392.652649,583.971375 388.077759,583.000854 383.797058,582.087769 
                      C377.716827,580.790894 370.863892,581.406921 365.523804,578.791199 
                      C359.130615,575.659607 352.970062,573.968018 346.021362,573.995300 
                      C330.867249,574.054749 324.179749,580.311890 324.074188,595.378845 
                      C323.959930,611.685120 324.076416,627.996399 324.387177,644.299927 
                      C324.479706,649.152588 323.699738,653.453308 320.867157,657.433411 
                      C315.000275,665.677124 313.254303,674.898132 314.147797,684.895752 
                      C314.976990,694.174438 317.287506,698.011108 326.526337,699.620667 
                      C333.988281,700.920654 341.746979,700.852600 349.370209,700.802673 
                      C357.898560,700.746765 364.889374,697.052002 369.447906,689.720825 
                      C371.030823,687.175110 372.805206,686.627686 375.505981,686.648682 
                      C388.836487,686.752258 402.168243,686.695984 416.499573,686.695923 
                    z"/>
                    <path fill="#1d68e8" opacity={item.specialType === "socket-usbc" ? "1.000000" : "0.000000"} stroke="none"
                      d="
                    M208.682846,607.005188 
                      C208.467575,619.657471 208.404190,631.816223 207.960663,643.960999 
                      C207.788986,648.662170 208.683304,652.808289 211.422684,656.593201 
                      C218.551865,666.443420 218.892654,677.554565 217.764450,689.078064 
                      C217.226089,694.577026 214.497940,698.243103 209.730484,700.135071 
                      C196.058365,705.560913 182.077057,705.799377 168.402618,700.511108 
                      C164.633423,699.053406 161.469131,695.452393 158.667267,692.271179 
                      C156.720016,690.060364 155.007187,689.058350 152.042130,689.075012 
                      C129.546783,689.201843 107.050407,689.156799 84.554359,689.140015 
                      C71.731323,689.130432 63.494762,681.217529 63.354488,668.444641 
                      C63.195293,653.948975 63.220764,639.449280 63.346863,624.952942 
                      C63.454281,612.603699 71.529411,604.024841 83.744858,604.882080 
                      C96.057541,605.746094 106.481438,603.058167 115.734695,594.740906 
                      C120.025970,590.883667 125.399780,588.258728 130.064209,584.781799 
                      C135.963867,580.384155 142.561508,578.586182 149.748886,579.011169 
                      C155.946854,579.377563 161.099106,577.348938 166.694046,574.643066 
                      C177.451645,569.440063 188.959732,569.318542 199.706238,575.369995 
                      C205.560059,578.666382 207.525970,584.681335 208.034271,591.054016 
                      C208.443878,596.189270 208.480713,601.354248 208.682846,607.005188 
                    M205.626068,593.383972 
                      C204.870926,586.397888 203.567657,579.424377 196.116501,576.552979 
                      C185.776794,572.568604 175.497589,572.506042 165.451416,578.269104 
                      C162.281677,580.087524 158.301819,581.643066 154.777954,581.479736 
                      C144.110352,580.985474 134.782440,583.655640 126.559784,590.470520 
                      C124.262238,592.374695 121.433144,593.657898 119.222458,595.643066 
                      C109.084320,604.746826 97.657394,608.676697 83.769409,607.374756 
                      C73.241127,606.387695 66.157715,614.509338 66.136940,625.234070 
                      C66.110794,638.730225 66.683342,652.255615 65.973694,665.714417 
                      C65.277107,678.925354 73.864098,687.038879 87.164040,686.790405 
                      C108.983620,686.382629 130.816803,686.748108 152.643158,686.612061 
                      C156.234756,686.589661 158.788910,687.186035 160.844986,690.569763 
                      C164.204285,696.098267 169.495377,699.805786 175.891861,700.168030 
                      C184.801178,700.672485 193.800201,700.386658 202.706451,699.716492 
                      C205.781097,699.485046 208.982132,697.479248 211.574142,695.545166 
                      C213.204285,694.328857 214.388214,691.847717 214.780334,689.748718 
                      C217.074310,677.468750 215.002136,666.063232 207.852280,655.549500 
                      C206.217697,653.145874 205.450485,649.698425 205.432068,646.724365 
                      C205.323837,629.245850 205.555695,611.765259 205.626068,593.383972 
                    z"/>
                    <path fill="#1d68e8" opacity={item.specialType === "socket-usbc" ? "1.000000" : "0.000000"} stroke="none"
                      d="
                    M325.862305,161.999329 
                      C325.862366,134.842316 325.862366,108.185333 325.862366,81.194695 
                      C340.703705,81.194695 355.426941,81.194695 370.677948,81.194695 
                      C370.677948,86.471069 370.677948,91.701706 370.677948,97.296989 
                      C393.395477,90.585182 412.433380,95.048264 425.519623,114.899071 
                      C435.896362,130.639771 435.753113,147.639450 425.226013,163.286728 
                      C412.060089,182.856262 393.100098,187.002502 370.692352,180.442490 
                      C370.692352,186.030182 370.692352,191.284088 370.692352,196.778412 
                      C355.611176,196.778412 341.011200,196.778412 325.862213,196.778412 
                      C325.862213,185.361740 325.862213,173.930557 325.862305,161.999329 
                    M328.574646,193.602448 
                      C338.346375,193.846085 348.117706,194.109497 357.890106,194.322220 
                      C361.136841,194.392883 364.386353,194.333374 367.964752,194.333374 
                      C367.964752,187.783569 367.964752,182.029816 367.964752,176.169128 
                      C392.638245,184.145187 409.921326,180.018539 421.886353,163.501923 
                      C432.677521,148.605820 432.765411,129.319962 422.109558,114.543121 
                      C409.970398,97.709419 392.840607,93.563530 367.786194,101.646317 
                      C367.786194,95.577835 367.786194,89.644447 367.786194,83.740555 
                      C354.448883,83.740555 341.560883,83.740555 328.350891,83.740555 
                      C328.350891,120.313789 328.350891,156.456757 328.574646,193.602448 
                    z"/>
                    <path fill="#1d68e8" opacity={item.specialType === "socket-usbc" ? "1.000000" : "0.000000"} stroke="none"
                      d="
                    M197.857697,197.055145 
                      C184.735687,197.055161 172.094940,197.055161 158.942108,197.055161 
                      C158.942108,191.623383 158.942108,186.400299 158.942108,180.455338 
                      C140.206345,186.166718 123.511818,183.932953 109.662292,170.129471 
                      C100.344826,160.842972 96.107559,149.290375 96.954468,136.176270 
                      C97.930084,121.069290 104.964432,109.209686 117.732971,101.090828 
                      C130.346497,93.070526 143.965942,92.528809 158.464813,97.318123 
                      C158.464813,91.703506 158.464813,86.636497 158.464813,81.201416 
                      C173.624664,81.201416 188.328445,81.201416 203.375427,81.201416 
                      C203.375427,119.618332 203.375427,158.103958 203.375427,197.055145 
                      C201.582550,197.055145 199.960754,197.055145 197.857697,197.055145 
                    M171.516937,194.286926 
                      C181.247742,194.286926 190.978546,194.286926 200.752594,194.286926 
                      C200.752594,156.970337 200.752594,120.387032 200.752594,83.578262 
                      C187.819656,83.578262 175.080170,83.578262 161.818970,83.578262 
                      C161.818970,89.617180 161.818970,95.501534 161.818970,101.505783 
                      C135.040909,94.346848 119.583176,98.060982 107.685051,114.248215 
                      C97.489693,128.118851 96.522530,147.295441 106.478096,161.483154 
                      C120.431297,181.367889 139.360809,185.117325 161.972076,175.935715 
                      C161.972076,182.357590 161.972076,188.240555 161.972076,194.287033 
                      C165.206863,194.287033 167.863602,194.287033 171.516937,194.286926 
                    z"/>
                    <g transform="translate(0, -469)">
                      <path fill="#1d68e8" opacity={item.specialType === "socket-usbc" ? "1.000000" : "0.000000"} stroke="none"
                        d="
                      M643.462158,586.534790 
                        C649.754578,580.007507 663.770386,578.460754 670.880127,583.313782 
                        C675.030701,586.146912 677.118042,590.205078 677.125610,595.181091 
                        C677.167847,623.002197 677.231445,650.824036 677.087463,678.644470 
                        C677.043335,687.173645 670.931519,692.874939 662.410522,693.035095 
                        C659.912476,693.082031 657.410950,693.104797 654.914246,693.030579 
                        C646.919434,692.793030 640.802612,687.176880 640.756409,679.227844 
                        C640.592773,651.074768 640.624817,622.919617 640.803162,594.766663 
                        C640.820007,592.111816 642.384949,589.466858 643.462158,586.534790 
                      M643.325012,598.590210 
                        C643.325073,624.719727 643.305542,650.849243 643.336182,676.978760 
                        C643.346436,685.681946 647.848755,690.182068 656.514221,690.311279 
                        C658.510864,690.341064 660.513184,690.398315 662.504761,690.291870 
                        C669.710571,689.906982 674.251404,685.428589 674.276550,678.152710 
                        C674.371521,650.692017 674.410034,623.230103 674.174683,595.771118 
                        C674.149902,592.879028 672.932312,589.263977 670.967102,587.260254 
                        C665.224182,581.404724 657.699707,582.416199 650.835449,584.450012 
                        C644.821167,586.232117 642.945496,591.573547 643.325012,598.590210 
                      z"/>
                    </g>
                    <path fill={socketHoleBg} opacity="1.000000" stroke="none"
                      d="
                    M245.135345,420.534729 
                      C244.120499,418.990692 243.306747,417.529724 242.064697,416.839050 
                      C209.013000,398.461121 204.177917,355.750549 232.452682,330.546936 
                      C234.782623,328.470093 235.919739,326.540039 235.764175,323.379974 
                      C235.494156,317.894836 235.641739,312.386322 235.699142,306.888458 
                      C235.821045,295.217163 243.159576,287.798126 254.714355,287.701721 
                      C262.544922,287.636383 270.377014,287.629303 278.207397,287.703766 
                      C289.126434,287.807648 296.382843,294.593597 297.238190,305.399323 
                      C297.329987,306.559143 297.393890,307.738403 297.294647,308.893494 
                      C296.353760,319.844482 298.614594,328.529175 306.729431,337.704193 
                      C328.460632,362.274597 320.691223,399.665833 292.017670,415.946442 
                      C288.849701,417.745239 287.589569,419.530823 287.763641,423.202087 
                      C288.102142,430.341980 287.862762,437.509308 287.862762,444.743774 
                      C300.684601,450.209167 305.725555,460.122345 304.895264,473.531647 
                      C304.679443,477.017273 304.863922,480.527649 304.862610,484.026642 
                      C304.854828,504.743591 292.240662,518.590698 271.527313,520.125916 
                      C266.097809,520.528381 260.454224,520.458496 255.132050,519.439880 
                      C239.277878,516.405518 228.191589,502.421631 228.140152,486.211975 
                      C228.122162,480.546997 228.161789,474.881744 228.131958,469.216858 
                      C228.076569,458.701630 232.816574,450.974152 242.084702,446.293823 
                      C244.692368,444.976990 245.239319,443.538330 245.184723,440.970398 
                      C245.043106,434.308502 245.136993,427.641632 245.135345,420.534729 
                    z"/>
                    <g transform="translate(0, 469)">
                      <path fill={socketHoleBg} opacity="1.000000" stroke="none"
                        d="
                      M686.000000,107.000031 
                        C686.000000,155.787506 686.000000,204.074997 686.000000,252.681091 
                        C665.400391,252.681091 645.008911,252.681091 624.307983,252.681091 
                        C624.307983,196.724304 624.307983,140.681396 624.307983,84.318993 
                        C644.599487,84.318993 664.990906,84.318993 686.000000,84.318993 
                        C686.000000,91.645531 686.000000,99.072784 686.000000,107.000031 
                      z"/>
                    </g>
                    <path fill={socketHoleBg} opacity="1.000000" stroke="none"
                      d="
                    M415.999573,686.696045 
                      C402.168243,686.695984 388.836487,686.752258 375.505981,686.648682 
                      C372.805206,686.627686 371.030823,687.175110 369.447906,689.720825 
                      C364.889374,697.052002 357.898560,700.746765 349.370209,700.802673 
                      C341.746979,700.852600 333.988281,700.920654 326.526337,699.620667 
                      C317.287506,698.011108 314.976990,694.174438 314.147797,684.895752 
                      C313.254303,674.898132 315.000275,665.677124 320.867157,657.433411 
                      C323.699738,653.453308 324.479706,649.152588 324.387177,644.299927 
                      C324.076416,627.996399 323.959930,611.685120 324.074188,595.378845 
                      C324.179749,580.311890 330.867249,574.054749 346.021362,573.995300 
                      C352.970062,573.968018 359.130615,575.659607 365.523804,578.791199 
                      C370.863892,581.406921 377.716827,580.790894 383.797058,582.087769 
                      C388.077759,583.000854 392.652649,583.971375 396.280884,586.227417 
                      C405.740234,592.109253 414.696716,598.794373 423.988007,604.956726 
                      C425.785645,606.148987 428.164459,606.894104 430.324646,607.024170 
                      C435.305817,607.324097 440.317749,607.081116 445.316559,607.127563 
                      C456.027832,607.227295 463.475067,614.147644 463.637360,624.714478 
                      C463.862549,639.375488 463.858765,654.044922 463.639923,668.706116 
                      C463.477386,679.595581 455.965912,686.508118 444.494995,686.668640 
                      C435.164886,686.799316 425.831512,686.695679 415.999573,686.696045 
                    z"/>
                    <path fill={socketHoleBg} opacity="1.000000" stroke="none"
                      d="
                    M205.649506,593.834656 
                      C205.555695,611.765259 205.323837,629.245850 205.432068,646.724365 
                      C205.450485,649.698425 206.217697,653.145874 207.852280,655.549500 
                      C215.002136,666.063232 217.074310,677.468750 214.780334,689.748718 
                      C214.388214,691.847717 213.204285,694.328857 211.574142,695.545166 
                      C208.982132,697.479248 205.781097,699.485046 202.706451,699.716492 
                      C193.800201,700.386658 184.801178,700.672485 175.891861,700.168030 
                      C169.495377,699.805786 164.204285,696.098267 160.844986,690.569763 
                      C158.788910,687.186035 156.234756,686.589661 152.643158,686.612061 
                      C130.816803,686.748108 108.983620,686.382629 87.164040,686.790405 
                      C73.864098,687.038879 65.277107,678.925354 65.973694,665.714417 
                      C66.683342,652.255615 66.110794,638.730225 66.136940,625.234070 
                      C66.157715,614.509338 73.241127,606.387695 83.769409,607.374756 
                      C97.657394,608.676697 109.084320,604.746826 119.222458,595.643066 
                      C121.433144,593.657898 124.262238,592.374695 126.559784,590.470520 
                      C134.782440,583.655640 144.110352,580.985474 154.777954,581.479736 
                      C158.301819,581.643066 162.281677,580.087524 165.451416,578.269104 
                      C175.497589,572.506042 185.776794,572.568604 196.116501,576.552979 
                      C203.567657,579.424377 204.870926,586.397888 205.649506,593.834656 
                    z"/>
                    <path fill={socketHoleBg} opacity="1.000000" stroke="none"
                      d="
                    M328.462769,193.101089 
                      C328.350891,156.456757 328.350891,120.313789 328.350891,83.740555 
                      C341.560883,83.740555 354.448883,83.740555 367.786194,83.740555 
                      C367.786194,89.644447 367.786194,95.577835 367.786194,101.646317 
                      C392.840607,93.563530 409.970398,97.709419 422.109558,114.543121 
                      C432.765411,129.319962 432.677521,148.605820 421.886353,163.501923 
                      C409.921326,180.018539 392.638245,184.145187 367.964752,176.169128 
                      C367.964752,182.029816 367.964752,187.783569 367.964752,194.333374 
                      C364.386353,194.333374 361.136841,194.392883 357.890106,194.322220 
                      C348.117706,194.109497 338.346375,193.846085 328.462769,193.101089 
                    z"/>
                    <path fill={socketHoleBg} opacity="1.000000" stroke="none"
                      d="
                    M171.018646,194.286987 
                      C167.863602,194.287033 165.206863,194.287033 161.972076,194.287033 
                      C161.972076,188.240555 161.972076,182.357590 161.972076,175.935715 
                      C139.360809,185.117325 120.431297,181.367889 106.478096,161.483154 
                      C96.522530,147.295441 97.489693,128.118851 107.685051,114.248215 
                      C119.583176,98.060982 135.040909,94.346848 161.818970,101.505783 
                      C161.818970,95.501534 161.818970,89.617180 161.818970,83.578262 
                      C175.080170,83.578262 187.819656,83.578262 200.752594,83.578262 
                      C200.752594,120.387032 200.752594,156.970337 200.752594,194.286926 
                      C190.978546,194.286926 181.247742,194.286926 171.018646,194.286987 
                    z"/>
                    <g transform="translate(0, -469)">
                      <path fill={socketHoleBg} opacity="1.000000" stroke="none"
                        d="
                      M643.324951,598.107300 
                        C642.945496,591.573547 644.821167,586.232117 650.835449,584.450012 
                        C657.699707,582.416199 665.224182,581.404724 670.967102,587.260254 
                        C672.932312,589.263977 674.149902,592.879028 674.174683,595.771118 
                        C674.410034,623.230103 674.371521,650.692017 674.276550,678.152710 
                        C674.251404,685.428589 669.710571,689.906982 662.504761,690.291870 
                        C660.513184,690.398315 658.510864,690.341064 656.514221,690.311279 
                        C647.848755,690.182068 643.346436,685.681946 643.336182,676.978760 
                        C643.305542,650.849243 643.325073,624.719727 643.324951,598.107300 
                      z"/>
                    </g>
                  </svg>
                )}

                {item.specialType === "usbc" && (
                  <div className="flex flex-col items-center gap-1.5 justify-center w-full h-full">
                    <svg
                      width={width * 0.45}
                      height={height * 0.45}
                      viewBox="0 0 100 100"
                      className="text-muted-foreground"
                      fill="currentColor"
                    >
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="35" y="30" width="8" height="22" rx="2" />
                      <rect x="57" y="30" width="8" height="22" rx="2" />
                      <circle cx="50" cy="72" r="8" />
                    </svg>
                    <div className="flex gap-2 items-center border border-border/80 rounded px-1.5 py-0.5 bg-secondary/20 scale-90">
                      <div className="w-4 h-2 border border-muted-foreground/60 rounded-sm flex items-center justify-center text-[5px] text-muted-foreground font-black">
                        A
                      </div>
                      <div
                        className="w-4 h-2 border rounded-sm flex items-center justify-center text-[5px] font-black"
                        style={{ borderColor: "rgba(59, 142, 255, 0.6)", color: "#3b8eff" }}
                      >
                        C
                      </div>
                    </div>
                  </div>
                )}

                {item.specialType === "knob" && (
                  <div className="relative flex items-center justify-center w-full h-full">
                    <div
                      className="rounded-full border-2 border-border bg-card flex items-center justify-center shadow-md relative"
                      style={{
                        width: cellSize * 0.65,
                        height: cellSize * 0.65,
                      }}
                    >
                      <div className="w-1.5 h-6 rounded-full absolute top-1" style={{ backgroundColor: "#3b8eff", boxShadow: "0 0 4px #1d68e8" }} />
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                    </div>
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                      <div className="w-full h-full border-2 border-dashed border-muted-foreground/40 rounded-full scale-75" />
                    </div>
                  </div>
                )}

                {item.specialType === "dimmer-bar" && (
                  <div className="flex flex-col items-center justify-between py-2 h-[85%] w-full">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="rounded-sm"
                        style={{
                          height: 2.5 * scale,
                          width: 14 * scale,
                          backgroundColor: "#3b8eff",
                          boxShadow: "0 0 4px #1d68e8"
                        }}
                      />
                    ))}
                  </div>
                )}

                {item.specialType === "smart-control" && (
                  <svg version="1.1" id="Layer_1" width={width * 0.85} height={height * 0.85} viewBox="0 0 560 704" enable-background="new 0 0 560 704">
                    <path fill="#1d68e8" opacity="1.000000" stroke="none"
                      d="
                    M311.242920,316.732269 
                      C303.177124,312.469879 303.026550,312.056030 306.924194,305.060150 
                      C310.750092,305.598541 314.015045,307.626404 317.240265,309.598633 
                      C340.198212,323.637360 351.095734,349.754425 345.004242,375.950104 
                      C339.127686,401.221527 317.764771,419.672882 291.235596,422.390594 
                      C259.351532,425.656921 230.683762,403.333862 225.571564,371.259308 
                      C221.255600,344.180267 234.713516,318.567169 259.511688,306.664459 
                      C266.428223,303.344604 267.454498,303.762695 270.496429,311.187225 
                      C269.842499,312.770691 268.244293,312.900024 266.896454,313.441711 
                      C245.168106,322.174225 232.753632,342.114929 234.170914,365.991425 
                      C235.439056,387.355194 251.115234,406.080109 272.626801,411.926300 
                      C301.993195,419.907166 333.052307,399.248871 336.762360,369.389801 
                      C339.614044,346.438843 330.714539,329.242554 311.242920,316.732269 
                    z"/>
                    <path fill="#1d68e8" opacity="1.000000" stroke="none"
                      d="
                    M284.202698,295.714478 
                      C291.270874,295.728088 291.301636,295.728058 291.308716,302.213989 
                      C291.323792,316.018494 291.218231,329.823853 291.353180,343.627014 
                      C291.390594,347.454926 290.533203,349.399017 286.131500,349.395905 
                      C281.724426,349.392761 280.855621,347.429993 280.890259,343.605865 
                      C281.018341,329.469971 280.899750,315.331940 280.969635,301.195190 
                      C280.980316,299.039429 280.263611,296.251862 284.202698,295.714478 
                    z"/>
                    <path fill="#1d68e8" opacity="1.000000" stroke="none"
                      d="
                    M511.545776,227.550400 
                      C517.674316,228.757339 521.469238,231.935822 522.528320,237.912094 
                      C523.492432,243.352600 521.758972,247.852951 517.195801,250.853867 
                      C512.722107,253.795944 507.894470,254.125015 503.139252,251.177795 
                      C498.355774,248.213028 496.162903,242.189545 497.758728,236.401367 
                      C499.255463,230.972626 503.995636,227.829620 511.545776,227.550400 
                    z"/>
                    <path fill="#1d68e8" opacity="1.000000" stroke="none"
                      d="
                    M77.944656,253.208710 
                      C71.268707,252.564697 67.103821,249.396637 65.398430,243.198135 
                      C64.025627,238.208435 65.250870,233.856628 69.150215,230.641174 
                      C73.422119,227.118500 78.376411,226.234909 83.568558,228.721466 
                      C88.657829,231.158722 90.995651,236.025238 90.293098,242.434860 
                      C89.669533,248.123871 85.881149,251.540939 77.944656,253.208710 
                    z"/>
                    <path fill="#1d68e8" opacity="1.000000" stroke="none"
                      d="
                    M303.619141,610.982178 
                      C296.071136,610.734619 291.857269,608.025513 289.966370,602.527405 
                      C288.194580,597.375488 289.416199,592.274231 293.246002,588.832214 
                      C297.248260,585.235229 302.885040,584.398499 307.661774,586.692139 
                      C312.496155,589.013550 315.061371,593.666931 314.652710,599.374023 
                      C314.229553,605.284302 311.041504,608.745422 303.619141,610.982178 
                    z"/>
                    <path fill="#1d68e8" opacity="1.000000" stroke="none"
                      d="
                    M255.716278,591.022278 
                      C260.711914,585.478149 265.853271,584.106079 271.518250,586.522278 
                      C276.400269,588.604553 279.512756,593.551941 279.255463,598.820984 
                      C278.985504,604.348877 275.026825,609.153198 269.383514,610.642212 
                      C264.144409,612.024597 259.673584,610.304688 256.447052,606.276428 
                      C252.788498,601.708862 252.554794,596.536560 255.716278,591.022278 
                    z"/>
                    <path fill="#1d68e8" opacity="1.000000" stroke="none"
                      d="
                    M475.580139,227.548370 
                      C482.146637,228.511185 485.862152,232.153961 486.985748,238.189636 
                      C487.963287,243.440903 485.844971,247.722748 481.599854,250.746567 
                      C477.108154,253.945999 472.302826,254.022171 467.540314,251.158005 
                      C462.824280,248.321838 460.536560,242.309830 462.027161,236.794159 
                      C463.602264,230.965637 467.920441,227.921997 475.580139,227.548370 
                    z"/>
                    <path fill="#1d68e8" opacity="1.000000" stroke="none"
                      d="
                    M299.138947,571.573486 
                      C296.428741,579.767761 292.117798,582.896729 284.806946,582.337524 
                      C279.094238,581.900635 274.646667,577.681946 273.783356,571.881531 
                      C272.642853,564.218750 277.916870,557.517883 285.567932,556.908508 
                      C293.344666,556.289185 299.066406,562.272217 299.138947,571.573486 
                    z"/>
                  </svg>
                )}

                {item.specialType === "indicator" && (
                  <div className="flex flex-col items-center justify-center gap-1 w-full h-full">
                    <div className="w-4 h-4 rounded-full bg-destructive shadow-lg shadow-destructive/50 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                    </div>
                    <span className="text-[7px] font-bold text-destructive uppercase tracking-wider scale-90">
                      Link
                    </span>
                  </div>
                )}
              </div>
            );
          }

          // Standard slot
          const slotIndex = currentSlotIndex++;
          const iconId = config.slots[slotIndex];
          const Icon = iconId ? ICON_MAP[iconId]?.icon : null;

          if (renderSlot) {
            return (
              <div key={i} style={itemStyle} className="flex items-center justify-center">
                <div
                  style={{
                    width: squareSize,
                    height: squareSize,
                    borderRadius: 8 * scale,
                    overflow: "hidden"
                  }}
                  className="relative shrink-0 flex items-center justify-center"
                >
                  {renderSlot(slotIndex, iconId, squareSize, item.overlay, scale)}
                </div>
              </div>
            );
          }

          const blueFilter = "drop-shadow(0 0 3px #1d68e8)";
          const blueColor = "rgba(29, 104, 232, 0.85)";

          return (
            <div key={i} style={itemStyle} className="flex items-center justify-center">
              <button
                key={i}
                type="button"
                onClick={() => onSlotClick?.(slotIndex)}
                style={{
                  width: squareSize,
                  height: squareSize,
                  borderRadius: 3 * scale,
                }}
                className={cn(
                  "flex items-center justify-center border transition relative shadow-sm shrink-0",
                  onSlotClick && "hover:opacity-80",
                  (iconId || item.overlay) ? "backlit-blue" : "border-dashed border-border/40",
                )}
              >
                {Icon ? (
                  iconId === "power" ? (
                    item.overlay === "power-droplet" ? (
                      <SlotOverlay overlay="power-droplet" size={squareSize} blue={true} />
                    ) : (
                      <PowerSlotIcon scale={scale} size={squareSize} blue={true} />
                    )
                  ) : (
                    <Icon size={squareSize * 0.45} strokeWidth={1.5} style={{ color: blueColor, filter: blueFilter }} />
                  )
                ) : item.overlay ? (
                  <SlotOverlay overlay={item.overlay} size={squareSize} blue={true} />
                ) : null}
              </button>
            </div>
          );
        })}

        {/* Render Decorations (Dotted lines / center icons) */}
        {def.decorations?.map((dec, idx) => {
          const isGrid10 = def.cols === 10;
          const xColPos = isGrid10 && dec.xCol !== undefined ? dec.xCol * 2 : dec.xCol;
          // Calculate center line position
          const lineLeft = xColPos !== undefined ? xColPos * (btnW + spacing) - spacing / 2 : 0;

          if (dec.type === "v-dotted-line") {
            const circleSize = 14 * scale;
            const lineH = def.rows * btnH + (def.rows - 1) * spacing;
            return (
              <div key={`dec-${idx}`} className="absolute pointer-events-none" style={{ left: lineLeft, top: 0, width: spacing, height: lineH }}>
                {/* Dotted Line */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 h-full border-l-2 border-dashed"
                  style={{ top: 0, borderColor: "rgba(29, 104, 232, 0.45)" }}
                />
                {/* Brand Center Logo circle */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-[#05122e] flex items-center justify-center shadow-md"
                  style={{
                    top: lineH / 2,
                    width: circleSize * 1.3,
                    height: circleSize * 1.3,
                    borderColor: "#1d68e8",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="fill-current text-white" style={{ width: '60%', height: '60%', filter: "drop-shadow(0 0 2px #3b8eff)" }}>
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.58,20C9,20 12,18 15,15C18,12 20,9 20,6H17V8Z" />
                  </svg>
                </div>
              </div>
            );
          }

          if (dec.type === "v-dotted-line-col") {
            const col = dec.col || 0;
            const xPos = isGrid10
              ? (col * 2 * (btnW + spacing) + btnW + spacing / 2)
              : (col * (btnW + spacing) + btnW / 2);
            return (
              <svg
                key={`dec-${idx}`}
                width={8 * scale}
                height={26 * scale}
                viewBox="0 0 10 28"
                className="absolute pointer-events-none"
                style={{
                  left: xPos - 4 * scale,
                  top: btnH + spacing / 2 - 13 * scale,
                }}
              >
                <circle cx="5" cy="4.5" r="2.5" fill="#3b8eff" style={{ filter: "drop-shadow(0 0 2px #3b8eff)" }} />
                <circle cx="5" cy="11.5" r="2.0" fill="#3b8eff" opacity="0.8" style={{ filter: "drop-shadow(0 0 1.5px rgba(59,142,255,0.8))" }} />
                <circle cx="5" cy="18.5" r="1.5" fill="#3b8eff" opacity="0.6" />
                <circle cx="5" cy="25.5" r="1.1" fill="#3b8eff" opacity="0.45" />
              </svg>
            );
          }

          if (dec.type === "center-circle") {
            const circleSize = 18 * scale;
            const lineH = def.rows * btnH + (def.rows - 1) * spacing;
            return (
              <div
                key={`dec-${idx}`}
                className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border bg-[#05122e] flex items-center justify-center shadow-md"
                style={{
                  left: lineLeft,
                  top: lineH / 2,
                  width: circleSize * 1.1,
                  height: circleSize * 1.1,
                  borderColor: "#1d68e8",
                }}
              >
                <svg viewBox="0 0 24 24" className="fill-current text-white" style={{ width: '60%', height: '60%', filter: "drop-shadow(0 0 2px #3b8eff)" }}>
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.58,20C9,20 12,18 15,15C18,12 20,9 20,6H17V8Z" />
                </svg>
              </div>
            );
          }

          if (dec.type === "center-lock") {
            const circleSize = 18 * scale;
            const lineH = def.rows * btnH + (def.rows - 1) * spacing;
            return (
              <div
                key={`dec-${idx}`}
                className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center shadow-sm"
                style={{
                  left: lineLeft,
                  top: lineH / 2,
                  width: circleSize,
                  height: circleSize,
                  borderColor: "#1d68e8",
                  color: "#3b8eff",
                  backgroundColor: "#05122e",
                  filter: "drop-shadow(0 0 3px #1d68e8)",
                }}
              >
                <Lock size={circleSize * 0.5} strokeWidth={2.5} />
              </div>
            );
          }

          if (dec.type === "center-fan") {
            const circleSize = Math.max(16, 20 * scale);
            return (
              <div
                key={`dec-${idx}`}
                className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center shadow-sm"
                style={{
                  left: dec.xCol !== undefined ? lineLeft : innerW / 2,
                  top: btnH + spacing / 2,
                  width: circleSize,
                  height: circleSize,
                  borderColor: "#1d68e8",
                  color: "#3b8eff",
                  backgroundColor: "#05122e",
                  filter: "drop-shadow(0 0 3px #1d68e8)",
                }}
              >
                <Fan size={circleSize * 0.55} className="animate-spin" style={{ animationDuration: "8s" }} />
              </div>
            );
          }

          if (dec.type === "center-bulb") {
            const circleSize = Math.max(16, 20 * scale);
            return (
              <div
                key={`dec-${idx}`}
                className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center shadow-sm"
                style={{
                  left: dec.xCol !== undefined ? lineLeft : innerW / 2,
                  top: btnH + spacing / 2,
                  width: circleSize,
                  height: circleSize,
                  borderColor: "#1d68e8",
                  color: "#3b8eff",
                  backgroundColor: "#05122e",
                  filter: "drop-shadow(0 0 3px #1d68e8)",
                }}
              >
                <Lightbulb size={circleSize * 0.55} strokeWidth={2.5} />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Category identifier & Logo at bottom right */}
      <div
        className="absolute bottom-1 right-2 flex items-center gap-0.5 text-muted-foreground/60 select-none font-bold"
        style={{ fontSize: 7 * scale }}
      >
        <svg viewBox="0 0 24 24" className="fill-current text-muted-foreground/50" style={{ width: 8 * scale, height: 8 * scale }}>
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.58,20C9,20 12,18 15,15C18,12 20,9 20,6H17V8Z" />
        </svg>
        <span>{def.category}</span>
      </div>
      {/* Premium Texture Overlay */}
      <div className="premium-texture-overlay" />
    </div>
  );
}
