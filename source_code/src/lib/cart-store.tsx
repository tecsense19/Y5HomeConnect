import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { describeConfig, generateUUID, type CartItem, type PanelConfig } from "./panel-types";

interface CartCtx {
  items: CartItem[];
  add: (cfg: PanelConfig, qty: number) => void;
  update: (id: string, cfg: PanelConfig, qty: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "kiosk-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const value: CartCtx = {
    items,
    add: (cfg, qty) =>
      setItems((prev) => [
        ...prev,
        { id: generateUUID(), config: cfg, qty, name: describeConfig(cfg) },
      ]),
    update: (id, cfg, qty) =>
      setItems((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, config: cfg, qty, name: describeConfig(cfg) } : i,
        ),
      ),
    remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
    setQty: (id, qty) =>
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i))),
    clear: () => setItems([]),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside provider");
  return v;
}
