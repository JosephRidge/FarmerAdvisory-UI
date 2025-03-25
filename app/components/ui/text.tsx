import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const textVariant = cva(`inline-flex items-center justify-center`, {
  variants: {
    variant: {
      title: "poppins-bold text-2xl ",
      subtitle: "poppins-semibold font-light text-lg ",
      small: "leading-7 font-light text-lg md:text-base",
      default: "poppins-regular text-sm ",
    },
    size: {
      default: "p-2 md:p-1",
      sm: "px-2 text-sm",
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