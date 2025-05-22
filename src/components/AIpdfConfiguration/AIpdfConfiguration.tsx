// src/components/aipdfConfiguration/AIPDFConfiguration.tsx
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PROVIDERS = ["OpenAI", "Anthropic", "Google"] as const
const MODELS = {
  OpenAI: ["GPT-4o", "GPT-4o Mini", "GPT-3.5 Turbo"],
  Anthropic: ["Claude Sonnet 3.5", "Claude Sonnet 3.7"],
  Google: ["Gemini Flash 2.0"],
} as const

export default function AIPDFConfiguration() {
  const [aiProvider, setAiProvider] = useState<typeof PROVIDERS[number]>("OpenAI")
  const [model, setModel] = useState<string>(MODELS.OpenAI[0])
  const [fileName, setFileName] = useState<string>("")
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setIsUploading(false)
    }
  }

  const triggerFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleGenerate = () => {
    console.log("Generate Tagged PDF:", {
      aiProvider,
      model,
      fileName,
    })
    alert(`(stub) Generating tags for ${fileName} using ${aiProvider}/${model}`)
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-2xl shadow-lg border border-gray-200">
      {/* Context */}
      <div className="text-sm text-gray-700">
        Please upload your PDF to analyze it with our AI, automatically tag sections
        (title, headings, paragraphs, images, etc.), and generate a report of the tagged content.
      </div>

      {/* Upload PDF Section */}
      <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
        <h3 className="font-semibold mb-3">Upload PDF</h3>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileSelect}
        />
        <Button
          onClick={() => {
            setIsUploading(true)
            triggerFilePicker()
          }}
          disabled={isUploading}
        >
          {isUploading
            ? "Uploading..."
            : fileName
            ? `Selected: ${fileName}`
            : "Choose PDF"}
        </Button>
      </div>

      {/* AI Provider Selection */}
      <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
        <h3 className="font-semibold mb-2">Choose AI Provider</h3>
        <div className="flex flex-wrap gap-2">
          {PROVIDERS.map((prov) => (
            <button
              key={prov}
              onClick={() => {
                setAiProvider(prov)
                setModel(MODELS[prov][0])
              }}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition whitespace-nowrap",
                aiProvider === prov
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* Model Selection */}
      <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
        <h3 className="font-semibold mb-2">Choose Model</h3>
        <div className="flex flex-wrap gap-2">
          {MODELS[aiProvider].map((m) => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition whitespace-nowrap",
                model === m
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm text-center">
        <Button
          onClick={handleGenerate}
          disabled={!fileName}
        >
          Generate Tagged PDF
        </Button>
      </div>
    </div>
  )
}
