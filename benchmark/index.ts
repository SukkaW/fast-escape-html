/* eslint-disable @typescript-eslint/no-restricted-imports -- benchmark */
import path from 'node:path';
import fs from 'node:fs';

import npmEscapeHtml from 'escape-html';
import { escape as htmlEscaper, unescape as htmlEscaperUnescape } from 'html-escaper';
import { htmlEscape as escapeGoat } from 'escape-goat';
import lodashEscape from 'lodash.escape';
import loadshUnescape from 'lodash.unescape';
import { escapeHTML as escapeHTMLRs } from '@napi-rs/escape';
import { unescapeHTML as hexoUtilUnescapeHtml } from 'hexo-util';

// import npmUnescapeHtml from 'unescape-html'; // not safe

// @ts-expect-error -- no types
import npmUnescape from 'unescape';

(async () => {
  const { bench, group, run } = await import('mitata');
  // eslint-disable-next-line import-x/no-unresolved -- only exist after build
  const { escapeHTML, unescapeHTML } = await import('../dist/es/index.mjs');

  const escapeFns = [
    ['fast-escape-html', escapeHTML],
    ['escape-html', npmEscapeHtml],
    ['@napi-rs/escape', escapeHTMLRs],
    ['html-escaper', htmlEscaper],
    ['lodash.escape', lodashEscape],
    ['escape-goat', escapeGoat]
  ] as const;
  const unescapeFns = [
    ['fast-escape-html', unescapeHTML],
    ['html-escaper', htmlEscaperUnescape],
    ['lodash.unescape', loadshUnescape],
    ['hexo-util', hexoUtilUnescapeHtml],
    ['unescape', npmUnescape]
  ] as const;

  const fixtures = [
    ['skk.moe', 'skk.moe.html'],
    ['github.com (incognito)', 'github.com.html'],
    ['stackoverflow.com (incognito)', 'stackoverflow.com.html'],
    ['www.google.com (incognito)', 'google.com.html'],
    ['about.gitlab.com', 'about.gitlab.com.html']
  ] as const;

  group('escape', () => {
    fixtures.forEach(([name, fixturePath]) => {
      group(name, () => {
        const fixture = fs.readFileSync(path.join(__dirname, './fixtures/', fixturePath), 'utf-8');
        escapeFns.forEach(([name, fn]) => {
          bench(name, () => fn(fixture));
        });
      });
    });
  });

  group('unescape', () => {
    fixtures.forEach(([name, fixturePath]) => {
      const fixture = fs.readFileSync(path.join(__dirname, './fixtures/', fixturePath), 'utf-8');
      const escaped = escapeHTML(fixture);

      group(name, () => {
        unescapeFns.forEach(([name, fn]) => {
          bench(name, () => fn(escaped));
        });
      });
    });
  });

  run();
})();
