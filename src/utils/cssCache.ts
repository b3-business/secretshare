import { generateTailwindCSS } from "@bjesuiter/deno-tailwindcss-iso";
import { expandGlob, WalkEntry } from "@std/fs";

/**
 * A in-memory key-value storage for deno to cache postcss-transformed css files
 * Needed, bc. these files can't be written to /static, bc. deno deploy does not support writing files to it's file system
 * (it's read-only from the github repo)
 */

export const cssCache = new Map<string, string>();

/**
 * Intended to be used at server startup to compute the tailwind css "on the fly" instead of computed at build time
 * This removes the need for a build step for this app in github actions
 */
export async function computeTailwindStyles() {
  console.time("computeTailwindStyles");
  const css = `
  @import "tailwindcss";

  @theme {
    --color-primary: #60c0ff;
  }
  
  `;
  const content = await collectTailwindContent();

  const resultCss = await generateTailwindCSS({
    content: content,
    css: css,
  });

  cssCache.set("tailwind.css", resultCss);

  console.timeEnd("computeTailwindStyles");
  return resultCss;
}

async function collectTailwindContent() {
  console.time("collectTailwindContent");
  const globs = [
    "islands/**/*.tsx",
    "components/**/*.tsx",
    "routes/**/*.tsx",
    "routes/**/*.ts",
    "src/**/*.ts",
  ];

  const content = [];

  for (const glob of globs) {
    const files = expandGlob(glob, { root: Deno.cwd() });
    for await (const file of files) {
      if (file.isFile) {
        content.push(await Deno.readTextFile(file.path));
      }
    }
  }

  console.timeEnd("collectTailwindContent");
  return content.join("\n\n");
}
