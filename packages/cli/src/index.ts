import { Command } from "commander";
import pc from "picocolors";
import { createCommand } from "./commands/create";
const program = new Command();

console.log(
  pc.green(`
   ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
  ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
  ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║
  ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║
  ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║
   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝

                        ██████╗  ██████╗  ██████╗██╗  ██╗
                        ██╔══██╗██╔═══██╗██╔════╝██║ ██╔╝
                        ██║  ██║██║   ██║██║     █████╔╝
                        ██║  ██║██║   ██║██║     ██╔═██╗
                        ██████╔╝╚██████╔╝╚██████╗██║  ██╗
                        ╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝

                      ⚓ Your Component Library Scaffold Tool ⚓
  `),
);

program
  .name("component")
  .description("Component Dock - Create component libraries with shadcn")
  .version("0.0.1");

program
  .command("create <project-name>")
  .description("Create a new component library project")
  .option("--skip-install", "Skip installing dependencies")
  .action(createCommand);

program.parse();
