import { describe, expect, it } from "vitest";

import { escape, fold, vcard } from "@/lib/vcard";

const unfold = (text: string) => text.replace(/\r\n /g, "");

describe("escape", () => {
  it("escapes the backslash first, so it doesn't escape its own escapes", () => {
    expect(escape("a\\b,c;d\ne")).toBe("a\\\\b\\,c\\;d\\ne");
  });
});

describe("fold", () => {
  it("leaves a line within the limit alone", () => {
    expect(fold("x".repeat(75))).toBe("x".repeat(75));
  });

  it("measures octets, so a multi-byte character can't take a line over", () => {
    const line = `${"x".repeat(74)}—${"y".repeat(100)}`;
    const physical = fold(line).split("\r\n");

    expect(Math.max(...physical.map((part) => Buffer.byteLength(part)))).toBeLessThanOrEqual(75);
    expect(unfold(fold(line))).toBe(line);
  });

  it("starts each continuation with a space", () => {
    const [, ...continuations] = fold("x".repeat(200)).split("\r\n");

    expect(continuations.length).toBeGreaterThan(0);
    expect(continuations.every((part) => part.startsWith(" "))).toBe(true);
  });
});

describe("vcard", () => {
  const card = vcard();

  it("ends lines with CRLF and nothing else", () => {
    expect(card.endsWith("\r\n")).toBe(true);
    expect(card.replace(/\r\n/g, "")).not.toMatch(/[\r\n]/);
  });

  it("keeps a physical line within 75 octets", () => {
    const lengths = card.split("\r\n").map((line) => Buffer.byteLength(line));

    expect(Math.max(...lengths)).toBeLessThanOrEqual(75);
  });

  it("opens and closes the card", () => {
    const lines = unfold(card).trim().split("\r\n");

    expect(lines[0]).toBe("BEGIN:VCARD");
    expect(lines[1]).toBe("VERSION:3.0");
    expect(lines.at(-1)).toBe("END:VCARD");
  });
});
