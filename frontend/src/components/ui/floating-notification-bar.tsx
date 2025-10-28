import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

interface FloatingNotificationBarProps {
  open: boolean;
  dismissed: boolean;
  onSave?: () => void;
  onDismiss?: () => void;
  onReopen?: () => void;
}

export function FloatingNotificationBar({
  open,
  dismissed,
  onSave,
  onDismiss,
  onReopen,
}: FloatingNotificationBarProps) {
  return (
    <>
      {/* Main bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-max">
        <AnimatePresence>
          {open && !dismissed && (
            <motion.div
              key="bar"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex items-center gap-4 px-4 py-3 rounded-lg shadow-lg border bg-yellow-50 text-yellow-800 max-w-[90vw] sm:max-w-md"
            >
              <span className="flex-1 text-sm sm:text-base font-medium">
                You have unsaved changes
              </span>

              <button
                className="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
                // onClick={() => onSave?.()}
                type="submit"
              >
                Save
              </button>

              <button
                className="text-yellow-800/70 hover:text-yellow-800 text-xl leading-none"
                onClick={onDismiss}
                type="button"
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating reopen icon */}
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {open && dismissed && (
            <motion.button
              key="reopen"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              onClick={onReopen}
              className="p-3 rounded-full bg-yellow-50 border border-yellow-400 shadow-lg hover:bg-yellow-100 text-yellow-700"
              type="button"
            >
              <AlertTriangle size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
