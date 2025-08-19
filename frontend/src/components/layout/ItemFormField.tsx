import { useEffect, useRef, useState } from "react";
import { useController, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Edit3 } from "lucide-react";
import type { CreateListFormValues } from "@/components/layout/CreateListDialog";
import { Typography } from "@/components/ui/typography";
import { capitalizeFirstLetter } from "@/utils";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Item } from "@/@types/item";

type ItemFormFieldProps = {
  index: number;
  product: Item;
  control: Control<CreateListFormValues>;
  name: "listItems";
};

export function ItemFormField({
  index,
  product,
  control,
  name,
}: ItemFormFieldProps) {
  const noteInputRef = useRef<HTMLInputElement>(null);
  const [isNoteCollapsibleOpen, setIsNoteCollapsibleOpen] = useState(false);
  const { t } = useTranslation();

  const { field: quantityField } = useController({
    control,
    name: `${name}.${index}.quantity`,
  });

  const { field: noteField } = useController({
    control,
    name: `${name}.${index}.note`,
  });

  const { field: nameField } = useController({
    control,
    name: `${name}.${index}.name`,
  });

  const { field: iconField } = useController({
    control,
    name: `${name}.${index}.icon`,
  });

  const { field: isCutomField } = useController({
    control,
    name: `${name}.${index}.isCustom`,
  });

  useEffect(() => {
    if (isNoteCollapsibleOpen && noteInputRef.current) {
      noteInputRef.current.focus();
    }
  }, [isNoteCollapsibleOpen]);

  return (
    <Collapsible
      key={product.id}
      open={isNoteCollapsibleOpen}
      onOpenChange={setIsNoteCollapsibleOpen}
    >
      <li className="flex items-center justify-between bg-sidebar rounded-md group border overflow-hidden rounded-b-none gap-1">
        <div className="w-0 flex-auto flex items-center gap-2 group-hover:bg-sidebar-accent group-hover:text-sidebar-accent-foreground">
          <Typography className="leading-9! pl-1 text-sm font-bold max-md:leading-11! overflow-x-auto whitespace-nowrap">
            {product.icon} {capitalizeFirstLetter(product.name)}
          </Typography>

          <CollapsibleTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              type="button"
              className="group/button hover:bg-primary relative max-md:w-11 max-md:h-11"
            >
              <Edit3 className="text-primary group-hover/button:text-primary-foreground max-md:w-5! max-md:h-5!" />
              {noteField.value && (
                <span className="absolute top-1/2 right-[-3px] -translate-y-1/2 h-2 w-2 rounded-full bg-blue-600"></span>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <QuantitySelector
          quantity={quantityField.value ?? 0}
          onChange={(val) => quantityField.onChange(val)}
        />

        <Input type="hidden" value={nameField.value} />

        <Input type="hidden" value={iconField.value} />

        <Input type="hidden" value={isCutomField.value ? "true" : "false"} />
      </li>

      <CollapsibleContent>
        <Input
          ref={noteInputRef}
          placeholder={t("dashboard.createListDialog.fields.listItems.note")}
          className="rounded-t-none max-md:h-10"
          value={noteField.value ?? ""}
          onChange={(e) => noteField.onChange(e.target.value)}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
