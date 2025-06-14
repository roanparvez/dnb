"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { NoteCard } from "@/components/note-card";
import type { Note } from "@/lib/types";

const Board = () => {
  const [notes, setNotes] = useState<Note[]>([]);
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
        content: "Welcome! Your board is ready. You can drag notes and reorder them.",
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
      </div>
    </div>
  );
};

export default Board;
