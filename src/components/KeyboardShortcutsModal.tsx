import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";

interface ShortcutProps {
  keys: string[];
  action: string;
}

const Shortcut = ({ keys, action }: ShortcutProps) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-muted-foreground">{action}</span>
    <div className="flex gap-2">
      {keys.map((key, index) => (
        <kbd
          key={index}
          className="px-2 py-1 text-xs font-semibold text-medical-primary bg-medical-primary/10 rounded"
        >
          {key}
        </kbd>
      ))}
    </div>
  </div>
);

export const KeyboardShortcutsModal = () => {
  const shortcuts: ShortcutProps[] = [
    { keys: ["Space"], action: "Flip card" },
    { keys: ["→"], action: "Next card" },
    { keys: ["←"], action: "Previous card" },
    { keys: ["E"], action: "Rate Easy" },
    { keys: ["M"], action: "Rate Medium" },
    { keys: ["H"], action: "Rate Hard" },
    { keys: ["K"], action: "Show/hide shortcuts" },
    { keys: ["Esc"], action: "Close dialogs" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Keyboard className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border rounded-lg divide-y">
            {shortcuts.map((shortcut, index) => (
              <Shortcut key={index} {...shortcut} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};