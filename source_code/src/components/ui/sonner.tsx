import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg font-sans border",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-bold",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "!bg-[#023A1D] !text-white !border-emerald-700/80 [&>svg]:!text-amber-500",
          error: "!bg-red-950 !text-red-100 !border-red-900/80 [&>svg]:!text-red-400",
          warning: "!bg-[#7A5C18] !text-white !border-amber-600/80 [&>svg]:!text-amber-300",
          info: "!bg-[#023A1D] !text-white !border-emerald-700/80 [&>svg]:!text-amber-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
