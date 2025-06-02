// src/pages/AIpdfTagger/AIpdfTagger.tsx
import { useState } from "react"
import AIPDFConfiguration from "@/components/AIpdfConfiguration/AIpdfConfiguration"
import PDFView from "@/components/pdfView/pdfView"
import PDFMetadata from "@/components/pdfView/PDFMetadata"
import type { TagResponse } from "@/lib/api"
import { uploadPdf }        from "@/lib/api"

export default function AIpdfTagger() {
  const [tags, setTags]       = useState<TagResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUploadAndTag = async (file: File) => {
    setLoading(true)
    try {
      const result = await uploadPdf(file)
      setTags(result)
    } catch (err) {
      console.error(err)
      alert("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    // <div className="flex flex-col md:flex-row gap-6 p-6">
    //   {/* Left: config, passes selected file up */}
    //   <div style={{ flex: 3 }}>
    //     <AIPDFConfiguration
    //       onGenerate={handleUploadAndTag}
    //     />
    //   </div>

    //   {/* Right: view JSON or skeleton */}
    //   <div style={{ flex: 7 }}>
    //     <PDFView
    //       data={tags}
    //       loading={loading}
    //     />
    //   </div>
    // </div>

    <div className="flex flex-col md:flex-row gap-6 p-6 h-[calc(100vh-2rem)]">
      {/* Left: config, passes selected file up */}
      <div style={{ flex: 3 }}>
        <AIPDFConfiguration onGenerate={handleUploadAndTag} />
      </div>

      {/* Right: show metadata (if available), then PDFView */}
      <div style={{ flex: 7 }} className="flex flex-col">
        {/* Show metadata above the region cards */}
        {tags && tags.metadata && (
          <PDFMetadata metadata={tags.metadata} />
        )}
        {/* Then the region cards or skeleton */}
        <div className="flex-1 overflow-auto">
          <PDFView data={tags} loading={loading} />
        </div>
      </div>
    </div>

  )
}
