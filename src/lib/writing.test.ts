import { describe, expect, it } from "vitest";

import { SITE } from "@/lib/site";
import { parseAtom, parseDescription } from "@/lib/writing";

const entry = (body: string) => `<entry>${body}</entry>`;

describe("parseAtom", () => {
  it("reads a post's fields", () => {
    const [post] = parseAtom(
      entry(`
        <title type="html">A title</title>
        <link href="https://blog.example/a" rel="alternate" type="text/html" />
        <published>2026-09-29T00:00:00+00:00</published>
        <summary type="html">A summary.</summary>
      `),
    );

    expect(post).toEqual({
      title: "A title",
      url: "https://blog.example/a",
      summary: "A summary.",
      published: "2026-09-29T00:00:00+00:00",
    });
  });

  it("takes CDATA, markup and entities off", () => {
    const [post] = parseAtom(
      entry(`
        <title><![CDATA[Tom &amp; <em>Jerry</em>&#39;s]]></title>
        <link href="https://blog.example/a" />
      `),
    );

    expect(post.title).toBe("Tom & Jerry's");
  });

  it("reads the entry's own link, not one in the post body", () => {
    const [post] = parseAtom(
      entry(`
        <title>A title</title>
        <link href="https://blog.example/own" />
        <content>&lt;a href="https://elsewhere.example"&gt;a link&lt;/a&gt;</content>
      `),
    );

    expect(post.url).toBe("https://blog.example/own");
  });

  it("drops an entry with no title or no link", () => {
    const posts = parseAtom(
      entry(`<link href="https://blog.example/untitled" />`) +
        entry(`<title>No link</title>`) +
        entry(`<title>Whole</title><link href="https://blog.example/whole" />`),
    );

    expect(posts.map((post) => post.title)).toEqual(["Whole"]);
  });
});

describe("parseDescription", () => {
  it("returns the subtitle as a sentence", () => {
    expect(parseDescription("<subtitle>Writing on tech and stats</subtitle>")).toBe(
      "Writing on tech and stats.",
    );
  });

  it("leaves a sentence that already ends in punctuation", () => {
    expect(parseDescription("<subtitle>Is it working?</subtitle>")).toBe("Is it working?");
  });

  it("takes the author's sign-off off", () => {
    expect(parseDescription(`<subtitle>Essays, by ${SITE.owner}</subtitle>`)).toBe("Essays.");
  });

  it("returns nothing for a feed with no subtitle", () => {
    expect(parseDescription("<feed></feed>")).toBeUndefined();
  });
});
