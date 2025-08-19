import { useWatch, type Control } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Translator } from "@/lib/i18n/Translator";
import { capitalizeFirstLetter } from "@/utils";
import type { CreateListFormValues } from "@/components/layout/CreateListDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CreateListSummaryProps = {
  control: Control<CreateListFormValues>;
};

export function CreateListSummary({ control }: CreateListSummaryProps) {
  const listItems = useWatch({
    control,
    name: "listItems",
  });

  const filteredItems = listItems.filter((item) => item.quantity > 0);

  if (filteredItems.length === 0) return;

  return (
    <Table className="caption-top table-fixed">
      <TableCaption>
        <Translator path="dashboard.createListDialog.summary.title" />
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-full">
            <Translator path="dashboard.createListDialog.summary.items" />
          </TableHead>
          <TableHead className="w-12 text-right">
            <Translator path="dashboard.createListDialog.summary.quantity" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredItems.map((item) => (
          <TableRow key={item.itemId}>
            <TableCell className="flex flex-col gap-2 overflow-x-auto">
              <span>
                {item.icon} {capitalizeFirstLetter(item.name)}
              </span>

              {item.note && (
                <div className="flex items-center gap-2">
                  <ArrowRight size={12} className="shrink-0" /> {item.note}
                </div>
              )}
            </TableCell>

            <TableCell className="text-right">{item.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
