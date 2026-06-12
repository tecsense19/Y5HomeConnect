import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { PANELS } from "@/lib/panel-types";
import { PanelFrame } from "./PanelFrame";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Pencil, ShoppingCart, Trash2, Printer, FileText, Layers } from "lucide-react";
import { Input } from "./ui/input";
import { exportCartPdf } from "@/lib/pdf-export";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CartPanelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onEdit?: (item: any) => void;
}

export function CartPanel({ isOpen, setIsOpen, onEdit }: CartPanelProps) {
  const { items, remove, setQty, clear } = useCart();
  const [printing, setPrinting] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const total = items.reduce((n, i) => n + i.qty, 0);

  async function handlePrint(mode: "sheet" | "single") {
    if (!items.length) return;
    setPrinting(true);
    try {
      await exportCartPdf(items, mode, {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
      });
      toast.success("PDF ready");
    } catch (e) {
      console.error(e);
      toast.error("PDF export failed");
    } finally {
      setPrinting(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg" className="relative gap-2 border-border bg-background text-foreground hover:bg-secondary/40 hover:text-foreground">
          <ShoppingCart size={18} className="text-[#034B25]" />
          Cart
          {total > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#034B25] px-1 text-xs font-bold text-white shadow-sm">
              {total}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Your order ({total} pcs)</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-3">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nothing saved yet. Design a panel and add it to cart.
            </p>
          )}
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <div className="shrink-0 flex items-center justify-center w-[100px] h-[70px]">
                {(() => {
                  const panelDef = PANELS[it.config.type];
                  const scale = panelDef ? Math.min(100 / panelDef.frame.w, 70 / panelDef.frame.h) : 0.28;
                  return <PanelFrame config={it.config} scale={scale} />;
                })()}
              </div>
              <div className="flex-1 text-sm">
                <div className="font-semibold">{PANELS[it.config.type].label}</div>
                <div className="text-[10px] font-bold text-[#A8832A] uppercase tracking-wider mt-0.5">
                  {it.config.series === "classic" && "Classic Series"}
                  {it.config.series === "elite" && "Architectural Series - Elite"}
                  {it.config.series === "pro" && "Architectural Series - Pro"}
                  {it.config.series === "pro-plus" && "Architectural Series - Pro+"}
                </div>
                <div className="text-xs text-destructive mt-0.5">{it.name}</div>
                {it.config.location && (
                  <div className="mt-1 flex items-center">
                    <span className="inline-flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground border border-border/60">
                      📍 {it.config.location}
                    </span>
                  </div>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    type="number"
                    value={it.qty}
                    onChange={(e) => setQty(it.id, Math.max(1, parseInt(e.target.value) || 1))}
                    className="h-8 w-16 text-center"
                  />
                  <span className="text-xs text-muted-foreground">pcs</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {onEdit && (
                  <Button size="icon" variant="ghost" onClick={() => onEdit(it)} className="h-8 w-8 text-primary hover:text-primary/80">
                    <Pencil size={16} />
                  </Button>
                )}
                <Button size="icon" variant="ghost" onClick={() => remove(it.id)} className="h-8 w-8 text-destructive hover:text-destructive/80">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-4">
             <div className="flex flex-col gap-2.5">
               <div className="flex flex-col gap-1">
                 <label htmlFor="customer-name-input" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                   Customer Name
                 </label>
                 <Input
                   id="customer-name-input"
                   placeholder="Enter customer name..."
                   value={customerName}
                   onChange={(e) => setCustomerName(e.target.value)}
                   className="h-10 text-sm border-border bg-background focus-visible:ring-1 focus-visible:ring-[#034B25]"
                 />
               </div>
               <div className="flex flex-col gap-1">
                 <label htmlFor="customer-phone-input" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                   Phone Number
                 </label>
                 <Input
                   id="customer-phone-input"
                   placeholder="Enter phone number..."
                   value={customerPhone}
                   onChange={(e) => setCustomerPhone(e.target.value)}
                   className="h-10 text-sm border-border bg-background focus-visible:ring-1 focus-visible:ring-[#034B25]"
                 />
               </div>
               <div className="flex flex-col gap-1">
                 <label htmlFor="customer-address-input" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                   Site / Project Address
                 </label>
                 <Input
                   id="customer-address-input"
                   placeholder="Enter full site/project address..."
                   value={customerAddress}
                   onChange={(e) => setCustomerAddress(e.target.value)}
                   className="h-10 text-sm border-border bg-background focus-visible:ring-1 focus-visible:ring-[#034B25]"
                 />
               </div>
             </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" disabled={printing} className="gap-2 bg-[#034B25] hover:bg-[#056332] text-white">
                  <Printer size={18} />
                  {printing ? "Generating…" : "Print PDF"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem onClick={() => handlePrint("sheet")} className="gap-2">
                  <Layers size={16} /> Reference sheet (grid)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePrint("single")} className="gap-2">
                  <FileText size={16} /> One panel per page
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" onClick={clear} className="text-destructive hover:bg-destructive/10">
              Clear cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
