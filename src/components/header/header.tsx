export default function Header() {
  return (
    <header className="bg-card border-b border-border py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-3">
              JSON Formatter & Validator
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground text-balance">
              Format, minify, and validate your JSON instantly
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
