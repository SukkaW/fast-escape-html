import { describe, it } from 'mocha';
import { expect } from 'expect';
import { escapeHTML } from '.';

describe('escape-html', () => {
  describe('not html', () => {
    expect(escapeHTML('https://skk.moe')).toStrictEqual('https://skk.moe');
  });

  describe('when string contains \'"\'', () => {
    expect(escapeHTML('"')).toStrictEqual('&quot;');
    expect(escapeHTML('"bar')).toStrictEqual('&quot;bar');
    expect(escapeHTML('foo"')).toStrictEqual('foo&quot;');
    expect(escapeHTML('foo"bar')).toStrictEqual('foo&quot;bar');
    expect(escapeHTML('foo""bar')).toStrictEqual('foo&quot;&quot;bar');
  });

  describe('when string contains "&"', () => {
    expect(escapeHTML('&')).toStrictEqual('&amp;');
    expect(escapeHTML('&bar')).toStrictEqual('&amp;bar');
    expect(escapeHTML('foo&')).toStrictEqual('foo&amp;');
    expect(escapeHTML('foo&bar')).toStrictEqual('foo&amp;bar');
    expect(escapeHTML('foo&&bar')).toStrictEqual('foo&amp;&amp;bar');
  });

  describe('when string contains "\'"', () => {
    expect(escapeHTML('\'')).toStrictEqual('&#39;');
    expect(escapeHTML('\'bar')).toStrictEqual('&#39;bar');
    expect(escapeHTML('foo\'')).toStrictEqual('foo&#39;');
    expect(escapeHTML('foo\'bar')).toStrictEqual('foo&#39;bar');
    expect(escapeHTML('foo\'\'bar')).toStrictEqual('foo&#39;&#39;bar');
  });

  it('when string contains "<"', () => {
    expect(escapeHTML('<')).toStrictEqual('&lt;');
    expect(escapeHTML('<bar')).toStrictEqual('&lt;bar');
    expect(escapeHTML('foo<')).toStrictEqual('foo&lt;');
    expect(escapeHTML('foo<bar')).toStrictEqual('foo&lt;bar');
    expect(escapeHTML('foo<<bar')).toStrictEqual('foo&lt;&lt;bar');
  });

  it('when string contains ">"', () => {
    expect(escapeHTML('>')).toStrictEqual('&gt;');
    expect(escapeHTML('>bar')).toStrictEqual('&gt;bar');
    expect(escapeHTML('foo>')).toStrictEqual('foo&gt;');
    expect(escapeHTML('foo>bar')).toStrictEqual('foo&gt;bar');
    expect(escapeHTML('foo>>bar')).toStrictEqual('foo&gt;&gt;bar');
  });

  it('when escaped character mixed', () => {
    expect(escapeHTML('&foo <> bar "fizz" l\'a')).toStrictEqual('&amp;foo &lt;&gt; bar &quot;fizz&quot; l&#39;a');
  });
});
