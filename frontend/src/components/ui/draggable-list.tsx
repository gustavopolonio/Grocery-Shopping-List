import { type ReactNode } from "react";
import { Reorder } from "framer-motion";
import DraggableItem from "@/components/ui/draggable-item";

interface DraggableListProps<T> {
  items: T[];
  onReorder: (lists: T[]) => void;
  getId: (item: T) => string;
  renderItem: (item: T) => ReactNode;
}

export default function DraggableList<T>({
  items,
  onReorder,
  getId,
  renderItem,
}: DraggableListProps<T>) {
  return (
    <div>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={onReorder}
        className="space-y-4"
      >
        {items.map((item) => (
          <DraggableItem key={getId(item)} item={item} itemId={getId(item)}>
            {renderItem(item)}
          </DraggableItem>
        ))}
      </Reorder.Group>
    </div>
  );
}
