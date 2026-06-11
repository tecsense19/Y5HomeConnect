import { generateUUID, type PanelConfig, type PanelType } from "./panel-types";

export interface Preset {
  id: string;
  type: PanelType;
  label: string;
  qty: number;
  slots: (string | null)[];
}

export const PRESETS: { section: string; items: Preset[] }[] = [
  {
    section: "2M Presets",
    items: [
      {
        id: "preset-2m-1",
        type: "2m-1",
        label: "2M · 2 gang with charging (gap)",
        qty: 1,
        slots: ["fan", null],
      },
      {
        id: "preset-2m-2",
        type: "2m-2",
        label: "2M · 2 gang blank (gap)",
        qty: 1,
        slots: ["light", "fan"],
      },
      {
        id: "preset-2m-3",
        type: "2m-3",
        label: "2M · 3 gang stacked",
        qty: 1,
        slots: ["light", "light", "fan"],
      },
      {
        id: "preset-2m-4",
        type: "2m-4",
        label: "2M · 4 gang (2x2 grid)",
        qty: 1,
        slots: ["light", "light", "fan", "bell"],
      },
      {
        id: "preset-2m-5",
        type: "2m-5",
        label: "2M · 4 gang (left blank, right <> and ><)",
        qty: 1,
        slots: ["light", null, "temp", null],
      },
      {
        id: "preset-2m-6",
        type: "2m-6",
        label: "2M · 4 gang (center fan + col2 arrows)",
        qty: 1,
        slots: ["light", null, "dimmer", null],
      },
      {
        id: "preset-2m-7",
        type: "2m-7",
        label: "2M · 4 gang (center bulb + col2 arrows)",
        qty: 1,
        slots: ["light", null, "temp", null],
      },
    ],
  },
  {
    section: "4M Presets",
    items: [
      {
        id: "preset-4m-1",
        type: "4m-1",
        label: "4M · 8 gang (col4=arrows + bulb)",
        qty: 1,
        slots: ["light", "light", "light", null, "light", "light", "light", null],
      },
      {
        id: "preset-4m-2",
        type: "4m-2",
        label: "4M · 8 gang (col4=arrows + fan)",
        qty: 1,
        slots: ["light", "light", "light", null, "bell", "dimmer", "temp", null],
      },
      {
        id: "preset-4m-3",
        type: "4m-3",
        label: "4M · 8 gang (col1 & col4=arrows, bulb+fan)",
        qty: 1,
        slots: [null, "light", "light", null, null, "light", "light", null],
      },
      {
        id: "preset-4m-4",
        type: "4m-4",
        label: "4M · 8 gang (col1 & col4=arrows, fan+fan)",
        qty: 1,
        slots: [null, "light", "light", null, null, "light", "light", null],
      },
      {
        id: "preset-4m-5",
        type: "4m-5",
        label: "4M · 8 gang blank slots",
        qty: 1,
        slots: ["light", "light", "light", "light", "light", "light", "light", "light"],
      },
      {
        id: "preset-4m-6",
        type: "4m-6",
        label: "4M · 4 gang + 5-pin socket (arrows)",
        qty: 1,
        slots: ["light", null, "fan", null],
      },
      {
        id: "preset-4m-7",
        type: "4m-7",
        label: "4M · 4 gang + 5-pin socket (plain)",
        qty: 1,
        slots: ["light", "light", "fan", "ac"],
      },
    ],
  },
  {
    section: "6M & 8M Presets",
    items: [
      {
        id: "preset-6m-1",
        type: "6m-1",
        label: "6M · 4 gang with dual blanks",
        qty: 1,
        slots: ["light", "light", "fan", "ac"],
      },
      {
        id: "preset-8m-1",
        type: "8m-1",
        label: "8M · 10 gang + blank",
        qty: 1,
        slots: ["light", "light", "light", "light", "fan", "fan", "ac", "ac", "bell", "dimmer"],
      },
      {
        id: "preset-8m-2",
        type: "8m-2",
        label: "8M · 6 gang + Dimmer + blank",
        qty: 1,
        slots: ["light", "light", "light", "fan", "ac", "power"],
      },
      {
        id: "preset-8m-3",
        type: "8m-3",
        label: "8M · 8 gang + arrows + blank",
        qty: 1,
        slots: ["light", "light", "light", "light", null, "fan", "ac", "ac", "bell", null],
      },
    ],
  },
  {
    section: "6&8M Presets",
    items: [
      {
        id: "preset-68m-1",
        type: "68m-1",
        label: "6&8M · 12 gang blank slots",
        qty: 1,
        slots: ["light", "light", "light", "light", "fan", "fan", "ac", "ac", "bell", "dimmer", "wifi", "tv"],
      },
      {
        id: "preset-68m-2",
        type: "68m-2",
        label: "6&8M · 12 gang (Col 1 HP)",
        qty: 1,
        slots: [null, "light", "light", "light", "fan", "fan", "ac", "ac", "bell", "dimmer", "wifi", "tv"],
      },
      {
        id: "preset-68m-3",
        type: "68m-3",
        label: "6&8M · 12 gang (Col 1 HP + Col 6 arrows)",
        qty: 1,
        slots: [null, "light", "light", "light", "fan", null, "ac", "ac", "bell", "dimmer", "wifi", null],
      },
      {
        id: "preset-68m-4",
        type: "68m-4",
        label: "6&8M · 12 gang (Col 1 arrows)",
        qty: 1,
        slots: [null, "light", "light", "light", "fan", "fan", null, "ac", "bell", "dimmer", "wifi", "tv"],
      },
      {
        id: "preset-68m-5",
        type: "68m-5",
        label: "6&8M · 12 gang (Col 1 & 6 arrows + fan)",
        qty: 1,
        slots: [null, "light", "light", "light", "fan", null, null, "ac", "bell", "dimmer", "wifi", null],
      },
      {
        id: "preset-68m-6",
        type: "68m-6",
        label: "6&8M · 12 gang (Col 1 & 6 arrows + bulb/fan)",
        qty: 1,
        slots: [null, "light", "light", "light", "fan", null, null, "ac", "bell", "dimmer", "wifi", null],
      },
      {
        id: "preset-68m-7",
        type: "68m-7",
        label: "6&8M · 6 gang + Dimmer",
        qty: 1,
        slots: ["light", "light", "light", "fan", "ac", "power"],
      },
      {
        id: "preset-68m-8",
        type: "68m-8",
        label: "6&8M · 8 gang + Socket",
        qty: 1,
        slots: ["light", "light", "light", "light", "fan", "ac", "power", "dimmer"],
      },
    ],
  },
  {
    section: "12M Presets",
    items: [
      {
        id: "preset-12m-1",
        type: "12m-1",
        label: "12M · 10 gang with center gap",
        qty: 1,
        slots: ["light", "light", "light", "light", "fan", "fan", "ac", "ac", "bell", "dimmer"],
      },
      {
        id: "preset-12m-2",
        type: "12m-2",
        label: "12M · 10 gang (Col 5 arrows-h/collapse)",
        qty: 1,
        slots: ["light", "light", "light", "light", null, "fan", "ac", "ac", "bell", null],
      },
      {
        id: "preset-12m-3",
        type: "12m-3",
        label: "12M · 10 gang (Col 5 arrows)",
        qty: 1,
        slots: ["light", "light", "light", "light", null, "fan", "ac", "ac", "bell", null],
      },
      {
        id: "preset-12m-4",
        type: "12m-4",
        label: "12M · 10 gang (Col 1 & 5 arrows)",
        qty: 1,
        slots: [null, "light", "light", "light", null, null, "ac", "ac", "bell", null],
      },
      {
        id: "preset-12m-5",
        type: "12m-5",
        label: "12M · 12 gang with 2x2 middle slots",
        qty: 1,
        slots: ["light", "light", "light", "light", "fan", "fan", "ac", "ac", "bell", "dimmer", "wifi", "tv"],
      },
      {
        id: "preset-12m-6",
        type: "12m-6",
        label: "12M · 12 gang (Col 5 arrows-h/collapse)",
        qty: 1,
        slots: ["light", "light", "light", "light", null, "fan", "ac", "ac", "bell", null, "wifi", "tv"],
      },
      {
        id: "preset-12m-7",
        type: "12m-7",
        label: "12M · 12 gang (Col 5 arrows/fan)",
        qty: 1,
        slots: ["light", "light", "light", "light", null, "fan", "ac", "ac", "bell", null, "wifi", "tv"],
      },
    ],
  },
];

export function presetToConfig(p: Preset): PanelConfig {
  return {
    id: generateUUID(),
    type: p.type,
    slots: [...p.slots],
  };
}
