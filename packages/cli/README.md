# Component Dock ⚓

> Your Component Library Scaffold Tool

Component Dock is a powerful CLI tool that helps you quickly scaffold modern React component libraries with shadcn/ui integration, TypeScript support, and production-ready build configuration.

## ✨ Features

- 🚀 **Quick Setup** - Create a complete component library in seconds
- 📦 **Dual Package Support** - Builds both CommonJS and ESM formats
- 🔧 **TypeScript Ready** - Full TypeScript support with proper declarations
- 🎭 **Tailwind CSS** - Pre-configured with custom design tokens
- 📱 **Modern Build Stack** - Rollup, PostCSS, and optimized bundling
- 🎯 **Interactive Setup** - Guided project configuration
- 📖 **Complete Documentation** - Generated README and usage examples

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g component-dock
```

### NPX Usage (No Installation Required)

```bash
npx component-dock create my-library
```

## 🚀 Quick Start

### Create a New Component Library

```bash
component create my-awesome-library
```

The CLI will guide you through an interactive setup:

```
🚀 Creating component library: my-awesome-library

? Library description: A collection of awesome React components
? Choose package manager: npm
```

### Project Structure Created

```
my-awesome-library/
├── src/
│   ├── components/
│   │   └── ui/           # shadcn/ui components go here
│   ├── lib/
│   │   └── utils.ts      # Utility functions (cn helper)
│   ├── styles/
│   │   └── globals.css   # Global styles and CSS variables
│   └── index.ts          # Main export file
├── dist/                 # Built files (generated)
│   ├── cjs/             # CommonJS build
│   ├── esm/             # ES Modules build
│   ├── styles/          # Compiled CSS
│   └── index.d.ts       # Type declarations
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
├── rollup.config.js      # Build configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── components.json       # shadcn/ui configuration
└── README.md            # Project documentation
```

## 🛠️ Usage

### Available Commands

```bash
# Create a new component library
component create <project-name>

# Create with options
component create my-library --skip-install

# Show help
component --help

# Show version
component --version
```

### Command Options

#### `create <project-name>`

Creates a new component library project.

**Options:**
- `--skip-install` - Skip automatic dependency installation

**Example:**
```bash
component create design-system --skip-install
```

## 🏗️ Development Workflow

After creating your library, navigate to the project directory and start developing:

```bash
cd my-awesome-library

# Install dependencies (if not already installed)
npm install

# Start development with watch mode
npm run dev

# Build the library
npm run build

# Type checking
npm run type-check

# Clean build artifacts
npm run clean
```

## 📚 Adding Components

Your project comes pre-configured for shadcn/ui components. Add components to your library:

```bash
# Add specific components
npx shadcn-ui@latest add button input

# Interactive component selection
npx shadcn-ui@latest add
```

Components will be automatically added to `src/components/ui/` and you can export them from your main `index.ts` file.

## 🔧 Configuration

### Package.json Scripts

The generated project includes these npm scripts:

```json
{
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist"
  }
}
```

### Build Output

The build process generates:

- **`dist/cjs/`** - CommonJS modules for Node.js compatibility
- **`dist/esm/`** - ES modules for modern bundlers
- **`dist/index.d.ts`** - TypeScript declaration files
- **`dist/styles/`** - Compiled CSS files

### Dependencies Included

Your component library comes with:

**Runtime Dependencies:**
- `@radix-ui/react-slot` - Primitive components
- `class-variance-authority` - Variant API for components
- `clsx` - Conditional className utility
- `tailwind-merge` - Tailwind class merging
- `lucide-react` - Icon library
- `tslib` - TypeScript runtime helpers

**Development Dependencies:**
- Full TypeScript support
- Rollup build configuration
- Tailwind CSS with plugins
- ESLint setup

## 📖 Usage in Projects

After building and publishing your library:

```bash
npm install my-awesome-library
```

```tsx
import { Button, Input } from 'my-awesome-library';
import 'my-awesome-library/dist/styles/globals.css';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text..." />
    </div>
  );
}
```

## 🚀 Publishing

```bash
# Build your library
npm run build

# Publish to npm
npm publish
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/aaqeb11/component-dock.git

# Install dependencies
npm install

# Link for local development
npm link

# Test the CLI
component create test-library
```

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - For the amazing component system
- [Radix UI](https://www.radix-ui.com/) - For accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework

---

**Component Dock** - ⚓ Scaffold your component libraries with confidence
