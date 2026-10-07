// @ts-nocheck
import path from 'node:path';
import { validateContentRoot } from './validate-content.mjs';

const projectRoot = path.resolve(process.cwd());
const contentRoot = path.join(projectRoot, 'BAB-tutorials');
const result = await validateContentRoot(contentRoot, projectRoot);

if (result.errors.length) {
  console.error(result.errors.join('\n'));
  process.exit(1);
}

console.log(`BAB tutorials already use the canonical Markdown library: ${result.files.length} files in ${contentRoot}.`);
