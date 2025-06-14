"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import NoteCard from "@/components/note-card";
import AddNoteDialog from "@/components/add-note-dialog";
import { Note } from "@/lib/types";

const Board = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newNotePosition, setNewNotePosition] = useState({ x: 0, y: 0 });
  const boardRef = useRef<HTMLDivElement>(null);
  const [maxZIndex, setMaxZIndex] = useState(1);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notice-board-notes");
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);

      // Find the highest z-index among loaded notes
      const highestZIndex = parsedNotes.reduce(
        (max: number, note: Note) => Math.max(max, note.zIndex || 1),
        1,
      );
      setMaxZIndex(highestZIndex);
    } else {
      // Set an example note if none exist
      const exampleNote: Note = {
        id: "1",
        content:
          "Double-click anywhere on the board to add a new note. Drag notes to reposition them.",
        color: "bg-yellow-200",
        position: { x: 50, y: 50 },
        zIndex: 1,
      };
      setNotes([exampleNote]);
      localStorage.setItem("notice-board-notes", JSON.stringify([exampleNote]));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notice-board-notes", JSON.stringify(notes));
    }
  }, [notes]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only open dialog if the double click was on the board itself, not on a note
      if (e.target === boardRef.current || boardRef.current.contains(e.target as Node)) {
        const targetElement = e.target as HTMLElement;
        if (!targetElement.closest(".note-card")) {
          setNewNotePosition({ x, y });
          setIsDialogOpen(true);
        }
      }
    }
  };

  const addNote = (note: Omit<Note, "id" | "position" | "zIndex">) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    const newNote: Note = {
      ...note,
      id: crypto.randomUUID(),
      position: newNotePosition,
      zIndex: newZIndex,
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNotePosition = (id: string, position: { x: number; y: number }) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, position } : note)));
  };

  const bringToFront = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setNotes(notes.map((note) => (note.id === id ? { ...note, zIndex: newZIndex } : note)));
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div
        ref={boardRef}
        className="container mx-auto p-4 min-h-screen relative"
        style={{
          backgroundImage: "url('/cork-board.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
        onDoubleClick={handleDoubleClick}
      >
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onUpdate={updateNote}
            onDelete={deleteNote}
            onPositionChange={updateNotePosition}
            bringToFront={bringToFront}
          />
        ))}

        <AddNoteDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAddNote={addNote} />
      </div>
    </div>
  );
};

export default Board;
