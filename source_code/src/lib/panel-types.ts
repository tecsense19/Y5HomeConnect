import {
  Lightbulb,
  Fan,
  Snowflake,
  Bell,
  SunDim,
  Plug,
  Usb,
  Camera,
  Wifi,
  Tv,
  Volume2,
  Power,
  DoorOpen,
  Thermometer,
  Home,
  LogOut,
  Moon,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export type PanelType = string;

export function generateUUID(): string {
  if (typeof window !== "undefined" && window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return "id-" + Math.random().toString(36).slice(2, 11) + "-" + Date.now().toString(36);
}

export interface GridItemDef {
  type: "slot" | "blank" | "special";
  x: number;
  y: number;
  colSpan?: number;
  rowSpan?: number;
  specialType?: "socket" | "socket-2" | "usbc" | "knob" | "indicator" | "spacer" | "dimmer-bar" | "smart-control" | "socket-usbc" | "led-bar";
  overlay?:
  | "arrows"
  | "lightning"
  | "indicator"
  | "cross"
  | "arrow-up"
  | "arrow-down"
  | "arrows-horizontal"
  | "arrows-collapse"
  | "hp"
  | "minus"
  | "plus"
  | "sun-dimmer"
  | "fan-dimmer"
  | "power-droplet";
}

export interface DecorationDef {
  type:
  | "v-dotted-line"
  | "center-circle"
  | "center-lock"
  | "center-fan"
  | "center-bulb"
  | "v-dotted-line-col";
  xCol?: number;
  col?: number; // column index for v-dotted-line-col
}

export interface PanelDef {
  id: string;
  category: "2M" | "4M" | "6M" | "8M" | "6&8M" | "12M" | "2MQ" | "4MQ" | "6&8MQ";
  label: string;
  cols: number;
  rows: number;
  frame: { w: number; h: number };
  inset: number;
  items: GridItemDef[];
  decorations?: DecorationDef[];
  /** When slots use colSpan > 1, set this to the typical colSpan so squareSize is computed correctly */
  cellColSpan?: number;
}

export const PANELS: Record<string, PanelDef> = {
  // ==================== 2M ====================
  // Row 1: 4 frames
  "2m-1": {
    id: "2m-1",
    category: "2M",
    label: "2M · 2 gang with charging (gap)",
    cols: 3,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "blank", x: 1, y: 0, specialType: "spacer" },
      { type: "slot", x: 2, y: 0, overlay: "lightning" },
    ],
  },
  "2m-2": {
    id: "2m-2",
    category: "2M",
    label: "2M · 2 gang blank (gap)",
    cols: 3,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "blank", x: 1, y: 0, specialType: "spacer" },
      { type: "slot", x: 2, y: 0 },
    ],
  },
  "2m-3": {
    id: "2m-3",
    category: "2M",
    label: "2M · 3 gang horizontal",
    cols: 3,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
    ],
  },
  "2m-4": {
    id: "2m-4",
    category: "2M",
    label: "2M · 4 gang (2x2 grid)",
    cols: 2,
    rows: 2,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
    ],
  },
  // Row 2: 3 frames
  "2m-5": {
    id: "2m-5",
    category: "2M",
    label: "2M · 4 gang (left blank, right <> and ><)",
    cols: 2,
    rows: 2,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0, overlay: "arrows-horizontal" },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1, overlay: "arrows-collapse" },
    ],
  },
  "2m-6": {
    id: "2m-6",
    category: "2M",
    label: "2M · 4 gang (center fan + col2 single arrows)",
    cols: 2,
    rows: 2,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1, overlay: "arrow-down" },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 1 },
      { type: "center-fan" },
    ],
  },
  "2m-7": {
    id: "2m-7",
    category: "2M",
    label: "2M · 4 gang (center bulb + col2 single arrows)",
    cols: 2,
    rows: 2,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1, overlay: "arrow-down" },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 1 },
      { type: "center-bulb" },
    ],
  },

  // ==================== 4M ====================
  // Row 1: 4 frames
  "4m-1": {
    id: "4m-1",
    category: "4M",
    label: "4M · 8 gang (col4=arrows + bulb icon)",
    cols: 4,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1, overlay: "arrow-down" },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 3 },
      { type: "center-bulb", xCol: 3 },
    ],
  },
  "4m-2": {
    id: "4m-2",
    category: "4M",
    label: "4M · 8 gang (col4=arrows + fan icon)",
    cols: 4,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1, overlay: "arrow-down" },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 3 },
      { type: "center-fan", xCol: 3 },
    ],
  },
  "4m-3": {
    id: "4m-3",
    category: "4M",
    label: "4M · 8 gang (col1 & col4=arrows, bulb + fan)",
    cols: 4,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1, overlay: "arrow-down" },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1, overlay: "arrow-down" },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 0 },
      { type: "v-dotted-line-col", col: 3 },
      { type: "center-bulb", xCol: 1 },
      { type: "center-fan", xCol: 3 },
    ],
  },
  "4m-4": {
    id: "4m-4",
    category: "4M",
    label: "4M · 8 gang (col1 & col4=arrows, fan + fan)",
    cols: 4,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1, overlay: "arrow-down" },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1, overlay: "arrow-down" },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 0 },
      { type: "v-dotted-line-col", col: 3 },
      { type: "center-fan", xCol: 1 },
      { type: "center-fan", xCol: 3 },
    ],
  },
  // Row 2: 3 frames
  "4m-5": {
    id: "4m-5",
    category: "4M",
    label: "4M · 8 gang blank slots",
    cols: 4,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
    ],
  },
  "4m-6": {
    id: "4m-6",
    category: "4M",
    label: "4M · 4 gang + 5-pin socket (with arrows & fan)",
    cols: 4,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0, overlay: "arrow-up" },
      { type: "special", x: 2, y: 0, specialType: "socket-2", colSpan: 2, rowSpan: 2 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1, overlay: "arrow-down" },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 1 },
      { type: "center-fan", xCol: 1 },
    ],
  },
  "4m-7": {
    id: "4m-7",
    category: "4M",
    label: "4M · 4 gang + 5-pin socket (plain)",
    cols: 4,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "special", x: 2, y: 0, specialType: "socket", colSpan: 2, rowSpan: 2 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
    ],
  },

  // ==================== 6M ====================
  "6m-1": {
    id: "6m-1",
    category: "6M",
    label: "6M · 4 gang with dual blanks",
    cols: 6,
    rows: 2,
    frame: { w: 560, h: 320 },
    inset: 28,
    items: [
      { type: "blank", x: 0, y: 0, colSpan: 2, rowSpan: 2 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "blank", x: 4, y: 0, colSpan: 2, rowSpan: 2 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
    ],
  },

  // ==================== 8M ====================
  "8m-1": {
    id: "8m-1",
    category: "8M",
    label: "8M · 10 gang + blank",
    cols: 8,
    rows: 2,
    frame: { w: 680, h: 320 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0 },
      { type: "blank", x: 5, y: 0, colSpan: 3, rowSpan: 2 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1 },
    ],
  },
  "8m-2": {
    id: "8m-2",
    category: "8M",
    label: "8M · 6 gang + Dimmer + blank",
    cols: 9,
    rows: 2,
    frame: { w: 680, h: 320 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "special", x: 3, y: 0, specialType: "dimmer-bar", rowSpan: 2 },
      { type: "special", x: 4, y: 0, specialType: "smart-control", colSpan: 2, rowSpan: 2 },
      { type: "blank", x: 6, y: 0, colSpan: 3, rowSpan: 2 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
    ],
  },
  "8m-3": {
    id: "8m-3",
    category: "8M",
    label: "8M · 8 gang + arrows + blank",
    cols: 8,
    rows: 2,
    frame: { w: 680, h: 320 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0, overlay: "arrow-up" },
      { type: "blank", x: 5, y: 0, colSpan: 3, rowSpan: 2 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1, overlay: "arrow-down" },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 4 },
      { type: "center-fan", xCol: 4 },
    ],
  },

  // ==================== 6&8M ====================
  "68m-1": {
    id: "68m-1",
    category: "6&8M",
    label: "6&8M · 12 gang blank slots",
    cols: 6,
    rows: 2,
    frame: { w: 720, h: 320 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0 },
      { type: "slot", x: 5, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1 },
      { type: "slot", x: 5, y: 1 },
    ],
  },
  "68m-2": {
    id: "68m-2",
    category: "6&8M",
    label: "6&8M · 12 gang (Col 1 HP)",
    cols: 6,
    rows: 2,
    frame: { w: 720, h: 320 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0, overlay: "hp" },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0 },
      { type: "slot", x: 5, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1 },
      { type: "slot", x: 5, y: 1 },
    ],
  },
  "68m-3": {
    id: "68m-3",
    category: "6&8M",
    label: "6&8M · 12 gang (Col 1 HP + Col 6 arrows)",
    cols: 6,
    rows: 2,
    frame: { w: 720, h: 320 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0, overlay: "hp" },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0 },
      { type: "slot", x: 5, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1 },
      { type: "slot", x: 5, y: 1, overlay: "arrow-down" },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 5 },
      { type: "center-fan", xCol: 5 },
    ],
  },
  "68m-4": {
    id: "68m-4",
    category: "6&8M",
    label: "6&8M · 12 gang (Col 1 arrows)",
    cols: 6,
    rows: 2,
    frame: { w: 720, h: 320 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0 },
      { type: "slot", x: 5, y: 0 },
      { type: "slot", x: 0, y: 1, overlay: "arrow-down" },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1 },
      { type: "slot", x: 5, y: 1 },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 0 },
      { type: "center-fan", xCol: 1 },
    ],
  },
  "68m-5": {
    id: "68m-5",
    category: "6&8M",
    label: "6&8M · 12 gang (Col 1 & 6 arrows + fan)",
    cols: 6,
    rows: 2,
    frame: { w: 720, h: 320 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0 },
      { type: "slot", x: 5, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1, overlay: "arrow-down" },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1 },
      { type: "slot", x: 5, y: 1, overlay: "arrow-down" },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 0 },
      { type: "v-dotted-line-col", col: 5 },
      { type: "center-fan", xCol: 1 },
      { type: "center-fan", xCol: 5 },
    ],
  },
  "68m-6": {
    id: "68m-6",
    category: "6&8M",
    label: "6&8M · 12 gang (Col 1 & 6 arrows + bulb/fan)",
    cols: 6,
    rows: 2,
    frame: { w: 720, h: 320 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0 },
      { type: "slot", x: 5, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1, overlay: "arrow-down" },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1 },
      { type: "slot", x: 5, y: 1, overlay: "arrow-down" },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 0 },
      { type: "v-dotted-line-col", col: 5 },
      { type: "center-bulb", xCol: 1 },
      { type: "center-fan", xCol: 5 },
    ],
  },
  "68m-7": {
    id: "68m-7",
    category: "6&8M",
    label: "6&8M · 6 gang + Dimmer",
    cols: 6,
    rows: 2,
    frame: { w: 720, h: 320 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "special", x: 3, y: 0, specialType: "dimmer-bar", rowSpan: 2 },
      { type: "special", x: 4, y: 0, specialType: "smart-control", colSpan: 2, rowSpan: 2 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
    ],
  },
  "68m-8": {
    id: "68m-8",
    category: "6&8M",
    label: "6&8M · 8 gang + Socket",
    cols: 6,
    rows: 2,
    frame: { w: 720, h: 320 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "special", x: 4, y: 0, specialType: "socket", colSpan: 2, rowSpan: 2 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
    ],
  },

  // ==================== 12M ====================
  "12m-1": {
    id: "12m-1",
    category: "12M",
    label: "12M · 10 gang with center gap",
    cols: 5,
    rows: 4,
    frame: { w: 640, h: 460 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1 },
      { type: "blank", x: 0, y: 2, colSpan: 2, rowSpan: 2 },
      { type: "blank", x: 2, y: 2, colSpan: 1, rowSpan: 2, specialType: "spacer" },
      { type: "blank", x: 3, y: 2, colSpan: 2, rowSpan: 2 },
    ],
  },
  "12m-2": {
    id: "12m-2",
    category: "12M",
    label: "12M · 10 gang (Col 5 arrows-h/collapse)",
    cols: 5,
    rows: 4,
    frame: { w: 640, h: 460 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0, overlay: "arrows-horizontal" },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1, overlay: "arrows-collapse" },
      { type: "blank", x: 0, y: 2, colSpan: 2, rowSpan: 2 },
      { type: "blank", x: 2, y: 2, colSpan: 1, rowSpan: 2, specialType: "spacer" },
      { type: "blank", x: 3, y: 2, colSpan: 2, rowSpan: 2 },
    ],
  },
  "12m-3": {
    id: "12m-3",
    category: "12M",
    label: "12M · 10 gang (Col 5 arrows)",
    cols: 5,
    rows: 4,
    frame: { w: 640, h: 460 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1, overlay: "arrow-down" },
      { type: "blank", x: 0, y: 2, colSpan: 2, rowSpan: 2 },
      { type: "blank", x: 2, y: 2, colSpan: 1, rowSpan: 2, specialType: "spacer" },
      { type: "blank", x: 3, y: 2, colSpan: 2, rowSpan: 2 },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 4 },
      { type: "center-fan", xCol: 4 },
    ],
  },
  "12m-4": {
    id: "12m-4",
    category: "12M",
    label: "12M · 10 gang (Col 1 & 5 arrows)",
    cols: 5,
    rows: 4,
    frame: { w: 640, h: 460 },
    inset: 28,
    items: [
      { type: "slot", x: 0, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 4, y: 0, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1, overlay: "arrow-down" },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 4, y: 1, overlay: "arrow-down" },
      { type: "blank", x: 0, y: 2, colSpan: 2, rowSpan: 2 },
      { type: "blank", x: 2, y: 2, colSpan: 1, rowSpan: 2, specialType: "spacer" },
      { type: "blank", x: 3, y: 2, colSpan: 2, rowSpan: 2 },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 0 },
      { type: "v-dotted-line-col", col: 4 },
      { type: "center-fan", xCol: 1 },
      { type: "center-fan", xCol: 4 },
    ],
  },
  "12m-5": {
    id: "12m-5",
    category: "12M",
    label: "12M · 12 gang with 2x2 middle slots",
    cols: 10,
    rows: 4,
    frame: { w: 640, h: 460 },
    inset: 28,
    cellColSpan: 2,
    items: [
      { type: "slot", x: 0, y: 0, colSpan: 2 },
      { type: "slot", x: 2, y: 0, colSpan: 2 },
      { type: "slot", x: 4, y: 0, colSpan: 2 },
      { type: "slot", x: 6, y: 0, colSpan: 2 },
      { type: "slot", x: 8, y: 0, colSpan: 2 },
      { type: "slot", x: 0, y: 1, colSpan: 2 },
      { type: "slot", x: 2, y: 1, colSpan: 2 },
      { type: "slot", x: 4, y: 1, colSpan: 2 },
      { type: "slot", x: 6, y: 1, colSpan: 2 },
      { type: "slot", x: 8, y: 1, colSpan: 2 },
      { type: "blank", x: 0, y: 2, colSpan: 3, rowSpan: 2 },
      { type: "slot", x: 3, y: 2, colSpan: 2 },
      { type: "slot", x: 5, y: 2, colSpan: 2 },
      { type: "blank", x: 7, y: 2, colSpan: 3, rowSpan: 2 },
      { type: "slot", x: 3, y: 3, colSpan: 2 },
      { type: "slot", x: 5, y: 3, colSpan: 2 },
    ],
  },
  "12m-6": {
    id: "12m-6",
    category: "12M",
    label: "12M · 12 gang (Col 5 arrows-h/collapse)",
    cols: 10,
    rows: 4,
    frame: { w: 640, h: 460 },
    inset: 28,
    cellColSpan: 2,
    items: [
      { type: "slot", x: 0, y: 0, colSpan: 2 },
      { type: "slot", x: 2, y: 0, colSpan: 2 },
      { type: "slot", x: 4, y: 0, colSpan: 2 },
      { type: "slot", x: 6, y: 0, colSpan: 2 },
      { type: "slot", x: 8, y: 0, colSpan: 2, overlay: "arrows-horizontal" },
      { type: "slot", x: 0, y: 1, colSpan: 2 },
      { type: "slot", x: 2, y: 1, colSpan: 2 },
      { type: "slot", x: 4, y: 1, colSpan: 2 },
      { type: "slot", x: 6, y: 1, colSpan: 2 },
      { type: "slot", x: 8, y: 1, colSpan: 2, overlay: "arrows-collapse" },
      { type: "blank", x: 0, y: 2, colSpan: 3, rowSpan: 2 },
      { type: "slot", x: 3, y: 2, colSpan: 2 },
      { type: "slot", x: 5, y: 2, colSpan: 2 },
      { type: "blank", x: 7, y: 2, colSpan: 3, rowSpan: 2 },
      { type: "slot", x: 3, y: 3, colSpan: 2 },
      { type: "slot", x: 5, y: 3, colSpan: 2 },
    ],
  },
  "12m-7": {
    id: "12m-7",
    category: "12M",
    label: "12M · 12 gang (Col 5 arrows/fan)",
    cols: 10,
    rows: 4,
    frame: { w: 640, h: 460 },
    inset: 28,
    cellColSpan: 2,
    items: [
      { type: "slot", x: 0, y: 0, colSpan: 2 },
      { type: "slot", x: 2, y: 0, colSpan: 2 },
      { type: "slot", x: 4, y: 0, colSpan: 2 },
      { type: "slot", x: 6, y: 0, colSpan: 2 },
      { type: "slot", x: 8, y: 0, colSpan: 2, overlay: "arrow-up" },
      { type: "slot", x: 0, y: 1, colSpan: 2 },
      { type: "slot", x: 2, y: 1, colSpan: 2 },
      { type: "slot", x: 4, y: 1, colSpan: 2 },
      { type: "slot", x: 6, y: 1, colSpan: 2 },
      { type: "slot", x: 8, y: 1, colSpan: 2, overlay: "arrow-down" },
      { type: "blank", x: 0, y: 2, colSpan: 3, rowSpan: 2 },
      { type: "slot", x: 3, y: 2, colSpan: 2 },
      { type: "slot", x: 5, y: 2, colSpan: 2 },
      { type: "blank", x: 7, y: 2, colSpan: 3, rowSpan: 2 },
      { type: "slot", x: 3, y: 3, colSpan: 2 },
      { type: "slot", x: 5, y: 3, colSpan: 2 },
    ],
    decorations: [
      { type: "v-dotted-line-col", col: 4 },
      { type: "center-fan", xCol: 4 },
    ],
  },
  // ==================== 2MQ (Pro+) ====================
  "2mq-1": {
    id: "2mq-1",
    category: "2MQ",
    label: "2MQ · 1gang Light",
    cols: 3,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "blank", x: 0, y: 0, specialType: "spacer" },
      { type: "slot", x: 1, y: 0 },
      { type: "blank", x: 2, y: 0, specialType: "spacer" },
    ],
  },
  "2mq-2": {
    id: "2mq-2",
    category: "2MQ",
    label: "2MQ · 2gang Light",
    cols: 4,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "blank", x: 0, y: 0, specialType: "spacer" },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "blank", x: 3, y: 0, specialType: "spacer" },
    ],
  },
  "2mq-3": {
    id: "2mq-3",
    category: "2MQ",
    label: "2MQ · 3gang Light/socket",
    cols: 3,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
    ],
  },
  "2mq-4": {
    id: "2mq-4",
    category: "2MQ",
    label: "2MQ · 4gang Light",
    cols: 2,
    rows: 2,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
    ],
  },
  "2mq-5": {
    id: "2mq-5",
    category: "2MQ",
    label: "2MQ · 4gang Light + 2gang Scene",
    cols: 3,
    rows: 2,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
    ],
  },
  "2mq-6": {
    id: "2mq-6",
    category: "2MQ",
    label: "2MQ · 4gang Scene",
    cols: 2,
    rows: 2,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
    ],
  },
  "2mq-7": {
    id: "2mq-7",
    category: "2MQ",
    label: "2MQ · 30A Power",
    cols: 3,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "blank", x: 0, y: 0, specialType: "spacer" },
      { type: "slot", x: 1, y: 0, overlay: "power-droplet" },
      { type: "blank", x: 2, y: 0, specialType: "spacer" },
    ],
  },
  "2mq-8": {
    id: "2mq-8",
    category: "2MQ",
    label: "2MQ · 1way 3gang Dimmer",
    cols: 3,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0, overlay: "minus" },
      { type: "slot", x: 1, y: 0, overlay: "sun-dimmer" },
      { type: "slot", x: 2, y: 0, overlay: "plus" },
    ],
  },
  "2mq-9": {
    id: "2mq-9",
    category: "2MQ",
    label: "2MQ · 2way 2gang Dimmer",
    cols: 4,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "blank", x: 0, y: 0, specialType: "spacer" },
      { type: "slot", x: 1, y: 0, overlay: "sun-dimmer" },
      { type: "slot", x: 2, y: 0, overlay: "sun-dimmer" },
      { type: "blank", x: 3, y: 0, specialType: "spacer" },
    ],
  },
  "2mq-10": {
    id: "2mq-10",
    category: "2MQ",
    label: "2MQ · 3way 3gang Dimmer",
    cols: 3,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0, overlay: "sun-dimmer" },
      { type: "slot", x: 1, y: 0, overlay: "sun-dimmer" },
      { type: "slot", x: 2, y: 0, overlay: "sun-dimmer" },
    ],
  },
  "2mq-11": {
    id: "2mq-11",
    category: "2MQ",
    label: "2MQ · 1way 3gang Fan",
    cols: 3,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0, overlay: "minus" },
      { type: "slot", x: 1, y: 0, overlay: "fan-dimmer" },
      { type: "slot", x: 2, y: 0, overlay: "plus" },
    ],
  },
  "2mq-led-1": {
    id: "2mq-led-1",
    category: "2MQ",
    label: "2MQ · 1gang LED display",
    cols: 3,
    rows: 2,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "blank", x: 0, y: 0, specialType: "spacer" },
      { type: "blank", x: 1, y: 0, specialType: "led-bar" },
      { type: "blank", x: 2, y: 0, specialType: "spacer" },
      { type: "blank", x: 0, y: 1, specialType: "spacer" },
      { type: "slot", x: 1, y: 1 },
      { type: "blank", x: 2, y: 1, specialType: "spacer" },
    ],
  },
  "2mq-led-2": {
    id: "2mq-led-2",
    category: "2MQ",
    label: "2MQ · 2gang LED display",
    cols: 4,
    rows: 2,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "blank", x: 0, y: 0, specialType: "spacer" },
      { type: "blank", x: 1, y: 0, specialType: "led-bar" },
      { type: "blank", x: 2, y: 0, specialType: "led-bar" },
      { type: "blank", x: 3, y: 0, specialType: "spacer" },
      { type: "blank", x: 0, y: 1, specialType: "spacer" },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "blank", x: 3, y: 1, specialType: "spacer" },
    ],
  },
  "2mq-led-3": {
    id: "2mq-led-3",
    category: "2MQ",
    label: "2MQ · 3gang LED display",
    cols: 3,
    rows: 2,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "blank", x: 0, y: 0, specialType: "led-bar" },
      { type: "blank", x: 1, y: 0, specialType: "led-bar" },
      { type: "blank", x: 2, y: 0, specialType: "led-bar" },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
      { type: "slot", x: 2, y: 1 },
    ],
  },
  "4mq-1": {
    id: "4mq-1",
    category: "4MQ",
    label: "4MQ · 4+4gang",
    cols: 6,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "blank", x: 1, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "blank", x: 4, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 5, y: 0 },
      { type: "slot", x: 5, y: 1 },
    ],
  },
  "4mq-2": {
    id: "4mq-2",
    category: "4MQ",
    label: "4MQ · 4+3gang",
    cols: 7,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "blank", x: 1, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "blank", x: 3, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 4, y: 0, rowSpan: 2 },
      { type: "slot", x: 5, y: 0, rowSpan: 2 },
      { type: "slot", x: 6, y: 0, rowSpan: 2 },
    ],
  },
  "4mq-3": {
    id: "4mq-3",
    category: "4MQ",
    label: "4MQ · 3+3gang",
    cols: 7,
    rows: 1,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "blank", x: 3, y: 0, specialType: "spacer" },
      { type: "slot", x: 4, y: 0 },
      { type: "slot", x: 5, y: 0 },
      { type: "slot", x: 6, y: 0 },
    ],
  },
  "4mq-4": {
    id: "4mq-4",
    category: "4MQ",
    label: "4MQ · 4gang + socket",
    cols: 6,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "blank", x: 1, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "blank", x: 3, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 4, y: 0, colSpan: 2, rowSpan: 2 },
    ],
  },
  "4mq-5": {
    id: "4mq-5",
    category: "4MQ",
    label: "4MQ · 3gang + socket",
    cols: 6,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0, rowSpan: 2 },
      { type: "slot", x: 1, y: 0, rowSpan: 2 },
      { type: "slot", x: 2, y: 0, rowSpan: 2 },
      { type: "blank", x: 3, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 4, y: 0, colSpan: 2, rowSpan: 2 },
    ],
  },
  "68mq-1": {
    id: "68mq-1",
    category: "6&8MQ",
    label: "6&8MQ · 3gang + 3gang + Dimmer",
    cols: 11,
    rows: 1,
    frame: { w: 710, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "blank", x: 3, y: 0, specialType: "spacer" },
      { type: "slot", x: 4, y: 0 },
      { type: "slot", x: 5, y: 0 },
      { type: "slot", x: 6, y: 0 },
      { type: "blank", x: 7, y: 0, specialType: "spacer" },
      { type: "slot", x: 8, y: 0, overlay: "minus" },
      { type: "slot", x: 9, y: 0, overlay: "sun-dimmer" },
      { type: "slot", x: 10, y: 0, overlay: "plus" },
    ],
  },
  "68mq-2": {
    id: "68mq-2",
    category: "6&8MQ",
    label: "6&8MQ · 4gang + 3gang + 3gang",
    cols: 11,
    rows: 2,
    frame: { w: 710, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "blank", x: 1, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "blank", x: 3, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 4, y: 0, rowSpan: 2 },
      { type: "slot", x: 5, y: 0, rowSpan: 2 },
      { type: "slot", x: 6, y: 0, rowSpan: 2 },
      { type: "blank", x: 7, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 8, y: 0, rowSpan: 2 },
      { type: "slot", x: 9, y: 0, rowSpan: 2 },
      { type: "slot", x: 10, y: 0, rowSpan: 2 },
    ],
  },
  "68mq-3": {
    id: "68mq-3",
    category: "6&8MQ",
    label: "6&8MQ · 12gang",
    cols: 9,
    rows: 2,
    frame: { w: 710, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "blank", x: 1, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "blank", x: 4, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 5, y: 0 },
      { type: "slot", x: 6, y: 0 },
      { type: "slot", x: 5, y: 1 },
      { type: "slot", x: 6, y: 1 },
      { type: "blank", x: 7, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 8, y: 0 },
      { type: "slot", x: 8, y: 1 },
    ],
  },
  "68mq-4": {
    id: "68mq-4",
    category: "6&8MQ",
    label: "6&8MQ · 4gang + Blank + 4gang",
    cols: 10,
    rows: 2,
    frame: { w: 710, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "blank", x: 1, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "blank", x: 3, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 4, y: 0, colSpan: 2, rowSpan: 2 },
      { type: "blank", x: 6, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 7, y: 0 },
      { type: "blank", x: 8, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 9, y: 0 },
      { type: "slot", x: 7, y: 1 },
      { type: "slot", x: 9, y: 1 },
    ],
  },
  "68mq-5": {
    id: "68mq-5",
    category: "6&8MQ",
    label: "6&8MQ · 4gang + Blank + 3gang",
    cols: 10,
    rows: 2,
    frame: { w: 710, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "blank", x: 1, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "blank", x: 3, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 4, y: 0, colSpan: 2, rowSpan: 2 },
      { type: "blank", x: 6, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 7, y: 0, rowSpan: 2 },
      { type: "slot", x: 8, y: 0, rowSpan: 2 },
      { type: "slot", x: 9, y: 0, rowSpan: 2 },
    ],
  },
  "68mq-6": {
    id: "68mq-6",
    category: "6&8MQ",
    label: "6&8MQ · Dimmer + Blank + Power Switch",
    cols: 10,
    rows: 2,
    frame: { w: 710, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0, rowSpan: 2, overlay: "minus" },
      { type: "slot", x: 1, y: 0, rowSpan: 2, overlay: "sun-dimmer" },
      { type: "slot", x: 2, y: 0, rowSpan: 2, overlay: "plus" },
      { type: "blank", x: 3, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 4, y: 0, colSpan: 2, rowSpan: 2 },
      { type: "blank", x: 6, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 7, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 8, y: 0, rowSpan: 2, overlay: "power-droplet" },
      { type: "blank", x: 9, y: 0, specialType: "spacer", rowSpan: 2 },
    ],
  },
  "68mq-7": {
    id: "68mq-7",
    category: "6&8MQ",
    label: "6&8MQ · Blank + Power Switch + Blank",
    cols: 9,
    rows: 2,
    frame: { w: 710, h: 280 },
    inset: 24,
    items: [
      { type: "blank", x: 0, y: 0, colSpan: 2, rowSpan: 2 },
      { type: "blank", x: 2, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 3, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 4, y: 0, rowSpan: 2, overlay: "power-droplet" },
      { type: "blank", x: 5, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 6, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 7, y: 0, colSpan: 2, rowSpan: 2 },
    ],
  },
  "68mq-8": {
    id: "68mq-8",
    category: "6&8MQ",
    label: "6&8MQ · Blank + 4gang + Blank",
    cols: 9,
    rows: 2,
    frame: { w: 710, h: 280 },
    inset: 24,
    items: [
      { type: "blank", x: 0, y: 0, colSpan: 2, rowSpan: 2 },
      { type: "blank", x: 2, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 3, y: 0 },
      { type: "blank", x: 4, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 5, y: 0 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 5, y: 1 },
      { type: "blank", x: 6, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 7, y: 0, colSpan: 2, rowSpan: 2 },
    ],
  },
  // ==================== Architect Series ====================
  "arch-2m-2switch": {
    id: "arch-2m-2switch",
    category: "2M",
    label: "2M Switch",
    cols: 3,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "blank", x: 1, y: 0, specialType: "spacer" },
      { type: "slot", x: 2, y: 0 },
    ],
  },
  "arch-2m-bell": {
    id: "arch-2m-bell",
    category: "2M",
    label: "2M Bell Switch",
    cols: 3,
    rows: 1,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "blank", x: 0, y: 0, specialType: "spacer" },
      { type: "slot", x: 1, y: 0 },
      { type: "blank", x: 2, y: 0, specialType: "spacer" },
    ],
  },
  "arch-2m-4switch": {
    id: "arch-2m-4switch",
    category: "2M",
    label: "2M 4 Switch",
    cols: 2,
    rows: 2,
    frame: { w: 290, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 1, y: 1 },
    ],
  },
  "arch-4m-8switch": {
    id: "arch-4m-8switch",
    category: "4M",
    label: "4M 8 Switch",
    cols: 6,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 3, y: 0 },
      { type: "slot", x: 5, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "slot", x: 3, y: 1 },
      { type: "slot", x: 5, y: 1 },
      { type: "blank", x: 1, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 4, y: 0, specialType: "spacer", rowSpan: 2 },
    ],
  },
  "arch-4m-6switch": {
    id: "arch-4m-6switch",
    category: "4M",
    label: "4M 6 Switch",
    cols: 7,
    rows: 1,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 1, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "blank", x: 3, y: 0, specialType: "spacer" },
      { type: "slot", x: 4, y: 0 },
      { type: "slot", x: 5, y: 0 },
      { type: "slot", x: 6, y: 0 },
    ],
  },
  "arch-4m-heavy": {
    id: "arch-4m-heavy",
    category: "4M",
    label: "4M Heavy Load Switch + 4 Switch",
    cols: 5,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "blank", x: 1, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 3, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "slot", x: 4, y: 0, rowSpan: 2, overlay: "power-droplet" },
    ],
  },
  "arch-4m-socket": {
    id: "arch-4m-socket",
    category: "4M",
    label: "4M Switch + Socket",
    cols: 6,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "blank", x: 1, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 3, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "special", x: 4, y: 0, specialType: "socket", colSpan: 2, rowSpan: 2 },
    ],
  },
  "arch-4m-socket-usbc": {
    id: "arch-4m-socket-usbc",
    category: "4M",
    label: "4M Switch + Socket + Ctype + USB",
    cols: 6,
    rows: 2,
    frame: { w: 500, h: 280 },
    inset: 24,
    items: [
      { type: "slot", x: 0, y: 0 },
      { type: "slot", x: 2, y: 0 },
      { type: "slot", x: 0, y: 1 },
      { type: "slot", x: 2, y: 1 },
      { type: "blank", x: 1, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "blank", x: 3, y: 0, specialType: "spacer", rowSpan: 2 },
      { type: "special", x: 4, y: 0, specialType: "socket-usbc", colSpan: 2, rowSpan: 2 },
    ],
  },
};

