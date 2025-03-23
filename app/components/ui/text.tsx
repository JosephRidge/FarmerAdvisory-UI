import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const textVariant = cva(`inline-flex items-center justify-center`, {
  variants: {
    variant: {
      title: "poppins-bold text-2xl ",
      subtitle: "poppins-semibold  text-lg ",
      small: "leading-7  font-light text-lg",
      default: "poppins-regular text-sm ",
    },
    size: {
      default: "px-2 py-2",
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
    VariantProps<typeof textVariant> {
  asChild?: boolean;
}

const Text = forwardRef<HTMLDivElement, CardTileProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(textVariant({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Text.displayName = "Text";

export { Text, textVariant };