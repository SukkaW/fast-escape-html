/* eslint-disable @typescript-eslint/no-restricted-imports -- benchmark */
import path from 'node:path';
import fs from 'node:fs';

import npmEscapeHtml from 'escape-html';
import { escape as htmlEscaper } from 'html-escaper';
import { htmlEscape as escapeGoat } from 'escape-goat';
import lodashEscape from 'lodash.escape';
import { escapeHTML as escapeHTMLRs } from '@napi-rs/escape';

(async () => {
  const { bench, group, run } = await import('mitata');
  // eslint-disable-next-line import-x/no-unresolved -- only exist after build
  const { escapeHTML } = await import('../dist/es/index.mjs');

  const fns = [
    ['fast-escape-html', escapeHTML],
    ['escape-html', npmEscapeHtml],
    ['@napi-rs/escape', escapeHTMLRs],
    ['html-escaper', htmlEscaper],
    ['lodash.escape', lodashEscape],
    ['escape-goat', escapeGoat]
  ] as const;

  const fixtures = [
    ['skk.moe', 'skk.moe.html'],
    ['github.com (incognito)', 'github.com.html'],
    ['stackoverflow.com (incognito)', 'stackoverflow.com.html'],
    ['www.google.com (incognito)', 'google.com.html'],
    ['about.gitlab.com', 'about.gitlab.com.html']
  ] as const;

  fixtures.forEach(([name, fixturePath]) => {
    group(name, () => {
      const fixture = fs.readFileSync(path.join(__dirname, './fixtures/', fixturePath), 'utf-8');
      fns.forEach(([name, fn]) => {
        bench(name, () => fn(fixture));
      });
    });
  });

  run();
})();
