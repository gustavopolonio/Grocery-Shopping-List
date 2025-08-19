import z from "zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Translator } from "@/lib/i18n/Translator";
import { CategoryItemsListFormField } from "@/components/layout/CategoryItemsListFormField";
import { CreateListSummary } from "@/components/layout/CreateListSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const itemFieldSchema = z.object({
  itemId: z.string(),
  quantity: z.number().min(0),
  name: z.string().min(2),
  icon: z.string(),
  note: z.string().optional(),
});

const createListFormSchema = z.object({
  listName: z
    .string()
    .min(3, { error: "List name must be at least 3 caracters" }),
  listItems: z.array(itemFieldSchema),
});

export type ItemField = z.infer<typeof itemFieldSchema>;
export type CreateListFormValues = z.infer<typeof createListFormSchema>;

export function CreateListDialog() {
  const { t } = useTranslation();
  const createListForm = useForm<CreateListFormValues>({
    resolver: zodResolver(createListFormSchema),
    defaultValues: {
      listName: "",
      listItems: [],
    },
  });

  function onCreateList(values: CreateListFormValues) {
    console.log(values);
    // @to-do: create list
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold">
          <PlusIcon />
          <Translator path="dashboard.lists.add" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-hidden flex pb-12 max-sm:px-4">
        <Form {...createListForm}>
          <form
            onSubmit={createListForm.handleSubmit(onCreateList)}
            className="grid gap-5 w-full"
          >
            <DialogHeader>
              <DialogTitle>
                <Translator path="dashboard.createListDialog.title" />
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-7 overflow-y-auto pr-3 pl-0.5">
              <FormField
                control={createListForm.control}
                name="listName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Translator path="dashboard.createListDialog.fields.listName.title" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          "dashboard.createListDialog.fields.listName.placeholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                {/* @to-do: try to not render this component every time re-opens */}
                <CategoryItemsListFormField
                  control={createListForm.control}
                  name="listItems"
                />
              </FormItem>

              <CreateListSummary control={createListForm.control} />

              <Alert className="bg-secondary">
                <Link className="text-secondary-foreground!" />
                <AlertDescription className="text-secondary-foreground">
                  <Translator path="dashboard.createListDialog.alerts.shareableLink" />
                </AlertDescription>
              </Alert>

              <Button
                type="submit"
                // disabled when creating list @to-do
              >
                <Translator path="dashboard.createListDialog.submit" />
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
