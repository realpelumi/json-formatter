"use client";

import { useRef, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface EditorAreaProps {
  input: string;
  output: string;
  onInputChange: (value: string) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  autoFormat: boolean;
  onAutoFormatChange: (checked: boolean) => void;
  errorLine: number | null;
}

export default function EditorArea({
  input,
  output,
  onInputChange,
  onPaste,
  autoFormat,
  onAutoFormatChange,
  errorLine,
}: EditorAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (errorLine && textareaRef.current) {
      const textarea = textareaRef.current;
      const lines = input.split("\n");
      // line is 1-indexed usually in error messages
      const lineIndex = errorLine - 1;

      if (lineIndex >= 0 && lineIndex < lines.length) {
        // Calculate start and end positions
        let start = 0;
        for (let i = 0; i < lineIndex; i++) {
          start += lines[i].length + 1; // +1 for newline
        }
        const end = start + lines[lineIndex].length;

        textarea.focus();
        textarea.setSelectionRange(start, end);

        // Scroll to the line (approximate)
        const lineHeight = 20; // approximate line height in px
        textarea.scrollTop = lineIndex * lineHeight - textarea.clientHeight / 2;
      }
    }
  }, [errorLine, input]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Editor */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-semibold text-muted-foreground">
            Input JSON
          </label>
          <div className="flex items-center gap-2">
            <Switch
              id="auto-format"
              checked={autoFormat}
              onCheckedChange={onAutoFormatChange}
            />
            <Label
              htmlFor="auto-format"
              className="text-xs font-normal text-muted-foreground cursor-pointer"
            >
              Auto-format on paste
            </Label>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onPaste={onPaste}
          placeholder="Paste your JSON here..."
          className="flex-1 min-h-[500px] w-full p-4 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent font-mono text-sm resize-none leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Output Editor */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-muted-foreground mb-3 block">
          Output JSON
        </label>
        <textarea
          value={output}
          readOnly
          placeholder="Output will appear here..."
          className="flex-1 min-h-[500px] w-full p-4 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none font-mono text-sm resize-none cursor-default leading-relaxed"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
