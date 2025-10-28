import { Translator } from "@/lib/i18n/Translator";
import { FormControl, FormItem } from "../ui/form";
import { Typography } from "../ui/typography";
import { ItemFormField } from "./ItemFormField";
import type { ListItems } from "@/@types/list";
import type { Item } from "@/@types/item";
import {
  useFieldArray,
  type Control,
  type FormState,
  type UseFormReset,
} from "react-hook-form";
import type { ItemField, UpdateListFormValues } from "@/pages/List";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { pluralize } from "@/utils";

type ListItemsFormFielddProps = {
  control: Control<UpdateListFormValues>;
  reset: UseFormReset<UpdateListFormValues>;
  name: "listItems";
  listItemsData: ListItems | undefined;
  listFilters: {
    categoryIcons: boolean;
    itemIcons: boolean;
    addedBy: boolean;
    createdAt: boolean;
  };
};

// @to-do: this component is very similar to ListItemsFormField. Try to reuse.
export function ListItemsFormField({
  control,
  reset,
  name,
  listItemsData,
  listFilters,
}: ListItemsFormFielddProps) {
  const { fields, replace, remove } = useFieldArray<
    UpdateListFormValues,
    "listItems"
  >({
    control,
    name,
  });

  console.log(fields);

  useEffect(() => {
    if (listItemsData) {
      const initialItems: ItemField[] = listItemsData.categories.flatMap(
        (category) => {
          const products = category.products.map((product) => ({
            itemId: product.id,
            quantity: product.quantity,
            note: product.note,
            name: product.name,
            icon: product.icon,
            isCustom: "false",
          }));

          const customProducts = category.userCustomProducts.map(
            (customProduct) => ({
              itemId: customProduct.id,
              quantity: customProduct.quantity,
              note: customProduct.note,
              name: customProduct.name,
              icon: customProduct.icon,
              isCustom: "true",
            })
          );

          return [...products, ...customProducts];
        }
      );

      replace(initialItems);
      reset({ listItems: initialItems }); // set as default values to not trigger isDirty
    }
  }, [listItemsData, replace, reset]);

  function renderItemFormField(product: Item) {
    const index = fields.findIndex((f) => f.itemId === product.id);
    if (index < 0) return null;

    return (
      <ItemFormField
        key={product.id}
        product={product}
        index={index}
        name={name}
        control={control}
        displayCreatedAt
        listFilters={listFilters}
        onRemove={() => remove(index)}
      />
    );
  }

  function renderListItems() {}

  return (
    <FormItem>
      <FormControl>
        <div className="space-y-6 max-md:space-y-8">
          <span className="block text-center">
            {`${fields.length} ${pluralize(fields.length, "item", "items")}`}
          </span>

          {listItemsData?.categories.length ? (
            listItemsData.categories.map((category) => {
              const categoryProductIds = [
                ...category.products.map((product) => product.id),
                ...category.userCustomProducts.map((product) => product.id),
              ];

              const categoryHasItems = fields.some((product) =>
                categoryProductIds.includes(product.itemId)
              );

              if (!categoryHasItems) return null;

              return (
                <div key={category.name} className="space-y-3">
                  <Typography variant="h3" className="text-base">
                    {listFilters.categoryIcons && category.icon} {category.name}
                  </Typography>

                  <ul className="space-y-3">
                    {category.products.map((product) =>
                      renderItemFormField(product)
                    )}

                    {category.userCustomProducts.map((product) =>
                      renderItemFormField(product)
                    )}
                  </ul>
                </div>
              );
            })
          ) : (
            <Typography className="text-destructive text-sm text-center">
              {/* <Translator path="dashboard.createListDialog.categoryItems.noItems" /> */}
              No items
            </Typography>
          )}
        </div>
      </FormControl>
    </FormItem>
  );
}
