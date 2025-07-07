import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";
import inquirer from "inquirer";
import ora from "ora";

interface CreateOptions {
  skipInstall?: boolean;
}

export async function createCommand(
  projectName: string,
  options: CreateOptions,
) {
  const spinner = ora();
  try {
    console.log(pc.blue(`🚀 Creating component library: ${projectName}\n`));

    const projectPath = path.join(process.cwd(), projectName);

    if (await fs.pathExists(projectPath)) {
      console.log(pc.red(`❌ Directory ${projectName} already exists`));
      return;
    }
    const config = await inquirer.prompt([
      {
        type: "input",
        name: "description",
        message: "Library description",
        default: `React component library for ${projectName}`,
      },
      {
        type: "list",
        name: "packageManager",
        message: "Choose package manager:",
        choices: ["npm", "yarn", "pnpm"],
        default: "npm",
      },
    ]);
    spinner.start("Creating project directory...");
    await fs.ensureDir(projectPath);
    spinner.succeed("Project directory created");

    spinner.start("Setting up project files...");
    await setupProjectFiles(projectPath, projectName, config);
    spinner.succeed("Project files created");

    console.log(pc.green("\n✨ Project created successfully!\n"));
    console.log(pc.blue("Next steps:"));
    console.log(pc.gray(`  cd ${projectName}/src/components/ui`));
    console.log(pc.gray("Add a component"));
    console.log(pc.gray(`  ${config.packageManager} install`));
    console.log(pc.gray(`  ${config.packageManager} run dev`));
  } catch (error: any) {
    spinner.fail("Failed to create project");
    console.error(pc.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

async function setupProjectFiles(
  projectPath: string,
  projectName: string,
  config: any,
) {
  // Create basic package.json
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    description: config.description,
    author: config.author,
    main: "dist/cjs/index.js",
    module: "dist/esm/index.js",
    types: "dist/index.d.ts",
    files: ["dist", "src"],
    scripts: {
      build: "rollup -c",
      dev: "rollup -c -w",
      lint: "eslint src --ext .ts,.tsx",
      "type-check": "tsc --noEmit",
      clean: "rm -rf dist",
    },
    peerDependencies: {
      react: ">=17.0.0",
      "react-dom": ">=17.0.0",
    },
    dependencies: {
      "@radix-ui/react-slot": "^1.0.2",
      "class-variance-authority": "^0.7.0",
      clsx: "^2.0.0",
      "tailwind-merge": "^2.2.0",
      "lucide-react": "^0.294.0",
      tslib: "^2.8.1",
    },
    devDependencies: {
      "@types/react": "^18.2.45",
      "@types/react-dom": "^18.2.18",
      "@rollup/plugin-commonjs": "^25.0.7",
      "@rollup/plugin-node-resolve": "^15.2.3",
      "@rollup/plugin-typescript": "^11.1.5",
      rollup: "^4.8.0",
      "rollup-plugin-dts": "^6.1.0",
      "rollup-plugin-peer-deps-external": "^2.2.4",
      "rollup-plugin-postcss": "^4.0.2",
      "@rollup/plugin-terser": "^0.4.4",
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      typescript: "^5.3.3",
      tailwindcss: "^3.4.0",
      postcss: "^8.4.32",
      autoprefixer: "^10.4.16",
    },
  };

  await fs.writeJson(path.join(projectPath, "package.json"), packageJson, {
    spaces: 2,
  });

  // Create Rollup configuration
  const rollupConfig = `import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig([
  // Main build (CJS + ESM)
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named'
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named'
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.*', '**/*.stories.*']
      }),
      postcss({
        extract: 'styles/globals.css',
        minimize: true,
        inject: false
      }),
      terser()
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime']
  },
  // Type definitions
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\\.css$/]
  }
]);
`;

  await fs.writeFile(path.join(projectPath, "rollup.config.js"), rollupConfig);

  // Create TypeScript configuration
  const tsConfig = `{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "react-jsx",
    "module": "ESNext",
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist/esm",
    "declarationDir": "dist/esm/types",
    "rootDir": "src"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.*",
    "**/*.stories.*"
  ]
}
`;

  await fs.writeFile(path.join(projectPath, "tsconfig.json"), tsConfig);

  // Create Tailwind configuration
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
    './stories/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
`;

  await fs.writeFile(
    path.join(projectPath, "tailwind.config.js"),
    tailwindConfig,
  );

  // Create PostCSS configuration
  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

  await fs.writeFile(
    path.join(projectPath, "postcss.config.js"),
    postcssConfig,
  );

  // Create basic src structure
  await fs.ensureDir(path.join(projectPath, "src/components/ui"));
  await fs.ensureDir(path.join(projectPath, "src/lib"));
  await fs.ensureDir(path.join(projectPath, "src/styles"));

  // Create basic index.ts
  const indexContent = `// Component library exports
export * from './components/ui';
export * from './lib/utils';
`;

  await fs.writeFile(path.join(projectPath, "src/index.ts"), indexContent);

  // Create utils file
  const utilsContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

  await fs.writeFile(path.join(projectPath, "src/lib/utils.ts"), utilsContent);

  // Create global styles
  const globalStyles = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;

  await fs.writeFile(
    path.join(projectPath, "src/styles/globals.css"),
    globalStyles,
  );

  // Create shadcn/ui components.json configuration
  const componentsConfig = `{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "./src/components/ui",
    "utils": "./src/lib/utils"
  }
}
`;

  await fs.writeFile(
    path.join(projectPath, "components.json"),
    componentsConfig,
  );

  // Create .gitignore
  const gitignore = `# Dependencies
node_modules/
.pnp
.pnp.js

# Production
/dist
/build

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Testing
coverage/
.nyc_output

# Storybook
.storybook/build

# Temporary folders
tmp/
temp/
`;

  await fs.writeFile(path.join(projectPath, ".gitignore"), gitignore);

  // Create README
  const readmeContent = `# ${projectName}

${config.description}

## Installation

\`\`\`bash
npm install ${projectName}
\`\`\`

## Usage

\`\`\`tsx
import { Button } from '${projectName}';

function App() {
  return <Button>Click me</Button>;
}
\`\`\`

## Development

\`\`\`bash
# Install dependencies
${config.packageManager} install

# Start development (watch mode)
${config.packageManager} run dev

# Build library
${config.packageManager} run build

# Type checking
${config.packageManager} run type-check

# Clean build files
${config.packageManager} run clean
\`\`\`

## Adding Components

Add shadcn/ui components to your library:

\`\`\`bash
# Add specific components
component add button input

# Interactive selection
component add --interactive
\`\`\`

## Building

The build produces:
- \`dist/cjs/\` - CommonJS modules
- \`dist/esm/\` - ES modules
- \`dist/index.d.ts\` - TypeScript declarations
- \`dist/styles/\` - CSS files

## Publishing

\`\`\`bash
npm run build
npm publish
\`\`\`
`;

  await fs.writeFile(path.join(projectPath, "README.md"), readmeContent);
}
