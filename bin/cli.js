import { promises as fs } from 'fs';
import { loadDefinition } from '../utils.js';

import swaggerJsdoc from 'swagger-jsdoc';


const args = process.argv.slice(2);

const definition = args.splice(args.findIndex((i) => i === '--definition'),2)[1]
const output = args.splice(args.findIndex((i) => i === '--output'), 2)[1];

  // Because "Parsing error: Cannot use keyword 'await' outside an async function"
(async () => {
  /**
   * We're using an example module loader which you can swap with your own implemenentation.
   */
  const swaggerDefinition = await loadDefinition(definition);

  // Extract apis
  //remove --apis flag
  args.splice(0, 1);
  // the rest of this example can be treated as the contents of the --apis
  const apis = args;
  console.log(apis);
  // Use the library
  const spec = await swaggerJsdoc({ swaggerDefinition, apis });

  // Save specification place and format
  await fs.writeFile(output, JSON.stringify(spec));

  console.log('Specification has been created successfully!');
})();


