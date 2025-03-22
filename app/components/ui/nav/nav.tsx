import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/utils"

const navVariant = cva(`inline-flex items-center justify-between  `, {
  variants: {
    variant: {
      circle: " text-xs ",
      default: "bg-black ",
    },
    size: {
      default: "w-screen py-4 px-6",
      sm: "px-2",
      lg: "px-2",
      icon: "w-8 p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface CardTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navVariant> {
  asChild?: boolean;
}

const Navigation = forwardRef<HTMLDivElement, CardTileProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(navVariant({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Navigation.displayName = "Navigation";

export { Navigation, navVariant };