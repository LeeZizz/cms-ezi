export function getBaseHref() {
  const baseElements = document.getElementsByTagName('base');
  if (baseElements.length > 0) {
    return baseElements[0].getAttribute('href');
  }
  return '/';
}

export function pathJoin(parts: string[], sep: string = '/') {
  const separator = sep || '/';
  const resultParts = parts.map((part, index) => {
    if (index) {
      part = part.replace(new RegExp('^' + separator), '');
    }
    if (index !== parts.length - 1) {
      part = part.replace(new RegExp(separator + '$'), '');
    }
    return part;
  });
  return resultParts.join(separator);
}

export function slugify(str) {
  str = str.trim().toLowerCase();
  // Remove accents
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\œ/g, 'oe').replace(/\æ/g, 'ae').normalize('NFC');
  // Strip html tags
  str = str.replace(/<[^>]*>/g, '');
  return str.replace(/\s+|\.+|\/+|\\+|—+|–+/g, '-').replace(/[^\w0-9\-]+/g, '').replace(/-{2,}/g, '-').replace(/^-|-$/g, '');
}

export function short(str: string, maxLength: number) {
  return str.slice(0, maxLength);
}
