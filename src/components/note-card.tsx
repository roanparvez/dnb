"use client";

import React from "react";

import { useState, useRef, useEffect } from "react";
import { Edit, Trash2, Check, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/lib/types";

interface NoteCardProps {
  note: Note;
  onUpdate: (note: Note) => void;
  onDelete: (id: string) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  bringToFront: (id: string) => void;
}

const NoteCard = ({ note, onUpdate, onDelete, onPositionChange, bringToFront }: NoteCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);
  const [position, setPosition] = useState(note.position);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition(note.position);
  }, [note.position]);

  const handleSave = () => {
    onUpdate({
      ...note,
      content: editedContent,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(note.content);
    setIsEditing(false);
  };

  const handleNoteClick = (e: React.MouseEvent) => {
    // Don't trigger when clicking buttons or when editing
    if (!(e.target as HTMLElement).closest("button") && !isEditing) {
      bringToFront(note.id);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (noteRef.current && !isEditing) {
      // Prevent dragging when clicking on buttons
      if ((e.target as HTMLElement).closest("button")) {
        return;
      }

      bringToFront(note.id);

      const rect = noteRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      e.preventDefault(); // Prevent text selection during drag
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && noteRef.current) {
      const parentRect = noteRef.current.parentElement?.getBoundingClientRect();
      if (parentRect) {
        const x = e.clientX - parentRect.left - dragOffset.x;
        const y = e.clientY - parentRect.top - dragOffset.y;

        // Ensure note stays within board boundaries
        const newX = Math.max(0, Math.min(x, parentRect.width - noteRef.current.offsetWidth));
        const newY = Math.max(0, Math.min(y, parentRect.height - noteRef.current.offsetHeight));

        setPosition({ x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onPositionChange(note.id, position);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <Card
      ref={noteRef}
      className={`${note.color} shadow-lg transform rotate-[-1deg] hover:rotate-0 transition-transform duration-200 absolute note-card cursor-move`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "250px",
        zIndex: note.zIndex || 1,
      }}
      onMouseDown={handleMouseDown}
      onClick={handleNoteClick}
    >
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full shadow-md z-10"></div>

      {isEditing ? (
        <>
          <CardContent className="p-3">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[100px] bg-white/80"
              placeholder="Write your note here..."
              autoFocus
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2 p-3 pt-0">
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Check className="h-4 w-4" />
            </Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardContent className="p-3">
            <p className="whitespace-pre-wrap">{note.content}</p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 p-3 pt-0">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="cursor-pointer"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(note.id)}
              className="cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
export default NoteCard;
