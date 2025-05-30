const reHtmlEntityGlobal = /&(?:[gl]t|quot|#39|amp|#6[02]|#34|apos|#38);/g;
const unescapeEntityMap: Record<string, string> = Object.create(null);

unescapeEntityMap['&lt;'] = '<';
unescapeEntityMap['&gt;'] = '>';
unescapeEntityMap['&quot;'] = '"';
unescapeEntityMap['&#39;'] = '\'';
unescapeEntityMap['&amp;'] = '&';
unescapeEntityMap['&#60;'] = '<';
unescapeEntityMap['&#62;'] = '>';
unescapeEntityMap['&#34;'] = '"';
unescapeEntityMap['&apos;'] = '\'';
unescapeEntityMap['&#38;'] = '&';

const replacer = (match: string) => unescapeEntityMap[match];

// eslint-disable-next-line @typescript-eslint/unbound-method -- cache prototype look up
const StringPrototypeReplace = String.prototype.replace;

export function unescapeHTML(str: string) {
  return StringPrototypeReplace.call(str, reHtmlEntityGlobal, replacer);
}
