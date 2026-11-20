import { describe, expect, it } from "vitest"
import {
  decodeHtmlEntities,
  resolveHttpUrl,
} from "./seo-validation-utils.mjs"

describe("SEO validation utilities", () => {
  it("decodes supported HTML entities exactly once", () => {
    expect(decodeHtmlEntities("&lt;Ringwise&gt; &amp; &quot;AI&quot;")).toBe(
      '<Ringwise> & "AI"'
    )
    expect(decodeHtmlEntities("&amp;quot;")).toBe("&quot;")
  })

  it("resolves only HTTP and HTTPS links", () => {
    const base = "https://ringwise.example/docs/api/"

    expect(resolveHttpUrl("../pricing/", base)?.href).toBe(
      "https://ringwise.example/docs/pricing/"
    )
    expect(resolveHttpUrl("https://docs.ringwise.example/", base)?.href).toBe(
      "https://docs.ringwise.example/"
    )
    expect(resolveHttpUrl("javascript:alert(1)", base)).toBeUndefined()
    expect(resolveHttpUrl("data:text/html,unsafe", base)).toBeUndefined()
    expect(resolveHttpUrl("vbscript:msgbox(1)", base)).toBeUndefined()
    expect(resolveHttpUrl("mailto:support@ringwise.example", base)).toBeUndefined()
    expect(resolveHttpUrl("tel:+15555550123", base)).toBeUndefined()
  })
})
