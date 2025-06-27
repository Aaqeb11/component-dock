# 🚀 UI Starter - Component Library Scaffolding Tool

> Create professional React component libraries with shadcn/ui integration in seconds

## ✨ What is UI Starter?

UI Starter is a powerful CLI tool that scaffolds complete React component libraries with professional build setups, TypeScript support, and seamless shadcn/ui integration. Unlike traditional component libraries where you import pre-built components, UI Starter gives users **full source code ownership** and control.

### 🎯 Perfect For:
- **Enterprise teams** building design systems
- **Startups** needing professional component libraries fast
- **Agencies** creating custom design systems for clients
- **Developers** who want full control over their components

## 🌟 Key Features

### 🏗️ **Complete Scaffolding**
- Professional monorepo setup with TypeScript, Rollup, and Tailwind
- Storybook integration for component development
- Jest + Testing Library for comprehensive testing
- ESLint + Prettier for code quality

### 🎨 **shadcn/ui Integration**
- Add any shadcn/ui component with `ui-cli add button`
- Interactive component selection with categorized lists
- Automatic dependency management and export updates
- Support for all package managers (npm, yarn, pnpm, bun)

### 🔧 **Full Source Control**
- Users get **complete source code** in their repository
- Modify, extend, and customize any component
- Publish as their own component library
- Professional build system included

### ⚡ **Developer Experience**
- Zero configuration - works out of the box
- Package manager auto-detection
- Interactive CLI with beautiful prompts
- Comprehensive error handling and validation

## 🚀 Quick Start

### Installation
```bash
# Create a new component library
npx @yourname/ui-starter create my-design-system

# Navigate to your new library
cd my-design-system

# Install dependencies
npm install

# Start development
npm run dev
```

### Add Components
```bash
# Add specific components
ui-cli add button input card

# Interactive selection
ui-cli add --interactive

# Add all available components
ui-cli add --all
```

### Build & Publish
```bash
# Build your library
npm run build

# Test with Storybook
npm run storybook

# Publish to npm
npm publish
```

## 📦 What You Get

When you create a project with UI Starter, you get a complete, production-ready component library:

```
my-design-system/
├── src/
│   ├── components/ui/          # 🎨 shadcn/ui components (editable)
│   │   ├── button/
│   │   │   ├── button.tsx      # ✅ Full source code
│   │   │   ├── button.stories.tsx
│   │   │   ├── button.test.tsx
│   │   │   └── index.ts
│   │   └── index.ts            # 📤 Auto-managed exports
│   ├── lib/                    # 🛠️ Utility functions
│   ├── hooks/                  # 🎣 Custom React hooks
│   └── index.ts                # 📦 Main library export
├── stories/                    # 📖 Storybook stories
├── tests/                      # 🧪 Test files
├── docs/                       # 📚 Documentation
├── dist/                       # 📦 Built library
├── .storybook/                 # ⚙️ Storybook config
├── rollup.config.js            # 🔧 Professional build setup
├── package.json                # 📋 Ready for publishing
├── tsconfig.json               # 📘 TypeScript configuration
├── tailwind.config.js          # 🎨 Tailwind setup
└── README.md                   # 📖 Your library docs
```

## 🎨 Component Library Features

### Built-in Components
Your scaffolded library comes with:
- **Button** - Multiple variants (default, outline, ghost, etc.)
- **Input** - Form input with validation support
- **Card** - Content containers with headers and footers

### Professional Build System
- **Multiple formats**: CommonJS, ES Modules, and UMD
- **TypeScript declarations**: Full type support for consumers
- **CSS extraction**: Optimized stylesheets
- **Tree shaking**: Optimal bundle sizes
- **Source maps**: Enhanced debugging experience

### Development Tools
- **Storybook**: Interactive component playground
- **Jest + RTL**: Comprehensive testing setup
- **ESLint + Prettier**: Code quality and formatting
- **Rollup**: Professional bundling and optimization

## 🛠️ Commands

### `ui-starter create <name>`
Creates a new component library project.

```bash
ui-starter create my-awesome-ui
```

