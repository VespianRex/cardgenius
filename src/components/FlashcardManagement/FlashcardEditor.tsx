import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, X } from "lucide-react";
import { toast } from "sonner";

interface FlashcardEditorProps {
  onSave?: (card: { front: string; back: string; tags: string[] }) => void;
  onCancel?: () => void;
  initialCard?: { front: string; back: string; tags: string[] };
}

export const FlashcardEditor = ({ onSave, onCancel, initialCard }: FlashcardEditorProps) => {
  const [front, setFront] = useState(initialCard?.front || "");
  const [back, setBack] = useState(initialCard?.back || "");
  const [tags, setTags] = useState<string[]>(initialCard?.tags || []);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!front.trim() || !back.trim()) {
      toast.error("Both front and back content are required");
      return;
    }
    onSave?.({ front, back, tags });
    toast.success("Flashcard saved successfully");
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Front</label>
          <Textarea
            placeholder="Enter the question or front content"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Back</label>
          <Textarea
            placeholder="Enter the answer or back content"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add a tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
            />
            <Button onClick={handleAddTag} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-sm"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Card
        </Button>
      </div>
    </Card>
  );
};