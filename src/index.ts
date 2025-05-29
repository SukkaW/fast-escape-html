const reHtmlEntity = /["&'<>]/;
export function escapeHTML(str: string) {
  const match = reHtmlEntity.exec(str);

  if (match === null) { // faster than !match since no type conversion
    return str;
  }

  let escape = '';
  let html = '';

  let index = match.index;
  let lastIndex = 0;
  const len = str.length;

  // iterate from the first match

  /**
   * Adjust order for commonly seen symbols:
   * Take https://tc39.es/ecma262 as an example,
   *
   * < 369266
   * > 369296, though sometimes it is more common, it alomost always comes after <
   * " 277105, people seems always prefer " over ' in HTML
   * ' 484, less often, but sometimes is used for attribute anyway
   * & 4424
   */

  for (; index < len; index++) {
    switch (str.charCodeAt(index)) {
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      case 34: // "
        escape = '&quot;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.slice(lastIndex, index);
    }
    html += escape;

    lastIndex = index + 1;
  }

  if (lastIndex !== index) {
    html += str.slice(lastIndex, index);
  }

  return html;
}
