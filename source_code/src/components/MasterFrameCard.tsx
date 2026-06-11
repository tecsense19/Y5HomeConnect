import { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PANELS, ICON_MAP, type PanelConfig, emptyConfig, generateUUID } from "@/lib/panel-types";
import { PanelFrame, SlotOverlay, PowerSlotIcon } from "./PanelFrame";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";
import { Trash2, ShoppingCart, RotateCcw, Copy, X } from "lucide-react";
import { toast } from "sonner";

function Slot({
  cardId,
  index,
  iconId,
  size,
  overlay,
  scale = 1,
  onClear,
  color,
}: {
  cardId: string;
  index: number;
  iconId: string | null;
  size: number;
  overlay?: string;
  scale?: number;
  onClear: () => void;
  color?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `${cardId}:slot:${index}`,
    data: { cardId, slot: index },
    disabled: !!overlay,
  });
  const [isOn, setIsOn] = useState(false);
  useEffect(() => { if (!iconId) setIsOn(false); }, [iconId]);

  const Icon = iconId ? ICON_MAP[iconId]?.icon : null;
  const isMasterSwitch = iconId === "power";

  // Cart cards = master frames = BLUE glow
  const glowClass = (iconId || overlay)
    ? (isOn ? "backlit-blue-active" : "backlit-blue")
    : undefined;

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
              <PowerSlotIcon scale={scale} size={size} isOn={isOn} blue={true} />
            ) : (
              <Icon size={size * 0.45} strokeWidth={1.5} style={{ filter: iconFilter }} />
            )
          ) : overlay ? (
            <SlotOverlay overlay={overlay} size={size} isOn={isOn} blue={true} />
          ) : (
            <span className="text-[8px] uppercase text-muted-foreground/40">+</span>
          )}
        </div>
      </button>
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

interface Props {
  cardId: string;
  config: PanelConfig;
  onChange: (cfg: PanelConfig) => void;
  onRemove?: () => void;
  canRemove?: boolean;
}

export function MasterFrameCard({ cardId, config, onChange, onRemove, canRemove }: Props) {
  const def = PANELS[config.type];
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  function clearSlot(i: number) {
    const next = { ...config, slots: [...config.slots] };
    next.slots[i] = null;
    onChange(next);
  }

  function reset() {
    onChange(emptyConfig(config.type));
    setQty(1);
  }

  function addToCart() {
    if (!config.slots.some(Boolean)) {
      toast.error("Place at least one button in this frame");
      return;
    }
    // snapshot the frame as-is
    add({ ...config, id: generateUUID() }, qty);
    toast.success(`Added · ${qty} pcs`);
  }

  return (
    <div className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md">
      {canRemove && (
        <button
          onClick={onRemove}
          className="absolute right-2 top-2 z-10 rounded-full p-1 text-muted-foreground opacity-0 transition hover:bg-destructive hover:text-destructive-foreground group-hover:opacity-100"
          aria-label="Remove frame"
        >
          <X size={14} />
        </button>
      )}

      <div className="text-xs font-bold uppercase tracking-wider text-destructive">
        {def.label}
      </div>

      <PanelFrame
        config={config}
        scale={0.7}
        renderSlot={(i, iconId, size, overlay, scale) => (
          <Slot
            cardId={cardId}
            index={i}
            iconId={iconId}
            size={size}
            overlay={overlay}
            scale={scale}
            onClear={() => clearSlot(i)}
          />
        )}
      />

      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        <div className="flex items-center gap-1 rounded-md border border-border bg-background px-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-2 text-lg text-muted-foreground hover:text-foreground"
          >
            −
          </button>
          <Input
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="h-8 w-10 border-0 bg-transparent p-0 text-center text-sm focus-visible:ring-0"
            inputMode="numeric"
          />
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-2 text-lg text-muted-foreground hover:text-foreground"
          >
            +
          </button>
          <span className="pr-2 text-xs text-muted-foreground">pcs</span>
        </div>
        <Button size="sm" onClick={addToCart} className="gap-1">
          <ShoppingCart size={14} /> Add
        </Button>
        <Button size="sm" variant="outline" onClick={reset} className="gap-1">
          <RotateCcw size={12} />
        </Button>
      </div>
    </div>
  );
}

export { Slot as MasterFrameSlot };
