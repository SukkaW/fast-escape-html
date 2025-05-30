import { describe, it } from 'mocha';
import { expect } from 'expect';
import { unescapeHTML } from '.';

describe('unescape', () => {
  it('not html', () => {
    expect(unescapeHTML('https://skk.moe')).toStrictEqual('https://skk.moe');
  });

  it('correct unescape', () => {
    expect(unescapeHTML('&amp;&lt;&gt;&#39;&quot;&#60;&apos;')).toStrictEqual('&<>\'"<\'');
  });

  it('mixed', () => {
    expect(unescapeHTML('&lt;p class=&quot;foo&quot;&gt;Hello &quot;world&quot;.&lt;/p&gt;')).toStrictEqual('<p class="foo">Hello "world".</p>');
  });

  it('wrong sequence', () => {
    const fixture = '&&|&;;|&ll|&rr|&tt|&aa;|&amq;|&mm|&apo;|&m|&3|&u|&8|&6|&0';
    expect(unescapeHTML('&lt;' + fixture)).toStrictEqual('<' + fixture);
  });

  it('no potential XSS', () => {
    const unescaped = unescapeHTML('&amp;lt;script&amp;gt;alert("yo")&amp;lt;/script&amp;gt;');
    expect(unescaped).not.toContain('<script>');
    expect(unescaped).not.toContain('</script>');
  });
});
