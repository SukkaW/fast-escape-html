/* eslint-disable @typescript-eslint/no-restricted-imports -- benchmark */
import path from 'node:path';
import fs from 'node:fs';

import { escapeHTML } from '../src';
import npmEscapeHtml from 'escape-html';
import { escape as htmlEscaper } from 'html-escaper';
import { htmlEscape as escapeGoat } from 'escape-goat';
import lodashEscape from 'lodash.escape';
import { escapeHTML as escapeHTMLRs } from '@napi-rs/escape';

(async () => {
  const { bench, group, run } = await import('mitata');

  const fns = [
    ['fast-escape-html', escapeHTML],
    ['escape-html', npmEscapeHtml],
    ['html-escaper', htmlEscaper],
    ['escape-goat', escapeGoat],
    ['lodash.escape', lodashEscape],
    ['@napi-rs/escape', escapeHTMLRs]
  ] as const;

  group('skk.moe', () => {
    const fixture = fs.readFileSync(path.join(__dirname, './fixtures/skk.moe.html'), 'utf-8');

    fns.forEach(([name, fn]) => {
      bench(name, () => fn(fixture));
    });
  });

  group('github.com (incognito)', () => {
    const fixture = fs.readFileSync(path.join(__dirname, './fixtures/github.com.html'), 'utf-8');

    fns.forEach(([name, fn]) => {
      bench(name, () => fn(fixture));
    });
  });

  run();
})();
