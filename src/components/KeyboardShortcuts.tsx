import { Button } from "./ui/button";
import { Keyboard } from "lucide-react";

interface KeyboardShortcutsProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const KeyboardShortcuts = ({ isVisible, onToggle }: KeyboardShortcutsProps) => {
  return (
    <>
      {isVisible && (
        <div className="bg-gradient-to-br from-medical-primary/5 to-transparent rounded-xl p-6 text-sm text-card-foreground animate-fade-in border border-medical-accent/20">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-lg">Keyboard Shortcuts</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-medical-primary/60 hover:text-medical-primary"
              onClick={onToggle}
            >
              <Keyboard className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: "←/→", action: "Navigate cards" },
              { key: "Space", action: "Flip card" },
              { key: "E", action: "Rate Easy" },
              { key: "M", action: "Rate Medium" },
              { key: "H", action: "Rate Hard" },
              { key: "K", action: "Toggle shortcuts" },
            ].map(({ key, action }) => (
              <div key={key} className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-medical-accent/10 rounded text-medical-primary font-mono text-sm">
                  {key}
                </kbd>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};