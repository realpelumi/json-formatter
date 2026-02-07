'use client';

import { Button } from '@/components/ui/button'

interface ActionButtonsProps {
  onFormat: () => void
  onMinify: () => void
  onValidate: () => void
  onCopy: () => void
  onDownload: () => void
  onUseOutput: () => void
}

export default function ActionButtons({
  onFormat,
  onMinify,
  onValidate,
  onCopy,
  onDownload,
  onUseOutput,
}: ActionButtonsProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {/* Format & Minify & Validate Row */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={onFormat}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        >
          Format
        </Button>
        <Button
          onClick={onMinify}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        >
          Minify
        </Button>
        <Button
          onClick={onValidate}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        >
          Validate
        </Button>
      </div>

      {/* Copy & Download & Use Output Row */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={onCopy}
          variant="outline"
          className="border-border hover:bg-secondary text-foreground bg-transparent"
        >
          Copy Output
        </Button>
        <Button
          onClick={onDownload}
          variant="outline"
          className="border-border hover:bg-secondary text-foreground bg-transparent"
        >
          Download
        </Button>
        <Button
          onClick={onUseOutput}
          variant="outline"
          className="border-border hover:bg-secondary text-foreground bg-transparent"
        >
          Use Output as Input
        </Button>
      </div>
    </div>
  )
}
