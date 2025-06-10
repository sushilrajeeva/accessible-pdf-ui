// src/components/GenerateDialog.tsx
import { useState, useEffect } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { Terminal } from "lucide-react"

import type { GenerateDialogProps } from "@/models/GenerateDialogProps"
import type { TagResponse } from "@/models/TagResponse"

import { generatePdf } from "@/lib/api"

export default function GenerateDialog({ triggerLabel = "Generate PDF", data, }: GenerateDialogProps<TagResponse>) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [json, setJson] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open && data) {
        setLoading(true)
        setError(null)
        // Kick off API call
        const apiCall = generatePdf(data).then(
            (blob) => {
                console.log("Recieved PDF blob: ", blob)
            }
        ).catch(
            (error) => {
                console.error("Generate PDF failed: ", error)
                setError(error?.message || "Something went wrong!")
            }
        )

        // Minimum Sekeleton Delay
        const minDelay = new Promise((res) => setTimeout(res, 1000))

        // Race loader against API to hide skeleton early if either finishes
        Promise.race([apiCall, minDelay]).then(
            () => {
                setJson(data ? JSON.stringify(data, null, 2) : "No data available.")
                setLoading(false)
            }
        )

        console.log("Export payload: ", data);
    }
  }, [open, data])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto mb-4">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-start justify-between">
          <div>
            <DialogTitle>Generated JSON Preview</DialogTitle>
            <DialogDescription>
                This is the payload you would send to the backend for PDF generation.
            </DialogDescription>
          </div>
          
        </DialogHeader>
        <div className="h-64 overflow-auto bg-gray-900 p-4 rounded-lg">
          {error ? (
            <div className="h-full flex items-center justify-center">
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Something went wrong</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
          ) : loading ? (
                <div className="space-y-2">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                </div>
            ) : (
                <pre className="text-xs text-white whitespace-pre-wrap">{json}</pre>
        )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}