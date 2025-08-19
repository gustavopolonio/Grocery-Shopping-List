import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type QuantitySelectorPros = {
  quantity: number;
  onChange: (newQuantity: number) => void;
};

export function QuantitySelector({ quantity, onChange }: QuantitySelectorPros) {
  function handleRemoveQuantity() {
    onChange(Math.max(0, quantity - 1));
  }

  function handleIncreaseQuantity() {
    onChange(quantity + 1);
  }

  return (
    <div className="w-fit flex items-center border border-input shadow-xs rounded-md focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]">
      {quantity > 0 && (
        <>
          <Button
            size="icon"
            variant="ghost"
            className="w-9 h-9 bg-destructive/10 hover:bg-destructive/20 disabled:opacity-50 disabled:cursor-not-allowed max-md:w-11 max-md:h-11"
            onClick={handleRemoveQuantity}
            type="button"
          >
            {quantity === 1 ? (
              <Trash2 className="text-destructive" />
            ) : (
              <MinusIcon className="text-destructive max-md:w-5! max-md:h-5!" />
            )}
          </Button>

          <input
            type="number"
            min={0}
            className="font-bold text-center file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-10 min-w-0 bg-transparent px-2 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive max-md:h-11"
            value={quantity}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        </>
      )}

      <Button
        size="icon"
        variant="ghost"
        className="ml-auto w-9 h-9 bg-primary/10 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed max-md:w-11 max-md:h-11"
        onClick={handleIncreaseQuantity}
        type="button"
      >
        <PlusIcon className="text-primary max-md:w-5! max-md:h-5!" />
      </Button>
    </div>
  );
}