export interface IconDef {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const ICONS: IconDef[] = [
  { id: "light", label: "Light", icon: Lightbulb },
  { id: "fan", label: "Fan", icon: Fan },
  { id: "ac", label: "AC", icon: Snowflake },
  { id: "bell", label: "Bell", icon: Bell },
  { id: "dimmer", label: "Dimmer", icon: SunDim },
  { id: "socket", label: "5-pin socket", icon: Plug },
  { id: "usbc", label: "USB-C", icon: Usb },
  { id: "camera", label: "Camera", icon: Camera },
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "tv", label: "TV", icon: Tv },
  { id: "speaker", label: "Speaker", icon: Volume2 },
  { id: "power", label: "Power", icon: Power },
  { id: "door", label: "Door", icon: DoorOpen },
  { id: "temp", label: "Thermostat", icon: Thermometer },
  { id: "home", label: "Home", icon: Home },
  { id: "out", label: "Out", icon: LogOut },
  { id: "sleep", label: "Sleep", icon: Moon },
  { id: "diy", label: "DIY", icon: Cpu },
];

export const ICON_MAP: Record<string, IconDef> = Object.fromEntries(
  ICONS.map((i) => [i.id, i]),
);

export interface ColorTheme {
  id: string;
  name: string;
  bg: string;
  border: string;
  btnBg: string;
  text: string;
  previewBg: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  // {
  //   id: "pine-green",
  //   name: "Pine Green",
  //   bg: "#034B25",
  //   border: "#023A1D",
  //   btnBg: "#056332",
  //   text: "#FFFFFF",
  //   previewBg: "#034B25",
  // },
  // {
  //   id: "puma",
  //   name: "Puma Color",
  //   bg: "#98731E",
  //   border: "#7A5C18",
  //   btnBg: "#A8832A",
  //   text: "#FFFFFF",
  //   previewBg: "#98731E",
  // },
  {
    id: "black",
    name: "Black Color",
    bg: "#000000",
    border: "#333333",
    btnBg: "#1A1A1A",
    text: "#FFFFFF",
    previewBg: "#000000",
  },
  {
    id: "white",
    name: "White Color",
    bg: "#F8F7F4",
    border: "#B8B5AE",
    btnBg: "#F0EFEC",
    text: "#1A1A1A",
    previewBg: "#F8F7F4",
  },
  {
    id: "grey",
    name: "Grey Color",
    bg: "#3F3F46",
    border: "#71717A",
    btnBg: "#27272A",
    text: "#FFFFFF",
    previewBg: "#4B5563",
  },
  {
    id: "rose-gold",
    name: "Rose Gold Color",
    bg: "#B76E79",
    border: "#D29BA3",
    btnBg: "#8F4853",
    text: "#FFFFFF",
    previewBg: "#B76E79",
  },
];

