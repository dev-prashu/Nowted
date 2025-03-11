import axios from "axios";
import { useCallback, useState } from "react";

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
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/notes?limit=100`);
      setNotes(response.data.notes);
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

  //Delete Notes By Id
  const deleteNoteById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
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

  //Patch Notes By Id
  const updateNote = useCallback(async (id: string, note: Partial<Note>) => {
    setLoading(true);
    try {
      await axios.patch<Note>(`${API_URL}/notes/${id}`, note);
      console.log("Inside Update Note");
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  //Get Favorites Notes
  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/notes?favorite=true`);
      setNotes(response.data.notes);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  //Get Archived Notes
  const fetchArchived = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/notes?archived=true`);
      console.log("response", response.data);
      setNotes(response.data.notes);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  //Get Deleted Notes
  const fetchDeleted = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/notes?deleted=true`);
      setNotes(response.data.notes);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  //Restore Deleted Notes
  const restoreNote = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/notes/${id}/restore`);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

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
    fetchFavorites,
    fetchArchived,
    fetchDeleted,
    restoreNote,
    searchQuery
  };
}
