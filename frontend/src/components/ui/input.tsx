import * as React from "react";
import { X, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  containerClassName?: string;
  isClearble?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      value,
      startIcon: StartIcon,
      endIcon: EndIcon,
      containerClassName,
      isClearble = false,
      onClear,
      ...props
    },
    ref
  ) => {
    const hasValue = value !== null && String(value).trim().length > 0;

    if (type === "hidden") {
      return <input type={type} data-slot="input" {...props} />;
    }

    return (
      <div className={cn("w-full relative", containerClassName)}>
        {StartIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <StartIcon size={18} className="text-muted-foreground" />
          </div>
        )}

        <input
          ref={ref}
          type={type}
          value={value}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive max-md:h-10",
            { "pl-10!": StartIcon, "pr-10!": EndIcon },
            className
          )}
          {...props}
        />

        {isClearble && hasValue && (
          <button
            type="button"
            onClick={onClear}
            className="w-9 h-9 flex items-center justify-center absolute right-10 top-1/2 transform -translate-y-1/2 max-md:w-10 max-md:h-10"
          >
            <X className="text-destructive" size={18} />
          </button>
        )}

        {EndIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <EndIcon className="text-muted-foreground" size={18} />
          </div>
        )}
      </div>
    );
  }
);

export { Input };
