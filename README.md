# JSON Formatter

A powerful, modern, and easy-to-use JSON formatter and validator built with React, TypeScript, and Tailwind CSS.

## Features

- **Format JSON**: Prettify your JSON data with standard 2-space indentation.
- **Minify JSON**: Compress your JSON data by removing unnecessary whitespace.
- **Validate JSON**: Quickly check if your JSON string is valid.
- **Error Highlighting**: Instantly see where your JSON is invalid with error messages and line number highlighting.
- **Auto-format on Paste**: Optional setting to automatically format JSON when you paste it into the editor.
- **File Operations**:
  - **Copy Output**: One-click copy of the formatted/minified JSON.
  - **Download JSON**: Save the output as a `.json` file.
  - **Use Output as Input**: Easily move the processed JSON back to the input area for further editing.
- **Responsive Design**: Optimized for different screen sizes.
- **Modern UI**: Clean and intuitive interface with a professional Navy Blue and White color scheme.

## Tech Stack

- [React](https://react.dev/) - The library for web and native user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd json-formatter
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

5. Open your browser and visit `http://localhost:5173`.

## Usage

1. Paste your JSON code into the left input panel.
2. Use the **Format** button to prettify the JSON.
3. Use the **Minify** button to compress the JSON.
4. If there are errors, they will be displayed at the top with a link to the specific line number.
5. You can copy the result or download it as a file using the respective buttons in the toolbar.

## License

This project is licensed under the MIT License.