**Options:**
- `--skip-install` - Skip dependency installation
- `--skip-git` - Skip git repository initialization
- `--template <name>` - Use specific template (default: 'base')

### `ui-cli add <components...>`
Adds shadcn/ui components to your library.

```bash
# Add specific components
ui-cli add button input dialog

# Interactive mode
ui-cli add --interactive

# Add all components
ui-cli add --all
```

### `ui-cli init`
Initialize an existing project as a component library.

```bash
ui-cli init
```

## 🏗️ Project Structure

### CLI Development Structure
```
ui-starter-project/
├── packages/
│   ├── cli/                    # Main CLI tool
│   │   ├── src/
│   │   │   ├── commands/       # CLI commands
│   │   │   ├── utils/          # Utility functions
│   │   │   ├── templates/      # Project templates
│   │   │   └── index.ts        # CLI entry point
│   │   ├── package.json
│   │   └── rollup.config.js
│   └── docs/                   # Documentation
├── examples/                   # Example projects
├── tests/                      # Integration tests
├── package.json                # Monorepo config
└── pnpm-workspace.yaml
```

## 🔧 Development Setup

### Prerequisites
- Node.js 16+
- npm, yarn, pnpm, or bun

### Setup
```bash
# Clone the repository
git clone https://github.com/yourname/ui-starter.git
cd ui-starter

# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Link for local testing
cd packages/cli
npm link

# Test the CLI
ui-starter --help
```

### Testing Your Changes
```bash
# Create a test project
mkdir test-projects
cd test-projects
ui-starter create test-library

# Test component addition
cd test-library
ui-cli add button input
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`pnpm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📚 Examples

### Enterprise Design System
```bash
# Create a design system for your company
ui-starter create acme-design-system
cd acme-design-system

# Add core components
ui-cli add button input card dialog badge avatar

# Customize components for your brand
# Edit src/components/ui/button/button.tsx

# Build and publish
npm run build
npm publish @acme/design-system
```

### Agency Client Project
```bash
# Create custom library for client
ui-starter create client-ui-library
cd client-ui-library

# Add required components
ui-cli add --interactive

# Customize styling and branding
# Build client-specific component library
npm run build
```

## 🎯 Use Cases

### 🏢 **Enterprise Teams**
- Create consistent design systems across products
- Full customization and branding control
- Professional development and build tooling
- Easy onboarding for new team members

### 🚀 **Startups**
- Quick professional component library setup
- Focus on product, not tooling configuration
- Scale from MVP to enterprise-grade
- Cost-effective design system solution

### 🎨 **Design Agencies**
- Rapid client project initialization
- Custom design system for each client
- Professional deliverables
- Easy handoff to client development teams

### 👨‍💻 **Individual Developers**
- Learn component library best practices
- Build portfolio-worthy projects
- Professional development setup
- Publish open-source libraries

## 🔮 Roadmap

### Phase 1: Core Features ✅
- [x] Project scaffolding
- [x] shadcn/ui integration
- [x] Package manager support
- [x] Basic build system

### Phase 2: Enhanced DX 🚧
- [ ] Design token integration
- [ ] Custom variant system
- [ ] Visual component customizer
- [ ] Theme management

### Phase 3: Advanced Features 🔮
- [ ] Multi-framework support (Vue, Svelte)
- [ ] Visual component builder
- [ ] Design system analytics
- [ ] Automated updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component foundation
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling
- [Rollup](https://rollupjs.org/) for the excellent bundling system

## 📞 Support

- 📖 [Documentation](https://ui-starter.dev)
- 💬 [Discord Community](https://discord.gg/ui-starter)
- 🐛 [Issue Tracker](https://github.com/yourname/ui-starter/issues)
- 📧 [Email Support](mailto:support@ui-starter.dev)

---

<div align="center">

**[Website](https://ui-starter.dev)** • **[Documentation](https://docs.ui-starter.dev)** • **[Examples](https://examples.ui-starter.dev)** • **[Discord](https://discord.gg/ui-starter)**

Made with ❤️ by [Your Name](https://github.com/yourname)

</div>
