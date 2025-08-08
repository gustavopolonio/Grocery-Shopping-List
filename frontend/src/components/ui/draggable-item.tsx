import type { ReactNode } from "react";
import { GripVertical } from "lucide-react";
import { Reorder, useDragControls } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DraggableItemProps<T> {
  item: T;
  children: ReactNode;
}

// @to-do: check if in prod drag/drop works. When drag first item down and try to drag it up again should work.

export default function DraggableItem<T>({
  item,
  children,
}: DraggableItemProps<T>) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      id={item}
      value={item}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileDrag={{
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        cursor: "default",
        display: "flex",
      }}
      dragListener={false}
      dragControls={controls}
    >
      <Card className="flex-row items-center w-full px-3 gap-2 border bg-muted transition-all duration-200 hover:shadow-md hover:bg-accent hover:text-accent-foreground">
        <Button
          variant="ghost"
          onPointerDown={(e) => controls.start(e)}
          className="p-2! flex-shrink-0 text-accent-foreground hover:text-primary-foreground hover:bg-primary transition-colors cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-6! h-6!" />
        </Button>

        <div className="w-full space-y-3">{children}</div>
      </Card>
    </Reorder.Item>
  );
}
