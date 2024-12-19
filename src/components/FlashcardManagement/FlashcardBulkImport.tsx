import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const FlashcardBulkImport = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/csv") {
      handleFileUpload(file);
    } else {
      toast.error("Please upload a CSV file");
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const rows = text.split("\n").map(row => row.split(","));
        console.log("Parsed CSV:", rows);
        toast.success(`Successfully parsed ${rows.length - 1} cards`);
      } catch (error) {
        toast.error("Error parsing CSV file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card className="p-6 space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging ? "border-primary bg-primary/5" : "border-border"}
          hover:border-primary hover:bg-primary/5`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Drag and drop your CSV file</h3>
        <p className="text-sm text-muted-foreground mb-4">
          or click to select a file
        </p>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
        />
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Select CSV File
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          CSV format: front,back,tags (comma-separated)
        </AlertDescription>
      </Alert>
    </Card>
  );
};