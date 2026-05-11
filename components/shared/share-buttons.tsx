"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, Share2, Twitter, Linkedin } from "lucide-react"

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const fullUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${url}`
    : `https://graduatescorner.com${url}`

  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy", err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
        })
      } catch (err) {
        console.error("Error sharing", err)
      }
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
      
      {typeof navigator !== "undefined" && navigator.share && (
        <Button variant="outline" size="sm" onClick={handleNativeShare} className="gap-2">
          <Share2 className="h-4 w-4" /> Share
        </Button>
      )}

      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Twitter className="h-4 w-4" /> Twitter
        </Button>
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Linkedin className="h-4 w-4" /> LinkedIn
        </Button>
      </a>

      <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  )
}
