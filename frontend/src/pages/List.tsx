import { Typography } from "@/components/ui/typography";
import { Translator } from "@/lib/i18n/Translator";
import { useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon, Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ListItemsFormField } from "@/components/layout/ListItemsFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import type { ListItems } from "@/@types/list";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { pluralize } from "@/utils";
import { FloatingNotificationBar } from "@/components/ui/floating-notification-bar";
import { Input } from "@/components/ui/input";

const itemFieldSchema = z.object({
  itemId: z.string(),
  quantity: z.number().min(0),
  name: z.string().min(2),
  icon: z.string(),
  note: z.string().optional(),
  isCustom: z.string(),
});

const updateListFormSchema = z.object({
  // listName: z
  //   .string()
  //   .min(3, { error: "List name must be at least 3 caracters" }),
  listItems: z.array(itemFieldSchema),
});

export type ItemField = z.infer<typeof itemFieldSchema>;
export type UpdateListFormValues = z.infer<typeof updateListFormSchema>;

export function List() {
  const params = useParams();
  const listId = params.listId;
  const axiosPrivate = useAxiosPrivate();
  const { lang } = useParams();
  const [dismissedNotificationBar, setDismissedNotificationBar] =
    useState(false);

  const [listFilters, setListFilters] = useState({
    categoryIcons: true,
    itemIcons: true,
    addedBy: true,
    createdAt: true,
  });

  const updateListForm = useForm<UpdateListFormValues>({
    resolver: zodResolver(updateListFormSchema),
    defaultValues: {
      // listName: "",
      listItems: [],
    },
  });

  const { isDirty } = updateListForm.formState;

  const {
    data: listItemsData,
    isLoading: isListItemsLoading,
    isError: isListItemsError,
  } = useQuery({
    queryKey: ["list-items", lang, listId],
    queryFn: async (): Promise<ListItems> => {
      const response = await axiosPrivate.get(`/lists/${lang}/${listId}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (!isDirty) setDismissedNotificationBar(false); // reset when form is clean
  }, [isDirty]);

  function toggleFilter(key: keyof typeof listFilters) {
    setListFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function onUpdateList(values: UpdateListFormValues) {
    console.log(values);
  }

  // const totalItems = listItemsData?.categories.reduce((acc, category) => {
  //   return acc + category.products.length + category.userCustomProducts.length;
  // }, 0);

  // const watchedItems = updateListForm.watch("listItems");
  // const totalItems1 = watchedItems.length;

  console.log(0);

  return (
    <>
      {isListItemsLoading ? (
        <Spinner />
      ) : isListItemsError ? (
        <Typography className="text-destructive text-sm text-center">
          {/* <Translator path="dashboard.createListDialog.categoryItems.fail" /> */}
          Error
        </Typography>
      ) : (
        <>
          <Typography variant="h1" className="text-center">
            {listItemsData?.list.name}
          </Typography>

          <Tabs
            defaultValue="items"
            className="max-w-2xl w-full mx-auto space-y-4"
          >
            <TabsList className="w-full">
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="items" className="space-y-3">
              <div className="flex justify-between items-center">
                <Button>
                  <PlusIcon />
                  Add item
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      <Settings2 />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      asChild
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Label htmlFor="categoryIcons" className="w-full">
                        <Checkbox
                          id="categoryIcons"
                          checked={listFilters.categoryIcons}
                          onCheckedChange={() => toggleFilter("categoryIcons")}
                        />
                        Category icons
                      </Label>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Label htmlFor="itemIcons" className="w-full">
                        <Checkbox
                          id="itemIcons"
                          checked={listFilters.itemIcons}
                          onCheckedChange={() => toggleFilter("itemIcons")}
                        />
                        Item icons
                      </Label>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Label htmlFor="addedBy" className="w-full">
                        <Checkbox
                          id="addedBy"
                          checked={listFilters.addedBy}
                          onCheckedChange={() => toggleFilter("addedBy")}
                        />
                        Added by
                      </Label>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Label htmlFor="createdAt" className="w-full">
                        <Checkbox
                          id="createdAt"
                          checked={listFilters.createdAt}
                          onCheckedChange={() => toggleFilter("createdAt")}
                        />
                        Created at
                      </Label>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* <span className="block text-center">
                {totalItems &&
                  `${totalItems} ${pluralize(totalItems, "item", "items")}`}
              </span> */}

              <Form {...updateListForm}>
                <form
                  onSubmit={updateListForm.handleSubmit(onUpdateList)}
                  className="grid gap-5"
                >
                  <ListItemsFormField
                    control={updateListForm.control}
                    reset={updateListForm.reset}
                    name="listItems"
                    listItemsData={listItemsData}
                    listFilters={listFilters}
                  />

                  <FloatingNotificationBar
                    open={isDirty}
                    dismissed={dismissedNotificationBar}
                    // onSave={updateListForm.handleSubmit(onUpdateList)}
                    onDismiss={() => setDismissedNotificationBar(true)}
                    onReopen={() => setDismissedNotificationBar(false)}
                  />
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="settings">
              {/* <FormField
                control={updateListForm.control}
                name="listName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="dsadsa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </TabsContent>
          </Tabs>
        </>
      )}
    </>
  );
}
