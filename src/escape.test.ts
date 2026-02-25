import { describe, it } from 'mocha';
import { expect } from 'earl';
import { escapeHTML } from '.';

describe('escape', () => {
  it('not html', () => {
    expect(escapeHTML('https://skk.moe')).toEqual('https://skk.moe');
  });

  it('when string contains \'"\'', () => {
    expect(escapeHTML('"')).toEqual('&quot;');
    expect(escapeHTML('"bar')).toEqual('&quot;bar');
    expect(escapeHTML('foo"')).toEqual('foo&quot;');
    expect(escapeHTML('foo"bar')).toEqual('foo&quot;bar');
    expect(escapeHTML('foo""bar')).toEqual('foo&quot;&quot;bar');
  });

  it('when string contains "&"', () => {
    expect(escapeHTML('&')).toEqual('&amp;');
    expect(escapeHTML('&bar')).toEqual('&amp;bar');
    expect(escapeHTML('foo&')).toEqual('foo&amp;');
    expect(escapeHTML('foo&bar')).toEqual('foo&amp;bar');
    expect(escapeHTML('foo&&bar')).toEqual('foo&amp;&amp;bar');
  });

  it('when string contains "\'"', () => {
    expect(escapeHTML('\'')).toEqual('&#39;');
    expect(escapeHTML('\'bar')).toEqual('&#39;bar');
    expect(escapeHTML('foo\'')).toEqual('foo&#39;');
    expect(escapeHTML('foo\'bar')).toEqual('foo&#39;bar');
    expect(escapeHTML('foo\'\'bar')).toEqual('foo&#39;&#39;bar');
  });

  it('when string contains "<"', () => {
    expect(escapeHTML('<')).toEqual('&lt;');
    expect(escapeHTML('<bar')).toEqual('&lt;bar');
    expect(escapeHTML('foo<')).toEqual('foo&lt;');
    expect(escapeHTML('foo<bar')).toEqual('foo&lt;bar');
    expect(escapeHTML('foo<<bar')).toEqual('foo&lt;&lt;bar');
  });

  it('when string contains ">"', () => {
    expect(escapeHTML('>')).toEqual('&gt;');
    expect(escapeHTML('>bar')).toEqual('&gt;bar');
    expect(escapeHTML('foo>')).toEqual('foo&gt;');
    expect(escapeHTML('foo>bar')).toEqual('foo&gt;bar');
    expect(escapeHTML('foo>>bar')).toEqual('foo&gt;&gt;bar');
  });

  it('when escaped character mixed', () => {
    expect(escapeHTML('&foo <> bar "fizz" l\'a')).toEqual('&amp;foo &lt;&gt; bar &quot;fizz&quot; l&#39;a');
  });
});
