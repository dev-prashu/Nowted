import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";

const API_URL: string = "https://nowted-server.remotestate.com";

export interface Folder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export function useFolderApi() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const context=useContext(NoteContext);

  //Fetch Folders API
  const fetchFolders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/folders`);
      setFolders(response.data.folders);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  //Post Folder API
  const createFolder = useCallback(
    async (folder: Partial<Folder>) => {
      setLoading(true);
      try {
        const response = await axios.post(`${API_URL}/folders`, folder);
        setFolders((prev) => [response.data, ...prev]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }

      fetchFolders();
    },
    [fetchFolders]
  );

  //Patch Folder API
  const updateFolder = useCallback(async (id: string, name: string) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${API_URL}/folders/${id}`, { name });
      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === id ? { ...folder, name: response.data.name } : folder
        )
      );
      fetchFolders();
      context?.setIsChange(prev=>!prev);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [fetchFolders]);

  //Delete Folder By Id
  const deleteFolder = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/folders/${id}`);
      setFolders((prev) => prev.filter((folder) => folder.id !== id));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    folders,
    loading,
    error,
    fetchFolders,
    createFolder,
    updateFolder,
    deleteFolder,
  };
}
