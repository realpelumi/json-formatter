"use client";

import { useState } from "react";
import Header from "@/components/header/header";
import EditorArea from "@/components/sections/editor-area";
import ActionButtons from "@/components/sections/action-buttons";
import Footer from "@/components/footer/footer";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [autoFormat, setAutoFormat] = useState(false);

  const getErrorLine = (msg: string): number | null => {
    // Chrome/V8: "Unexpected token } in JSON at position 123"
    const positionMatch = msg.match(/at position (\d+)/);
    if (positionMatch) {
      const position = parseInt(positionMatch[1], 10);
      return input.substring(0, position).split("\n").length;
    }

    // Other browsers/parsers might use line/column
    const lineMatch = msg.match(/line (\d+)/);
    if (lineMatch) {
      return parseInt(lineMatch[1], 10);
    }

    return null;
  };

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setInput(formatted); // Update input to formatted version too? Usually yes for "Format" button.
      setOutput(formatted);
      setError("");
      setErrorLine(null);
    } catch (err) {
      const msg = (err as Error).message;
      setError(`Invalid JSON: ${msg}`);
      setErrorLine(getErrorLine(msg));
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
      setErrorLine(null);
    } catch (err) {
      const msg = (err as Error).message;
      setError(`Invalid JSON: ${msg}`);
      setErrorLine(getErrorLine(msg));
    }
  };

  const validateJSON = () => {
    try {
      JSON.parse(input);
      setOutput("");
      setError("✓ Valid JSON");
      setErrorLine(null);
    } catch (err) {
      const msg = (err as Error).message;
      setError(`Invalid JSON: ${msg}`);
      setErrorLine(getErrorLine(msg));
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (!autoFormat) return;

    e.preventDefault();
    const text = e.clipboardData.getData("text");

    // Insert text at cursor position to support partial pasting,
    // although auto-format usually implies reformatting the whole doc.
    const textarea = e.target as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value;
    const newVal = current.substring(0, start) + text + current.substring(end);

    try {
      const parsed = JSON.parse(newVal);
      const formatted = JSON.stringify(parsed, null, 2);
      setInput(formatted);
      setOutput(formatted);
      setError("");
      setErrorLine(null);
    } catch (err) {
      // If invalid, just paste raw text
      setInput(newVal);
      // We could set error here, but maybe user is still typing
      setError("");
      setErrorLine(null);
    }
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  const downloadJSON = () => {
    if (output) {
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        `data:text/json;charset=utf-8,${encodeURIComponent(output)}`,
      );
      element.setAttribute("download", "output.json");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const useOutputAsInput = () => {
    setInput(output);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Action Buttons */}
          <ActionButtons
            onFormat={formatJSON}
            onMinify={minifyJSON}
            onValidate={validateJSON}
            onCopy={copyOutput}
            onDownload={downloadJSON}
            onUseOutput={useOutputAsInput}
          />

          {/* Error/Success Message */}
          {error && (
            <div
              className={`mb-6 p-4 rounded-lg text-sm font-medium flex items-center gap-2 ${
                error.includes("✓")
                  ? "bg-green-500/10 text-green-300 border border-green-500/30"
                  : "bg-red-500/10 text-red-300 border border-red-500/30"
              }`}
            >
              <span>{error}</span>
              {errorLine && (
                <span className="bg-red-500/20 px-2 py-0.5 rounded text-xs ml-auto border border-red-500/30">
                  Line {errorLine}
                </span>
              )}
            </div>
          )}

          {/* Editor Area */}
          <EditorArea
            input={input}
            output={output}
            onInputChange={setInput}
            onPaste={handlePaste}
            autoFormat={autoFormat}
            onAutoFormatChange={setAutoFormat}
            errorLine={errorLine}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
