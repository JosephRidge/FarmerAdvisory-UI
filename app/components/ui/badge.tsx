import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariant = cva(`inline-flex items-center justify-center `, {
  variants: {
    variant: {
      circle: "inline-flex items-center rounded-full bg-gray px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-green-500/10 ring-inset",
      default: "inline-flex items-center bg-green-300 rounded-md text-black px-2 py-1 text-xs font-medium",
      callToAction: "inline-flex items-center bg-gray-300 rounded-md text-black px-2 py-1 text-xs font-medium",
    },
    size: {
      default: "w-fit px-4 py-2",
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
    VariantProps<typeof badgeVariant> {
  asChild?: boolean;
}

const Badge = forwardRef<HTMLDivElement, CardTileProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariant({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariant };