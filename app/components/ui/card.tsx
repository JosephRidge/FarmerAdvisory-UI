import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/app/lib/utils"

const cardVariants = cva(
  `inline-flex items-center justify-center rounded-2xl text-sm font-medium
   
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
   focus-visible:ring-offset-2
   disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: "border m-2 text-primary shadow-md hover:bg-primary/90",
        query:"bg-green-100 hover:bg-green-200  hover:cursor-pointer grid justify-start",   
      },
      size: {
        default: "w-96 md:w-64 h-64 md:h-48 p-4 md:p-2 m-4 md:m-2",
        sm: "rounded-md px-3 m-3",
        lg: " rounded-md px-8 m-2",
        icon: " p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface CardTileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const CardTile = forwardRef<HTMLDivElement, CardTileProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

CardTile.displayName = "Card";

export { CardTile, cardVariants };