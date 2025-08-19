import { useEffect, useMemo, useState } from "react";
import { useFieldArray, type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Search } from "lucide-react";
import { api } from "@/lib/axios";
import { Translator } from "@/lib/i18n/Translator";
import { useDebounce } from "@/hooks/useDebounce";
import { removeAccentsAndDiacritics } from "@/utils";
import { ItemFormField } from "@/components/layout/ItemFormField";
import type {
  CreateListFormValues,
  ItemField,
} from "@/components/layout/CreateListDialog";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import type { CategoryItems, Item } from "@/@types/item";

type ListItemsFormFieldProps = {
  control: Control<CreateListFormValues>;
  name: "listItems";
};

export function CategoryItemsListFormField({
  control,
  name,
}: ListItemsFormFieldProps) {
  const [searchedItem, setSearchedItem] = useState("");
  const [areFieldsReady, setAreFieldsReady] = useState(false);
  const { lang } = useParams();
  const { t } = useTranslation();

  const {
    data: categoryItemsData,
    isLoading: isCategoryItemsLoading,
    isError: isCategoryItemsError,
  } = useQuery({
    staleTime: 1000 * 60 * 60, // 1 hour
    queryKey: ["category-items", lang],
    queryFn: async (): Promise<CategoryItems> => {
      const response = await api.get(`/${lang}/category-items`);
      return response.data;
    },
  });

  const debouncedSearchItem = useDebounce(searchedItem, 300);
  const { fields, replace } = useFieldArray<CreateListFormValues, "listItems">({
    control,
    name,
  });

  useEffect(() => {
    if (categoryItemsData) {
      const initialItems: ItemField[] = categoryItemsData.categories.flatMap(
        (category) => {
          const products = category.products.map((product) => ({
            itemId: product.id,
            quantity: 0,
            notes: "",
            name: product.name,
            icon: product.icon,
          }));

          const customProducts = category.userCustomProducts.map(
            (customProduct) => ({
              itemId: customProduct.id,
              quantity: 0,
              notes: "",
              name: customProduct.name,
              icon: customProduct.icon,
            })
          );

          return [...products, ...customProducts];
        }
      );

      replace(initialItems);
      setAreFieldsReady(true);
    }
  }, [categoryItemsData, replace]);

  const filteredCategoryItemsData = useMemo(() => {
    if (!categoryItemsData) return [];
    if (!debouncedSearchItem) return categoryItemsData.categories;

    const searchedItemFormatted = removeAccentsAndDiacritics(
      debouncedSearchItem.toLocaleLowerCase().trim()
    );

    const categoriesFilteredByItems = categoryItemsData.categories.map(
      (category) => ({
        ...category,
        products: category.products.filter((product) => {
          const productNameFormatted = removeAccentsAndDiacritics(
            product.name.toLocaleLowerCase()
          );

          return productNameFormatted.includes(searchedItemFormatted);
        }),
        userCustomProducts: category.userCustomProducts.filter(
          (customProduct) => {
            const customProductNameFormatted = removeAccentsAndDiacritics(
              customProduct.name.toLocaleLowerCase()
            );

            return customProductNameFormatted.includes(searchedItemFormatted);
          }
        ),
      })
    );

    // Return only categories that has at least one item in current search
    const filteredCategoryItems = categoriesFilteredByItems.filter(
      (category) =>
        category.products.length > 0 || category.userCustomProducts.length > 0
    );

    return filteredCategoryItems;
  }, [categoryItemsData, debouncedSearchItem]);

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
      />
    );
  }

  const isLoadingOverall = isCategoryItemsLoading || !areFieldsReady;

  return (
    <FormItem>
      <FormLabel>
        <Translator path="dashboard.createListDialog.fields.listItems.title" />
      </FormLabel>

      {isLoadingOverall ? (
        <Spinner />
      ) : isCategoryItemsError ? (
        <Typography className="text-destructive text-sm text-center">
          <Translator path="dashboard.createListDialog.categoryItems.fail" />
        </Typography>
      ) : (
        <div className="flex flex-col space-y-5">
          <Input
            value={searchedItem}
            onChange={(e) => setSearchedItem(e.target.value)}
            placeholder={t(
              "dashboard.createListDialog.fields.listItems.placeholder"
            )}
            endIcon={Search}
            containerClassName="sticky top-1 bg-background z-50"
            isClearble
            onClear={() => setSearchedItem("")}
          />

          <FormControl>
            <div className="space-y-6 max-md:space-y-8">
              {filteredCategoryItemsData.length ? (
                filteredCategoryItemsData.map((category) => (
                  <div key={category.name} className="space-y-3">
                    <Typography variant="h3" className="text-base">
                      {category.icon} {category.name}
                    </Typography>

                    <ul className="space-y-2 max-md:space-y-3">
                      {category.products.map((product) =>
                        renderItemFormField(product)
                      )}

                      {category.userCustomProducts.map((product) =>
                        renderItemFormField(product)
                      )}
                    </ul>
                  </div>
                ))
              ) : (
                <Typography className="text-destructive text-sm text-center">
                  <Translator path="dashboard.createListDialog.categoryItems.noItems" />
                </Typography>
              )}
            </div>
          </FormControl>

          <div className="flex justify-center items-center gap-1">
            <span className="text-sm">
              <Translator path="dashboard.createListDialog.categoryItems.cantFind" />
            </span>
            <Button
              variant="link"
              size="sm"
              className="p-0"
              // onClick={} @to-do: open Create Item modal
            >
              <Translator path="dashboard.createListDialog.categoryItems.createCustom" />
            </Button>
          </div>
        </div>
      )}
    </FormItem>
  );
}
