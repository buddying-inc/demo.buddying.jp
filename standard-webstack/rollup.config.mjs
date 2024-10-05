import ejs from 'ejs';
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import sass from 'rollup-plugin-sass';

export default {
  input: 'main.js',
  context: 'window',
  output: [
    {
      file: 'dist/js/index.js',
      format: 'esm',
    },
  ],
  plugins: [
    {
      name: 'ejs-compiler',
      async buildStart () {
        const baseDir = 'src/templates/';
        const distDir = 'dist/';

        const ejsPaths = await glob(baseDir + '**/*.ejs', {
          ignore: baseDir + 'includes/**/*.ejs'
        });
        ejsPaths.forEach(ejsPath => {
          const template = fs.readFileSync(ejsPath, 'UTF-8');
          const compiled = ejs.compile(template, { filename: ejsPath });

          const distPath = distDir + path.relative(baseDir, ejsPath).replaceAll('.ejs', '.html');
          if (! fs.existsSync(path.dirname(distPath))) {
            fs.mkdirSync(path.dirname(distPath), { recursive: true });
          }

          fs.writeFileSync(distPath, compiled());
        });
      },
    },
    sass({
      output: 'dist/css/style.css',
      options: {
        outputStyle: 'compressed',
      },
    }),
  ],
};
