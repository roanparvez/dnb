"use client";

import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Note } from "@/lib/types";

interface AddNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNote: (note: Omit<Note, "id" | "position">) => void;
}

const AddNoteDialog = ({ open, onOpenChange, onAddNote }: AddNoteDialogProps) => {
  const [content, setContent] = useState("");
  const [color, setColor] = useState("bg-yellow-200");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddNote({
        content: content.trim(),
        color,
      });
      resetForm();
      onOpenChange(false);
    }
  };

  const resetForm = () => {
    setContent("");
    setColor("bg-yellow-200");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content">Note</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                className="min-h-[100px]"
                required
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label>Note Color</Label>
              <RadioGroup value={color} onValueChange={setColor} className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bg-yellow-200" id="yellow" className="border-yellow-400" />
                  <Label htmlFor="yellow" className="p-2 bg-yellow-200 rounded-md">
                    Yellow
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bg-blue-200" id="blue" className="border-blue-400" />
                  <Label htmlFor="blue" className="p-2 bg-blue-200 rounded-md">
                    Blue
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bg-green-200" id="green" className="border-green-400" />
                  <Label htmlFor="green" className="p-2 bg-green-200 rounded-md">
                    Green
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bg-pink-200" id="pink" className="border-pink-400" />
                  <Label htmlFor="pink" className="p-2 bg-pink-200 rounded-md">
                    Pink
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add Note</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddNoteDialog;
