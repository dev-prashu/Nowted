import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { pageParam } from "../types/pageParam";

const API_URL: string = "https://nowted-server.remotestate.com";

export interface Note {
  id: string;
  folderId: string;
  title: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  content: string;
  preview: string;
  folder: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
}
export function useNotesApi() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const context = useContext(NoteContext);

  // Recent Notes API
  const fetchRecentNotes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/notes/recent`);
      setNotes(response.data.recentNotes);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  //Fetch Notes API
  const fetchNotes = useCallback(async (params: pageParam) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/notes`, { params });
      return response.data.notes;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  //Fetch Notes By Id API
  const fetchNoteById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/notes/${id}`);
      return [response.data.note];
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  //Create Notes
  const createNote = useCallback(async (note: Partial<Note>) => {
    setLoading(true);
    try {
      const response = await axios.post<Note>(`${API_URL}/notes`, note);
      return response.data.id;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  //Update Notes By Id
  const updateNote = useCallback(
    async (id: string, note: Partial<Note>) => {
      setLoading(true);
      try {
        await axios.patch<Note>(`${API_URL}/notes/${id}`, note);
        context?.setIsChange((prev) => !prev);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [context]
  );

  //Delete Notes By Id
  const deleteNoteById = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await axios.delete(`${API_URL}/notes/${id}`);
        context?.setIsChange((prev) => !prev);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [context]
  );

  //Restore Deleted Notes
  const restoreNote = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await axios.post(`${API_URL}/notes/${id}/restore`);
        context?.setIsChange((prev) => !prev);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [context]
  );

  //Search Query
  const searchQuery = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/notes?search=${query}`);
      setNotes(response.data.notes);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    notes,
    loading,
    error,
    fetchRecentNotes,
    fetchNotes,
    fetchNoteById,
    deleteNoteById,
    createNote,
    updateNote,
    restoreNote,
    searchQuery,
  };
}
