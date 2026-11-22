import {
  changelogAnchorId,
  changelogPath,
  getChangelogEntries,
} from "@/marketing/content/changelog"
import { markdownResponse } from "@/marketing/lib/markdown-response"
import { absoluteUrl } from "@/marketing/lib/seo"

export const GET = async () => {
  const entries = await getChangelogEntries("en")

  const markdown = `# What's new with Ringwise?

Product updates, integrations, and improvements from the Ringwise team.

## Updates

${entries
  .map(
    (entry) =>
      `- [${entry.data.title}](${absoluteUrl(changelogPath("en", changelogAnchorId(entry)))}) - ${entry.data.description}`
  )
  .join("\n")}
`

  return markdownResponse({
    markdown,
    canonical: absoluteUrl("/changelog/"),
    title: "Ringwise Changelog",
    description:
      "Follow Ringwise product updates, improvements, integrations, and shipped changes for the open-source AI receptionist platform.",
  })
}
