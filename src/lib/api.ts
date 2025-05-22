// src/lib/api.ts
import axios from "axios";

export interface Region {
  page: number;
  type: string;
  content: string;
  bbox: number[];
  tag: string;
}

export interface TagResponse {
  structure: Region[];
}

// Now VITE_API_URL should be like "http://127.0.0.1:8000/"
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function uploadPdf(file: File): Promise<TagResponse> {
  const form = new FormData();
  form.append("file", file);

  const { data } = await axios.post<TagResponse>(
    `${API_BASE}api/ai-tag`,  // note the added `/api`
    form,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}
