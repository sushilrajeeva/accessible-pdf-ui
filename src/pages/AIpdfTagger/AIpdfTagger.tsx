// src/pages/AIpdfTagger/AIpdfTagger.tsx
import AIPDFConfiguration from "@/components/AIpdfConfiguration/AIpdfConfiguration"
import PDFView from "@/components/pdfView/pdfView"

export default function AIpdfTagger() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left: 30% */}
      <div style={{ flex: 3 }}>
        <AIPDFConfiguration />
      </div>

      {/* Right: 70% */}
      <div style={{ flex: 7 }}>
        <PDFView />
      </div>
    </div>
  )
}
