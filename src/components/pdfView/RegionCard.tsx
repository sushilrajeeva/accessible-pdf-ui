// src/components/pdfView/RegionCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export type Region = {
  page: number
  type: string
  bbox: number[]
  content: string
  tag: string
}

type Props = {
  region: Region
}

export default function RegionCard({ region }: Props) {
  return (
    <Card className="mb-4 bg-gray-800 text-gray-100">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-sm uppercase text-blue-400">
          AI Tag: {region.tag}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div>
          <span className="font-medium text-green-300">Page:</span> {region.page}
        </div>
        <div>
          <span className="font-medium text-green-300">Type:</span> {region.type}
        </div>
        <div>
          <span className="font-medium text-green-300">Content:</span>
          <p className="mt-1 px-2 py-1 bg-gray-700 rounded">{region.content}</p>
        </div>
        <div>
          <span className="font-medium text-green-300">BBox:</span>
          <code className="block mt-1 px-2 py-1 bg-gray-700 rounded">
            [{region.bbox.map((n) => n.toFixed(1)).join(", ")}]
          </code>
        </div>
      </CardContent>
    </Card>
  )
}
