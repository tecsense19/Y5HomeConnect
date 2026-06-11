import { useState, useEffect, useRef } from "react";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { createFileRoute } from "@tanstack/react-router";
import { CartProvider, useCart } from "@/lib/cart-store";
import { CartPanel } from "@/components/CartPanel";
import { PanelFrame, SlotOverlay, PowerSlotIcon } from "@/components/PanelFrame";
import {
  ICONS,
  ICON_MAP,
  PANELS,
  COLOR_THEMES,
  type PanelConfig,
  type PanelType,
  emptyConfig,
  generateUUID,
} from "@/lib/panel-types";
import { PRESETS, presetToConfig, type Preset } from "@/lib/presets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ShoppingCart, RotateCcw, Plus, Minus, Layers, ClipboardList, Wifi, Home, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Y5homeLogo from "@/assets/Y5home_Technologies.webp";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Classic Series Touch Switches Icon Layout · Kiosk" },
      {
        name: "description",
        content:
          "Touch kiosk: browse the switch-panel catalog, select your frame configuration, drag any symbol into your master frame, then add it to cart and print a PDF order sheet.",
      },
    ],
  }),
  component: KioskPage,
});

/* -------------------- icon palette (draggable source) -------------------- */

function PaletteIcon({ id }: { id: string }) {
  const def = ICON_MAP[id];
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette:${id}`,
    data: { iconId: id },
  });
  const Icon = def.icon;
  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "flex aspect-square w-full touch-none flex-col items-center justify-center gap-0.5 rounded-lg border border-border bg-card p-1 text-foreground shadow-sm transition active:scale-95 hover:border-destructive/60",
        isDragging && "opacity-30",
      )}
      title={def.label}
    >
      <Icon size={18} strokeWidth={1.5} />
      <span className="text-[8px] font-medium uppercase tracking-wide text-muted-foreground truncate w-full text-center px-0.5">
        {def.label}
      </span>
    </button>
  );
}

/* -------------------- master frame slot (drop target) -------------------- */

function MasterSlot({
  index,
  iconId,
  size,
  overlay,
  scale = 1,
  onClear,
  color,
}: {
  index: number;
  iconId: string | null;
  size: number;
  overlay?: string;
  scale?: number;
  onClear: () => void;
  color?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `master:slot:${index}`,
    data: { slot: index },
    disabled: !!overlay,
  });
  const [isOn, setIsOn] = useState(false);
  useEffect(() => { if (!iconId) setIsOn(false); }, [iconId]);

  const Icon = iconId ? ICON_MAP[iconId]?.icon : null;
  const isMasterSwitch = iconId === "power";

  // Master frame always glows BLUE
  const glowClass = (iconId || overlay)
    ? (isOn ? "backlit-blue-active" : "backlit-blue")
    : undefined;

  // Icon filter: bright neon blue drop-shadow for all switches
  const iconFilter = (iconId || overlay)
    ? (isOn
      ? "drop-shadow(0 0 6px #3b8eff) drop-shadow(0 0 2px #fff)"
      : "drop-shadow(0 0 3px #1d68e8)")
    : undefined;

  const iconColor = (iconId || overlay)
    ? (isOn ? "#ffffff" : "#7ab8ff")
    : undefined;

  return (
    <div className="relative group w-full h-full">
      <button
        ref={setNodeRef}
        type="button"
        onClick={(e) => {
          if (iconId || overlay) { e.stopPropagation(); setIsOn(!isOn); }
        }}
        style={{ width: size, height: size, borderRadius: 6 * scale }}
        className={cn(
          "flex items-center justify-center border transition-all duration-300 shrink-0",
          !iconId && !overlay && (isOver
            ? "border-2 border-destructive bg-destructive/5"
            : "border-dashed border-border/70"),
          glowClass,
        )}
      >
        <div className="pointer-events-none flex items-center justify-center w-full h-full" style={{ color: iconColor }}>
          {Icon ? (
            iconId === "power" ? (
              overlay === "power-droplet" ? (
                <SlotOverlay overlay="power-droplet" size={size} isOn={isOn} blue={true} />
              ) : (
                <PowerSlotIcon scale={scale} size={size} isOn={isOn} blue={true} />
              )
            ) : (
              <Icon size={size * 0.45} strokeWidth={1.5} style={{ filter: iconFilter }} />
            )
          ) : overlay ? (
            <SlotOverlay overlay={overlay} size={size} isOn={isOn} blue={true} />
          ) : (
            <span className="text-[9px] uppercase text-muted-foreground/40">+</span>
          )}
        </div>
      </button>

      {/* Hover delete badge */}
      {!overlay && iconId && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClear(); }}
          className="absolute -top-1.5 -right-1.5 hidden group-hover:flex items-center justify-center w-4 h-4 rounded-full bg-destructive text-white shadow-md z-20 cursor-pointer"
          style={{ fontSize: "9px", fontWeight: "bold" }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

/* -------------------- catalog card (read-only) -------------------- */

function CatalogCard({ preset, onPick }: { preset: Preset; onPick: () => void }) {
  const cfg = { id: preset.id, type: preset.type, slots: preset.slots };
  return (
    <button
      onClick={onPick}
      className="group flex flex-col items-center justify-between gap-3 p-4 rounded-xl border border-border bg-background hover:bg-card/50 transition text-left relative lighting-hover-effect w-full h-full shadow-sm"
      title="Click to load this preset into the master frame"
    >
      <div className="flex items-center justify-center p-2 bg-secondary/10 rounded-lg border border-border shadow-inner min-h-[140px] w-full lighting-preview-box">
        {(() => {
          const panelDef = PANELS[preset.type];
          const scale = panelDef ? Math.min(150 / panelDef.frame.w, 100 / panelDef.frame.h) : 0.42;
          return <PanelFrame config={cfg} scale={scale} />;
        })()}
      </div>
      <div className="space-y-3 text-center w-full mt-1">
        <div>
          <p className="max-w-[180px] text-xs font-bold leading-tight text-foreground mx-auto line-clamp-2">
            {preset.label}
          </p>
          <p className="text-[10px] font-semibold text-muted-foreground mt-0.5">{preset.qty} pcs in package</p>
        </div>
        <div className="bg-[#034B25] text-white text-[10px] font-bold py-1.5 px-3 rounded-md w-full transition group-hover:bg-[#056332] active:scale-98 text-center">
          Configure Switch
        </div>
      </div>
    </button>
  );
}

/* -------------------- main page -------------------- */

function KioskPage() {
  return (
    <CartProvider>
      <Kiosk />
      <Toaster richColors position="bottom-right" />
    </CartProvider>
  );
}

const SERIES_COLORS: Record<string, string[]> = {
  classic: ["white", "black"],
  elite: ["white", "black"],
  pro: ["black"],
  "pro-plus": ["white", "black", "grey", "rose-gold"],
};

const SERIES_LABELS: Record<string, string> = {
  classic: "Classic Series",
  elite: "Architectural Series - Elite",
  pro: "Architectural Series - Pro",
  "pro-plus": "Architectural Series - Pro+",
};

const LOCATION_TAGS = [
  "Main Entrance",
  "Main Gate",
  "Foyer",
  "Lobby",
  "Drawing Room",
  "Living Room",
  "Family Room",
  "Dining Room",
  "Pooja Room",
  "Kitchen",
  "Kitchen Counter",
  "Dry Kitchen",
  "Wet Kitchen",
  "Pantry",
  "Utility",
  "Store Room",
  "Master Bed",
  "Master Bed Entrance",
  "Master Bed Left",
  "Master Bed Right",
  "Master Bath",
  "Walk-in Closet",
  "Dressing Room",
  "Dressing Entrance",
  "Dressing Left",
  "Dressing Right",
  "Dressing Middle",
  "Common Toilet",
  "Bed 1",
  "Bed 1 Entrance",
  "Bed 1 Left",
  "Bed 1 Right",
  "Bath 1",
  "Bed 2",
  "Bed 2 Entrance",
  "Bed 2 Left",
  "Bed 2 Right",
  "Bath 2",
  "Bed 3",
  "Bed 3 Entrance",
  "Bed 3 Left",
  "Bed 3 Right",
  "Bath 3",
  "Bed 4",
  "Bed 4 Entrance",
  "Bed 4 Left",
  "Bed 4 Right",
  "Bath 4",
  "Bed 5",
  "Bed 5 Entrance",
  "Bed 5 Left",
  "Bed 5 Right",
  "Bath 5",
  "Bed 6",
  "Bed 6 Entrance",
  "Bed 6 Left",
  "Bed 6 Right",
  "Bath 6",
  "Bed 7",
  "Bed 7 Entrance",
  "Bed 7 Left",
  "Bed 7 Right",
  "Bath 7",
  "Servant Room",
  "Servant Toilet",
  "Driver Room",
  "Guard Room",
  "Home Theater",
  "Gym",
  "Bar Area",
  "Lounge",
  "Study Room",
  "Play Area",
  "Office",
  "Conference Room",
  "Server Room",
  "Stairs",
  "Lift",
  "Verandah",
  "Balcony",
  "Terrace",
  "Terrace Garden",
  "Parking",
  "Basement Parking",
  "Car Porch",
  "Driveway",
  "Garden",
  "Backyard",
  "Swimming Pool",
  "Pool Deck",
  "Security Cabin",
];

function Kiosk() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeries, setSelectedSeries] = useState<string>("classic");
  const isArchitectSeries = selectedSeries === "elite" || selectedSeries === "pro" || selectedSeries === "pro-plus";
  const [masterType, setMasterType] = useState<PanelType>("2m-1");
  const [master, setMaster] = useState<PanelConfig>(() => {
    const cfg = emptyConfig("2m-1", "classic");
    cfg.color = "black";
    return cfg;
  });
  const [qty, setQty] = useState(1);
  const [dragIcon, setDragIcon] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"frames" | "presets">("frames");
  const { add, update, remove, items } = useCart();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [editingCartId, setEditingCartId] = useState<string | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }),
  );

  function changeSeries(seriesId: string) {
    setSelectedSeries(seriesId);
    
    // Automatically select the first frame of the series when switching
    const isArch = seriesId === "elite" || seriesId === "pro" || seriesId === "pro-plus";
    const defaultType = isArch ? "arch-2m-2switch" : "2m-1";
    setMasterType(defaultType);
    
    if (seriesId !== "classic") {
      setActiveTab("frames");
    }
    
    const cfg = emptyConfig(defaultType, seriesId);
    const allowed = SERIES_COLORS[seriesId] || ["black"];
    cfg.color = allowed.includes(master.color || "black") ? master.color : allowed[0];
    setMaster(cfg);
    
    setEditingCartId(null);
    toast.success(`Switched to ${SERIES_LABELS[seriesId]}`);
  }

  function changeType(t: PanelType) {
    setMasterType(t);
    const cfg = emptyConfig(t, selectedSeries);
    const allowed = SERIES_COLORS[selectedSeries] || ["black"];
    cfg.color = allowed.includes(master.color || "black") ? master.color : allowed[0];
    setMaster(cfg);
    setEditingCartId(null);
    toast.info("Frame loaded — drag icons to configure");
    setTimeout(() => {
      sidebarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function loadFromCart(it: { id: string; config: typeof master; qty: number }) {
    setMasterType(it.config.type);
    setMaster({ ...it.config });
    setSelectedSeries(it.config.series || "classic");
    setQty(it.qty);
    setEditingCartId(it.id);
    toast.info("Loaded from cart — edit and save");
    setTimeout(() => {
      sidebarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function loadPreset(p: Preset) {
    setMasterType(p.type);
    const cfg = presetToConfig(p);
    cfg.series = selectedSeries;
    const allowed = SERIES_COLORS[selectedSeries] || ["black"];
    cfg.color = allowed.includes(cfg.color || "black") ? cfg.color : allowed[0];
    setMaster(cfg);
    setQty(p.qty);
    toast.success("Preset loaded — tap a slot to clear it");
    setTimeout(() => {
      sidebarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function onDragStart(e: DragStartEvent) {
    setDragIcon((e.active.data.current as any)?.iconId ?? null);
  }

  function onDragEnd(e: DragEndEvent) {
    setDragIcon(null);
    const iconId = (e.active.data.current as any)?.iconId as string | undefined;
    if (!iconId) return;

    let slotIdx: number | undefined = undefined;
    const overData = e.over?.data.current as { slot?: number } | undefined;
    if (overData?.slot !== undefined) {
      slotIdx = overData.slot;
    } else {
      const overId = e.over?.id?.toString();
      if (overId?.startsWith("master:slot:")) {
        slotIdx = parseInt(overId.split(":")[2], 10);
      }
    }

    if (slotIdx === undefined) return;

    setMaster((c) => {
      const slots = [...c.slots];
      slots[slotIdx!] = iconId;
      return { ...c, slots };
    });
  }

  function clearSlot(i: number) {
    setMaster((c) => {
      const slots = [...c.slots];
      slots[i] = null;
      return { ...c, slots };
    });
  }

  function changeColor(colorId: string) {
    setMaster((c) => ({ ...c, color: colorId }));
  }

  function cancel() {
    setMaster(emptyConfig(masterType, selectedSeries));
    setQty(1);
    setEditingCartId(null);
  }

  function addToCart() {
    const currentEditId = editingCartId; // capture before any state changes
    const hasIcons = master.slots.filter((s) => s != null && s !== "").length > 0;

    if (!hasIcons) {
      toast.error("Drag at least one button into the master frame");
      return;
    }

    if (currentEditId && typeof update === "function") {
      update(currentEditId, { ...master }, qty);
      toast.success("Cart item updated");
    } else if (currentEditId) {
      // Fallback: remove old and add updated
      remove(currentEditId);
      add({ ...master, id: generateUUID() }, qty);
      toast.success("Cart item updated");
    } else {
      add({ ...master, id: generateUUID() }, qty);
      toast.success(`Added · ${qty} pcs`);
    }

    // Reset editor state
    setMaster(emptyConfig(masterType, selectedSeries));
    setQty(1);
    setEditingCartId(null);
  }

  const dragDef = dragIcon ? ICON_MAP[dragIcon] : null;
  const DragIconComp = dragDef?.icon;

  const categories = isArchitectSeries
    ? (["2M", "4M"] as const)
    : (["2M", "4M", "6M", "8M", "6&8M", "12M"] as const);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background/95 dark:bg-zinc-950/90 relative">

        {/* Ambient Background Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <div className="ambient-glow-1" />
          <div className="ambient-glow-2" />
          <div className="ambient-glow-3" />
        </div>

        <div className="relative z-10">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6 py-3 shadow-sm">
            {/* Left: Logo */}
            <div className="flex items-center">
              <img src={Y5homeLogo} alt="Y5home Logo" className="w-auto" />
            </div>
            {/* Right placeholder */}
            <div className="flex items-center gap-4">
              <div className="h-9 w-20 rounded-md bg-muted/40 animate-pulse" />
            </div>
          </header>

          <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_380px]">
            {/* Catalog Skeleton */}
            <main className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <div className="h-7 w-64 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-48 bg-muted/60 rounded mt-2 animate-pulse" />
                </div>
                <div className="flex bg-secondary p-1 rounded-lg self-start sm:self-center gap-1">
                  <div className="h-8 w-24 bg-muted rounded-md animate-pulse" />
                  <div className="h-8 w-24 bg-muted rounded-md animate-pulse" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 p-3 border border-border/40 rounded-xl bg-card/50 shadow-sm animate-pulse">
                    <div className="h-28 w-28 rounded-lg bg-muted/60 flex items-center justify-center">
                      <div className="h-16 w-20 rounded border border-dashed border-muted/40 bg-muted/20" />
                    </div>
                    <div className="h-3.5 w-20 bg-muted/80 rounded" />
                    <div className="h-4 w-12 bg-muted/50 rounded" />
                  </div>
                ))}
              </div>
            </main>

            {/* Sidebar Configurator Skeleton */}
            <aside className="lg:sticky lg:top-20 lg:self-start space-y-4">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-6 animate-pulse">
                <div className="flex justify-between items-center border-b pb-4">
                  <div className="h-5 w-28 bg-muted rounded" />
                  <div className="h-5 w-16 bg-muted rounded" />
                </div>
                <div className="h-10 w-full bg-muted/70 rounded-md" />
                <div className="flex justify-center rounded-lg border-2 border-dashed border-muted/40 bg-secondary/30 p-8 h-48 items-center">
                  <div className="h-24 w-36 bg-muted/60 rounded border border-muted/30" />
                </div>
                <div className="h-3 w-40 bg-muted/40 mx-auto rounded" />
                <div className="rounded-lg border border-border bg-secondary/40 p-3">
                  <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 14 }).map((_, idx) => (
                      <div key={idx} className="aspect-square bg-muted/60 rounded-lg" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center rounded-lg border border-border bg-secondary/40 p-3">
                  <div className="h-3.5 w-16 bg-muted rounded" />
                  <div className="flex gap-1.5">
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div key={idx} className="h-5 w-5 rounded-full bg-muted/70" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 flex-1 bg-muted rounded-lg" />
                  <div className="h-10 w-24 bg-muted rounded-lg" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="min-h-screen bg-background/95 dark:bg-zinc-950/90 relative">

        {/* Ambient Background Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <div className="ambient-glow-1" />
          <div className="ambient-glow-2" />
          <div className="ambient-glow-3" />
        </div>

        <div className="relative z-10">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6 py-3 shadow-sm">
            {/* Left: Logo */}
            <div className="flex items-center">
              <img src={Y5homeLogo} alt="Y5home Logo" className="w-auto" />
            </div>

            {/* Right: Cart */}
            <div className="flex items-center">
              <CartPanel />
            </div>
          </header>

          <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_380px]">
            {/* ===================== Catalog (left/main) ===================== */}
            <main className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <div className="mb-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b pb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1">
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                      {selectedSeries === "classic" && "Classic Series Touch Switches"}
                      {selectedSeries === "elite" && "Architectural Series - Elite"}
                      {selectedSeries === "pro" && "Architectural Series - Pro"}
                      {selectedSeries === "pro-plus" && "Architectural Series - Pro+"}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xl">
                      {selectedSeries === "classic" && "Simple design that fits perfectly into every home. Configure physical switch layouts below."}
                      {selectedSeries === "elite" && "Elite series features flat, sharp rectangular bezels and micro-matte touch plates. Colors: White, Black."}
                      {selectedSeries === "pro" && "Pro series features ultra-matte jet black architectural finishes and low-profile bezels. Colors: Black."}
                      {selectedSeries === "pro-plus" && "Pro+ series features luxurious rounded glass finishes and metallic edge borders. Colors: White, Black, Grey, Rose Gold."}
                    </p>
                  </div>

                  {/* Dropdown Selector */}
                  <div className="flex flex-col gap-1.5 self-center md:self-auto shrink-0 w-full sm:w-[280px]">
                    {/* <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-center md:text-left">
                      Select Switch Series
                    </span> */}
                    <select
                      value={selectedSeries}
                      onChange={(e) => changeSeries(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-[#034B25] cursor-pointer transition"
                    >
                      <option value="classic">Classic Series</option>
                      <option value="elite">Architectural Series - Elite</option>
                      <option value="pro">Architectural Series - Pro</option>
                      <option value="pro-plus">Architectural Series - Pro+</option>
                    </select>
                  </div>
                </div>

                {/* Tab Selector - only show for classic series where presets exist */}
                {selectedSeries === "classic" && (
                  <div className="flex bg-secondary p-1 rounded-lg self-center shrink-0">
                    <button
                      onClick={() => setActiveTab("frames")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition",
                        activeTab === "frames"
                          ? "bg-[#034B25] text-white shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Layers size={14} /> Unique Frames
                    </button>
                    <button
                      onClick={() => setActiveTab("presets")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition",
                        activeTab === "presets"
                          ? "bg-[#034B25] text-white shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <ClipboardList size={14} /> Pre-configured Presets
                    </button>
                  </div>
                )}
              </div>

              {(selectedSeries === "classic" && activeTab === "presets") ? (
                // Original Presets
                <div className="space-y-10">
                  {PRESETS.map((section) => (
                    <section key={section.section} className="space-y-4">
                      <div className="flex items-baseline gap-6 border-b border-border/60 pb-1">
                        <h3 className="text-2xl font-black">{section.section}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 xl:grid-cols-4">
                        {section.items.map((p) => (
                          <CatalogCard key={p.id} preset={p} onPick={() => loadPreset(p)} />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                // Unique Frames Catalog
                <div className="space-y-10">
                  {categories.map((cat) => {
                    const categoryPanels = Object.values(PANELS).filter(
                      (p) => p.category === cat && (isArchitectSeries ? p.id.startsWith("arch-") : !p.id.startsWith("arch-") && !p.id.includes("q")),
                    );

                    const ledPanels = categoryPanels.filter((p) => p.id.includes("led"));
                    const standardPanels = categoryPanels.filter((p) => !p.id.includes("led"));

                    const renderPanelCard = (p: typeof categoryPanels[0]) => {
                      const allowedColors = SERIES_COLORS[selectedSeries] || ["black"];
                      const catalogColor = allowedColors.includes(master.color || "black") ? master.color : allowedColors[0];
                      const config = {
                        ...emptyConfig(p.id, selectedSeries),
                        color: catalogColor,
                      };
                      const isSelected = masterType === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => changeType(p.id)}
                          className={cn(
                            "group flex flex-col items-center gap-3 p-4 rounded-xl border transition text-left relative lighting-hover-effect",
                            isSelected
                              ? "border-amber-500 bg-amber-500/5 ring-1 ring-amber-500/30"
                              : "border-border bg-card/50 hover:bg-secondary/40 hover:border-border-strong",
                          )}
                        >
                          {/* Selected indicator badge */}
                          {isSelected && (
                            <span className="absolute top-2 right-2 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                          )}

                          <div className="flex items-center justify-center p-2 bg-background rounded-lg border border-border shadow-inner min-h-[160px] w-full lighting-preview-box">
                            {(() => {
                              const panelDef = PANELS[p.id];
                              const scale = panelDef ? Math.min(180 / panelDef.frame.w, 120 / panelDef.frame.h) : 0.35;
                              return <PanelFrame config={config} series={selectedSeries} scale={scale} />;
                            })()}
                          </div>

                          <div className="w-full text-center sm:text-left">
                            <h4 className="text-xs font-bold text-foreground line-clamp-1">
                              {p.label}
                            </h4>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {p.items.filter((i) => i.type === "slot").length} configurable slots
                            </p>
                          </div>
                        </button>
                      );
                    };

                    return (
                      <section key={cat} className="space-y-4">
                        <div className="flex items-baseline gap-4 border-b border-border/60 pb-1">
                          <h3 className="text-3xl font-black tracking-tight text-foreground/90">
                            {cat}
                          </h3>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                            {categoryPanels.length} unique frames
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
                          {standardPanels.map(renderPanelCard)}
                        </div>

                        {ledPanels.length > 0 && (
                          <div className="space-y-4 pt-6">
                            <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                              LED Display Frames
                            </h4>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
                              {ledPanels.map(renderPanelCard)}
                            </div>
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>
              )}
            </main>

            {/* ===================== Master frame (right sidebar) ===================== */}
            <aside ref={sidebarRef} className="lg:sticky lg:top-20 lg:self-start animate-fade-in">
              <div className="rounded-xl border border-border/80 bg-background/50 backdrop-blur-md p-4 shadow-md relative overflow-hidden">
                {true ? (
                  <>
                    <div className="mb-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-destructive">
                          Master frame
                        </h2>
                        <span className={cn(
                          "text-[10px] font-bold uppercase",
                          editingCartId ? "text-amber-500" : "text-muted-foreground"
                        )}>
                          {editingCartId ? "Editing" : "Configuring"}
                        </span>
                      </div>

                      {/* Dropdown Frame Selector */}
                      <select
                        value={masterType}
                        onChange={(e) => changeType(e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-destructive cursor-pointer hover:border-destructive/50 transition"
                      >
                        {categories.map((cat) => (
                          <optgroup key={cat} label={`${cat} Frames`}>
                            {Object.values(PANELS)
                              .filter((p) => p.category === cat && (isArchitectSeries ? p.id.startsWith("arch-") : !p.id.startsWith("arch-") && !p.id.includes("q")))
                              .map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.label}
                                </option>
                              ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    {/* drop area */}
                    <div className="flex justify-center rounded-lg border-2 border-dashed border-destructive/40 bg-secondary/30 p-4">
                      {(() => {
                        const masterDef = PANELS[masterType];
                        const maxRenderWidth = 270;
                        const dynamicScale = masterDef ? Math.min(0.7, maxRenderWidth / masterDef.frame.w) : 0.58;
                        return (
                          <PanelFrame
                            config={master}
                            scale={dynamicScale}
                            renderSlot={(i, iconId, size, overlay, scale) => (
                              <MasterSlot
                                index={i}
                                iconId={iconId}
                                size={size}
                                overlay={overlay}
                                scale={scale}
                                onClear={() => clearSlot(i)}
                              />
                            )}
                          />
                        );
                      })()}
                    </div>
                    <p className="mt-2 text-center text-[10px] text-muted-foreground">
                      Drag any symbol here · tap a button to remove
                    </p>

                    {/* Location Tag Control */}
                    <div ref={dropdownRef} className="mt-4 rounded-lg border border-border bg-secondary/40 p-2.5 space-y-2 relative">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                        Location / Room Tag
                      </span>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Search or enter room tag..."
                          value={master.location || ""}
                          onFocus={() => setIsDropdownOpen(true)}
                          onChange={(e) => {
                            setMaster({ ...master, location: e.target.value });
                            setIsDropdownOpen(true);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setIsDropdownOpen(false);
                              e.currentTarget.blur();
                            }
                          }}
                          className="h-8 pr-8 text-xs bg-background border-border/60 focus-visible:ring-1 focus-visible:ring-[#034B25]"
                        />
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen((prev) => !prev)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <svg
                            className={cn(
                              "h-3 w-3 transition-transform text-muted-foreground/85 hover:text-foreground",
                              isDropdownOpen ? "rotate-180" : ""
                            )}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-md border border-border bg-popover py-1 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
                            {(() => {
                              const query = (master.location || "").toLowerCase().trim();
                              const filtered = LOCATION_TAGS.filter((loc) =>
                                loc.toLowerCase().includes(query)
                              );

                              if (filtered.length === 0) {
                                return (
                                  <div className="px-2.5 py-1.5 text-xs text-muted-foreground">
                                    No matching tags. Press Enter to use.
                                  </div>
                                );
                              }

                              return filtered.map((loc) => (
                                <button
                                  key={loc}
                                  type="button"
                                  onClick={() => {
                                    setMaster({ ...master, location: loc });
                                    setIsDropdownOpen(false);
                                  }}
                                  className="w-full px-2.5 py-1.5 text-left text-xs text-foreground hover:bg-accent hover:text-accent-foreground transition"
                                >
                                  {loc}
                                </button>
                              ));
                            })()}
                          </div>
                        )}
                      </div>

                      {/* Quick select chips for common rooms */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {["Living Room", "Kitchen", "Master Bed", "Entrance"].map((loc) => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => {
                              setMaster({ ...master, location: loc });
                              setIsDropdownOpen(false);
                            }}
                            className={cn(
                              "px-2 py-0.5 text-[10px] rounded-md border font-medium transition",
                              master.location === loc
                                ? "bg-[#034B25] text-white border-[#034B25]"
                                : "bg-background text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                            )}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* icon palette */}
                    <div className="mt-4 rounded-lg border border-border bg-secondary/40 p-2">
                      <div className="grid grid-cols-5 sm:grid-cols-7 gap-1">
                        {ICONS.map((i) => (
                          <PaletteIcon key={i.id} id={i.id} />
                        ))}
                      </div>
                    </div>

                    {/* color selector */}
                    <div className="mt-4 rounded-lg border border-border bg-secondary/40 p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Frame Color
                        </span>
                        <div className="flex gap-1.5">
                          {COLOR_THEMES.filter((theme) =>
                            (SERIES_COLORS[selectedSeries] || ["black"]).includes(theme.id)
                          ).map((theme) => {
                            const isSelected = (master.color || "white") === theme.id;
                            return (
                              <button
                                key={theme.id}
                                onClick={() => changeColor(theme.id)}
                                title={theme.name}
                                className={cn(
                                  "w-5 h-5 rounded-full border transition-all relative flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95",
                                  isSelected
                                    ? "border-destructive ring-2 ring-destructive/30"
                                    : "border-border hover:border-muted-foreground",
                                )}
                                style={{ backgroundColor: theme.previewBg }}
                              >
                                {isSelected && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* qty + actions */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1 rounded-md border border-border bg-background px-1 h-9">
                        <button
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          className="px-2 text-muted-foreground hover:text-foreground"
                        >
                          <Minus size={14} />
                        </button>
                        <Input
                          value={qty}
                          onChange={(e) =>
                            setQty(Math.max(1, parseInt(e.target.value) || 1))
                          }
                          className="h-8 w-10 border-0 bg-transparent p-0 text-center text-sm focus-visible:ring-0"
                          inputMode="numeric"
                        />
                        <button
                          onClick={() => setQty((q) => q + 1)}
                          className="px-2 text-muted-foreground hover:text-foreground"
                        >
                          <Plus size={14} />
                        </button>
                        <span className="pr-2 text-[10px] text-muted-foreground">pcs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={cancel} className="h-9 gap-1">
                          <RotateCcw size={12} /> Cancel
                        </Button>
                        <Button size="sm" onClick={addToCart} className="h-9 gap-1 whitespace-nowrap">
                          {editingCartId ? (
                            <><Pencil size={14} /> Save</>
                          ) : (
                            <><ShoppingCart size={14} /> Add to cart</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              {/* mini cart preview */}
              <div className="mt-4 rounded-xl border border-border bg-background p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    In cart
                  </h3>
                  <span className="text-xs font-semibold">
                    {items.reduce((n, i) => n + i.qty, 0)} pcs
                  </span>
                </div>
                {items.length === 0 ? (
                  <p className="text-[11px] text-muted-foreground">
                    Build a master frame and add it to cart.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {items.slice(-6).map((it) => (
                      <div
                        key={it.id}
                        className="group relative flex flex-col items-center gap-0.5 rounded-lg border border-border bg-card p-2.5 transition hover:border-destructive/40 hover:shadow-sm"
                      >
                        {/* Frame thumbnail */}
                        <PanelFrame config={it.config} scale={0.18} />
                        <span className="text-[9px] font-semibold text-destructive">{it.qty}p</span>

                        {/* Action buttons — visible on hover */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg bg-background/90 opacity-0 group-hover:opacity-100 transition backdrop-blur-sm">
                          <button
                            type="button"
                            onClick={() => loadFromCart(it)}
                            className="flex items-center gap-1 rounded-md bg-destructive px-2 py-1 text-[9px] font-bold text-white shadow hover:bg-destructive/90 transition"
                          >
                            <Pencil size={9} /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              remove(it.id);
                              toast.success("Removed from cart");
                            }}
                            className="flex items-center gap-1 rounded-md border border-destructive/40 px-2 py-1 text-[9px] font-bold text-destructive hover:bg-destructive/10 transition"
                          >
                            <Trash2 size={9} /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {DragIconComp ? (
          <div className="flex aspect-square w-14 items-center justify-center rounded-xl border-2 border-amber-500/80 bg-card/95 backdrop-blur-sm shadow-xl">
            <DragIconComp size={26} strokeWidth={1.5} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
