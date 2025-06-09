// src/lib/api.ts
import axios from "axios";

export interface Span {
    text: string;
    font: string;
    size: number;
    bbox: number[];
    color: number[];
}

export interface Region {
  page: number;
  type: string;
  content: string;
  bbox: number[];
  tag: string;
  spans?: Span[];
  xref?: number;
  raw_png?: string;
  image_width?: number;
  image_height?: number;
}

export interface Metadata {
    filename: string;
    title: string;
    author: string;
    subject: string;
    keywords: string;
    creator: string;
    producer: string;
    creation_date: string;
    mod_date: string;
}

export interface TagResponse {
    pages: { page: number; width: number; height: number }[];
    structure: Region[];
    metadata: Metadata;
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
