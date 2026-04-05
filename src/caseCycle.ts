export const FORMAT_IDS = [
  "kebab",
  "screaming",
  "pascal",
  "camel",
  "snake",
  "space",
] as const;

export type FormatId = (typeof FORMAT_IDS)[number];

/** Default cycle matches JetBrains Camel Case Plugin ordering. */
export const DEFAULT_ORDER: FormatId[] = [...FORMAT_IDS];

const FORMAT_SET = new Set<string>(FORMAT_IDS);

export function normalizeOrder(raw: string[]): FormatId[] {
  const out: FormatId[] = [];
  for (const id of raw) {
    if (FORMAT_SET.has(id) && !out.includes(id as FormatId)) {
      out.push(id as FormatId);
    }
  }
  return out.length > 0 ? out : [...DEFAULT_ORDER];
}

/**
 * Split an identifier into lowercase word parts for formatting.
 * Uses explicit separators first; otherwise camel / Pascal boundaries.
 */
export function splitIntoWords(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) {
    return [];
  }

  if (/[_\s-]/.test(trimmed)) {
    return trimmed
      .split(/[_\s-]+/)
      .map((w) => w.toLowerCase())
      .filter(Boolean);
  }

  const spaced = trimmed
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");

  return spaced
    .split(/\s+/)
    .map((w) => w.toLowerCase())
    .filter(Boolean);
}

export function formatWords(words: string[], id: FormatId): string {
  if (words.length === 0) {
    return "";
  }

  switch (id) {
    case "kebab":
      return words.map((w) => w.toLowerCase()).join("-");
    case "snake":
      return words.map((w) => w.toLowerCase()).join("_");
    case "screaming":
      return words.map((w) => w.toUpperCase()).join("_");
    case "space":
      return words.map((w) => w.toLowerCase()).join(" ");
    case "pascal":
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("");
    case "camel":
      return words
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join("");
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

function findCurrentIndex(
  trimmed: string,
  words: string[],
  order: FormatId[]
): number {
  for (let i = 0; i < order.length; i++) {
    if (formatWords(words, order[i]!) === trimmed) {
      return i;
    }
  }
  return -1;
}

export interface CycleResult {
  next: string;
}

/**
 * Returns the next string in the cycle for the given text and order.
 * If the text does not match any variant, applies the first format in order.
 */
export function cycleText(text: string, order: FormatId[]): CycleResult | null {
  const trimmed = text.trim();
  if (!trimmed || order.length === 0) {
    return null;
  }

  const words = splitIntoWords(trimmed);
  if (words.length === 0) {
    return null;
  }

  const idx = findCurrentIndex(trimmed, words, order);
  const nextIdx = idx < 0 ? 0 : (idx + 1) % order.length;
  const next = formatWords(words, order[nextIdx]!);
  return { next };
}
