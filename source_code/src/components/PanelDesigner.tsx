import { useEffect, useState } from "react";
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
import { PANELS, ICONS, ICON_MAP, type PanelType, type PanelConfig, emptyConfig, generateUUID } from "@/lib/panel-types";
import { PanelFrame, SlotOverlay, PowerSlotIcon } from "./PanelFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Minus, RotateCcw, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

function DraggableIcon({ id }: { id: string }) {
  const def = ICON_MAP[id];
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette:${id}`,
    data: { iconId: id, source: "palette" },
  });
  const Icon = def.icon;
  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "flex aspect-square w-full touch-none flex-col items-center justify-center gap-1 rounded-xl border border-border bg-card p-2 text-foreground shadow-sm transition active:scale-95",
        isDragging && "opacity-30",
      )}
    >
      <Icon size={30} strokeWidth={1.5} />
      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {def.label}
      </span>
    </button>
  );
}

function DroppableSlot({
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
    id: `slot:${index}`,
    disabled: !!overlay,
  });
  const [isOn, setIsOn] = useState(false);
  useEffect(() => { if (!iconId) setIsOn(false); }, [iconId]);

  const Icon = iconId ? ICON_MAP[iconId]?.icon : null;
  const isMasterSwitch = iconId === "power";

  // Designer slots = master frame config = BLUE glow
  const glowClass = (iconId || overlay)
    ? (isOn ? "backlit-blue-active" : "backlit-blue")
    : undefined;

  const iconClass = (iconId || overlay)
    ? (isOn ? "slot-icon-active" : "slot-icon-standby")
    : undefined;

  return (
    <div className="relative group w-full h-full">
      <button
        ref={setNodeRef}
        type="button"
        onClick={(e) => {
          if (iconId || overlay) { e.stopPropagation(); setIsOn(!isOn); }
        }}
        style={{ 
          width: size, 
          height: size, 
          borderRadius: 6 * scale,
          borderColor: (!iconId && !overlay && !isOver) ? 'var(--slot-border)' : undefined
        }}
        className={cn(
          "flex items-center justify-center border transition-all duration-300 shrink-0",
          !iconId && !overlay && (isOver
            ? "border-destructive border-2 bg-destructive/5"
            : "border-dashed"),
          glowClass,
        )}
      >
        <div className="pointer-events-none flex items-center justify-center w-full h-full">
          {Icon ? (
            iconId === "power" ? (
              <PowerSlotIcon scale={scale} size={size} isOn={isOn} blue={true} />
            ) : (
              <Icon size={size * 0.45} strokeWidth={1.5} className={iconClass} />
            )
          ) : overlay ? (
            <SlotOverlay overlay={overlay} size={size} isOn={isOn} blue={true} />
          ) : (
            <span className="text-[9px] uppercase text-muted-foreground/50">
              slot {index + 1}
            </span>
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
  onSaved?: () => void;
}

export function PanelDesigner({ onSaved }: Props) {
  const [type, setType] = useState<PanelType>("2m-1");
  const [config, setConfig] = useState<PanelConfig>(() => emptyConfig("2m-1"));
  const [qty, setQty] = useState(1);
  const [dragIcon, setDragIcon] = useState<string | null>(null);
  const { add } = useCart();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }),
  );

  function changeType(t: PanelType) {
    setType(t);
    setConfig(emptyConfig(t));
  }

  function onDragStart(e: DragStartEvent) {
    setDragIcon((e.active.data.current as any)?.iconId ?? null);
  }

  function onDragEnd(e: DragEndEvent) {
    setDragIcon(null);
    const iconId = (e.active.data.current as any)?.iconId as string | undefined;
    if (!iconId) return;

    let slotIdx: number | undefined = undefined;
    const overId = e.over?.id?.toString();
    if (overId?.startsWith("slot:")) {
      slotIdx = parseInt(overId.split(":")[1], 10);
    } else {
      const overData = e.over?.data.current as { slot?: number } | undefined;
      if (overData?.slot !== undefined) {
        slotIdx = overData.slot;
      }
    }

    if (slotIdx === undefined) return;

    setConfig((c) => {
      const next = { ...c, slots: [...c.slots] };
      next.slots[slotIdx!] = iconId;
      return next;
    });
  }

  function clearSlot(i: number) {
    setConfig((c) => {
      const next = { ...c, slots: [...c.slots] };
      next.slots[i] = null;
      return next;
    });
  }

  function reset() {
    setConfig(emptyConfig(type));
    setQty(1);
  }

  function save() {
    if (!config.slots.some(Boolean)) {
      toast.error("Add at least one button before saving");
      return;
    }
    add({ ...config, id: generateUUID() }, qty);
    toast.success("Added to cart", { description: `${qty}× ${PANELS[type].label}` });
    reset();
    onSaved?.();
  }

  const dragDef = dragIcon ? ICON_MAP[dragIcon] : null;
  const DragIconComp = dragDef?.icon;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr_280px]">
        {/* Icon palette */}
        <div className="rounded-2xl border border-border bg-secondary/30 p-4">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Drag a button
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {ICONS.map((i) => (
              <DraggableIcon key={i.id} id={i.id} />
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-background p-6">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PANELS) as PanelType[]).map((t) => (
              <Button
                key={t}
                size="sm"
                variant={type === t ? "default" : "outline"}
                onClick={() => changeType(t)}
              >
                {PANELS[t].label}
              </Button>
            ))}
          </div>
          <PanelFrame
            config={config}
            highlight
            renderSlot={(i, iconId, size, overlay, scale) => (
              <DroppableSlot
                index={i}
                iconId={iconId}
                size={size}
                overlay={overlay}
                scale={scale}
                onClear={() => clearSlot(i)}
              />
            )}
          />
          <p className="text-xs text-muted-foreground">
            Tap a placed button to remove it.
          </p>
        </div>

        {/* Action panel */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-secondary/30 p-4">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Quantity
            </Label>
            <div className="mt-2 flex items-center gap-2">
              <Button size="icon" variant="outline" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus size={16} />
              </Button>
              <Input
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="text-center"
                inputMode="numeric"
              />
              <Button size="icon" variant="outline" onClick={() => setQty((q) => q + 1)}>
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <Button size="lg" onClick={save} className="gap-2">
            <ShoppingCart size={18} /> Save & Add to Cart
          </Button>
          <Button variant="outline" onClick={reset} className="gap-2">
            <RotateCcw size={16} /> Reset Panel
          </Button>

          <div className="mt-2 rounded-xl border border-border bg-background p-3 text-xs">
            <div className="font-semibold uppercase tracking-wider text-muted-foreground">
              Current build
            </div>
            <ul className="mt-2 space-y-1">
              {config.slots.map((s, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span className="text-muted-foreground">Slot {i + 1}</span>
                  <span className="font-medium">
                    {s ? ICON_MAP[s]?.label : "—"}
                    {s && (
                      <button
                        onClick={() => clearSlot(i)}
                        className="ml-2 text-destructive"
                        aria-label="clear"
                      >
                        <Trash2 size={12} className="inline" />
                      </button>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <DragOverlay>
        {DragIconComp ? (
          <div className="flex aspect-square w-20 items-center justify-center rounded-xl border-2 border-destructive bg-card shadow-lg">
            <DragIconComp size={36} strokeWidth={1.5} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
