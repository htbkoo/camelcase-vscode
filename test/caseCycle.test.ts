import { describe, expect, it } from "vitest";
import {
  cycleText,
  DEFAULT_ORDER,
  formatWords,
  normalizeOrder,
  splitIntoWords,
} from "../src/caseCycle";

describe("splitIntoWords", () => {
  it("splits on hyphens, underscores, and spaces", () => {
    expect(splitIntoWords("foo-bar")).toEqual(["foo", "bar"]);
    expect(splitIntoWords("foo_bar")).toEqual(["foo", "bar"]);
    expect(splitIntoWords("foo bar")).toEqual(["foo", "bar"]);
  });

  it("splits camelCase and PascalCase", () => {
    expect(splitIntoWords("fooBar")).toEqual(["foo", "bar"]);
    expect(splitIntoWords("FooBar")).toEqual(["foo", "bar"]);
  });

  it("handles acronyms followed by words", () => {
    expect(splitIntoWords("URLParser")).toEqual(["url", "parser"]);
  });

  it("returns empty for blank", () => {
    expect(splitIntoWords("")).toEqual([]);
    expect(splitIntoWords("   ")).toEqual([]);
  });
});

describe("formatWords", () => {
  const w = ["foo", "bar"];

  it("formats each variant", () => {
    expect(formatWords(w, "kebab")).toBe("foo-bar");
    expect(formatWords(w, "snake")).toBe("foo_bar");
    expect(formatWords(w, "screaming")).toBe("FOO_BAR");
    expect(formatWords(w, "space")).toBe("foo bar");
    expect(formatWords(w, "camel")).toBe("fooBar");
    expect(formatWords(w, "pascal")).toBe("FooBar");
  });
});

describe("normalizeOrder", () => {
  it("filters unknown ids and duplicates", () => {
    expect(normalizeOrder(["camel", "bogus", "camel", "pascal"])).toEqual([
      "camel",
      "pascal",
    ]);
  });

  it("falls back to default when empty", () => {
    expect(normalizeOrder([])).toEqual(DEFAULT_ORDER);
    expect(normalizeOrder(["nope"])).toEqual(DEFAULT_ORDER);
  });
});

describe("cycleText", () => {
  const order = DEFAULT_ORDER;

  it("cycles from kebab to screaming", () => {
    expect(cycleText("foo-bar", order)?.next).toBe("FOO_BAR");
  });

  it("cycles screaming to pascal", () => {
    expect(cycleText("FOO_BAR", order)?.next).toBe("FooBar");
  });

  it("wraps to start of order", () => {
    const last = order[order.length - 1]!;
    const lastFormatted = formatWords(["a", "b"], last);
    expect(cycleText(lastFormatted, order)?.next).toBe(
      formatWords(["a", "b"], order[0]!)
    );
  });

  it("applies first format when no variant matches", () => {
    expect(cycleText("fooBar", order)?.next).toBe("foo-bar");
  });

  it("returns null for empty", () => {
    expect(cycleText("", order)).toBeNull();
    expect(cycleText("   ", order)).toBeNull();
  });

  it("respects custom order", () => {
    const custom = ["camel", "pascal"] as const;
    expect(cycleText("fooBar", [...custom])?.next).toBe("FooBar");
    expect(cycleText("FooBar", [...custom])?.next).toBe("fooBar");
  });
});
