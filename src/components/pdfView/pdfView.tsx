// src/components/pdfView/PDFView.tsx
import { Skeleton } from "@/components/ui/skeleton"
import type { TagResponse } from "@/lib/api"

import RegionCard from "./RegionCard"
import type { Region } from "./RegionCard"

type Props = {
  data: TagResponse | null
  loading: boolean
}

export default function PDFView({ data, loading }: Props) {

  console.log("PDFView loading:", loading)
  if (loading) {
    console.log("I was here")
    return (
     <div className="p-6 bg-black rounded-2xl shadow-lg border border-gray-800 flex flex-col gap-2 min-h-[100px]">
       <Skeleton className="h-6 w-1/3 bg-gray-200/70 animate-pulse" />
       <Skeleton className="h-4 w-full bg-gray-200/70 animate-pulse" />
       <Skeleton className="h-4 w-full bg-gray-200/70 animate-pulse" />
       <Skeleton className="h-4 w-3/4 bg-gray-200/70 animate-pulse" />
     </div>
   )
  }


  if (!data) {
    return (
      <div className="p-6 text-gray-500 italic">
        Upload a PDF and hit “Generate” to see your tags here.
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-700 overflow-auto max-h-[80vh]">
      {data.structure.map((r: Region, idx: number) => (
        <RegionCard key={idx} region={r} />
      ))}
    </div>
  )
}