export interface PanelConfig {
  id: string;
  type: string;
  /** slot index -> icon id (or null) */
  slots: (string | null)[];
  color?: string;
  series?: string;
  location?: string;
}

export interface CartItem {
  id: string;
  config: PanelConfig;
  qty: number;
  name: string;
}

export function emptyConfig(type: PanelType, series: string = "classic"): PanelConfig {
  const def = PANELS[type];
  if (!def) {
    return {
      id: generateUUID(),
      type,
      slots: [],
      color: "black",
      series,
      location: "",
    };
  }
  const slotCount = def.items.filter((item) => item.type === "slot").length;
  const slots = Array(slotCount).fill(null);

  // Pre-load default icons for Pro+ 2MQ frames to match their specs
  if (type === "2mq-1") {
    slots[0] = "light";
  } else if (type === "2mq-2") {
    slots[0] = "light";
    slots[1] = "light";
  } else if (type === "2mq-3") {
    slots[0] = "light";
    slots[1] = "light";
    slots[2] = "light";
  } else if (type === "2mq-4") {
    slots[0] = "light";
    slots[1] = "light";
    slots[2] = "light";
    slots[3] = "light";
  } else if (type === "2mq-5") {
    slots[0] = "light";
    slots[1] = "light";
    slots[2] = "home";
    slots[3] = "light";
    slots[4] = "light";
    slots[5] = "sleep";
  } else if (type === "2mq-6") {
    slots[0] = "home";
    slots[1] = "out";
    slots[2] = "sleep";
    slots[3] = "diy";
  } else if (type === "2mq-7") {
    slots[0] = "power";
  } else if (type === "2mq-8") {
    slots[1] = "dimmer";
  } else if (type === "2mq-11") {
    slots[1] = "fan";
  } else if (type === "2mq-led-1") {
    slots[0] = "light";
  } else if (type === "2mq-led-2") {
    slots[0] = "light";
    slots[1] = "light";
  } else if (type === "2mq-led-3") {
    slots[0] = "light";
    slots[1] = "light";
    slots[2] = "light";
  } else if (type === "4mq-1") {
    slots.fill("light");
  } else if (type === "4mq-2") {
    slots.fill("light");
  } else if (type === "4mq-3") {
    slots.fill("light");
  } else if (type === "4mq-4") {
    slots.fill("light");
  } else if (type === "4mq-5") {
    slots.fill("light");
  } else if (type === "68mq-1") {
    // 6 slots on left, 3 dimmer slots on right
    slots.fill("light", 0, 6);
    slots[7] = "dimmer";
  } else if (type === "68mq-2") {
    slots.fill("light");
  } else if (type === "68mq-3") {
    slots.fill("light");
  } else if (type === "68mq-4") {
    slots.fill("light");
  } else if (type === "68mq-5") {
    slots.fill("light");
  } else if (type === "68mq-6") {
    slots[7] = "power";
  } else if (type === "68mq-7") {
    slots[0] = "power";
  } else if (type === "68mq-8") {
    slots.fill("light");
  } else if (type === "arch-2m-2switch") {
    slots.fill("light");
  } else if (type === "arch-2m-bell") {
    slots[0] = "bell";
  } else if (type === "arch-2m-4switch") {
    slots.fill("light");
  } else if (type === "arch-4m-8switch") {
    slots.fill("light");
  } else if (type === "arch-4m-6switch") {
    slots.fill("light");
  } else if (type === "arch-4m-heavy") {
    slots[0] = "light";
    slots[1] = "light";
    slots[2] = "light";
    slots[3] = "light";
    slots[4] = "power";
  } else if (type === "arch-4m-socket") {
    slots.fill("light");
  } else if (type === "arch-4m-socket-usbc") {
    slots.fill("light");
  }

  return {
    id: generateUUID(),
    type,
    slots,
    color: "black",
    series,
    location: "",
  };
}

export function describeConfig(cfg: PanelConfig): string {
  const def = PANELS[cfg.type];
  if (!def) return "Unknown frame";
  const counts: Record<string, number> = {};
  cfg.slots.forEach((s) => {
    if (s) counts[s] = (counts[s] || 0) + 1;
  });
  const parts = Object.entries(counts).map(
    ([id, n]) => `${n} ${ICON_MAP[id]?.label ?? id}`,
  );
  return parts.length ? parts.join(" + ") : `${def.label} (empty)`;
}
