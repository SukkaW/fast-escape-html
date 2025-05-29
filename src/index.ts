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
  for (; index < len; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
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
