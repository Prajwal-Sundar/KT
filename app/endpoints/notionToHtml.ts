import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Utility function for detailed logging
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (obj: any): void => {
  console.log(
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("util").inspect(obj, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  );
};

// Type for block objects
type NotionBlock = BlockObjectResponse;

// Function to convert rich text to HTML
function richTextToHtml(richTextArray: RichTextItemResponse[]): string {
  return richTextArray
    .map((text) => {
      let html = text.plain_text;

      // Apply bold, italic, underline, and code styles
      if (text.annotations.bold) html = `<strong>${html}</strong>`;
      if (text.annotations.italic) html = `<em>${html}</em>`;
      if (text.annotations.underline) html = `<u>${html}</u>`;
      if (text.annotations.code) html = `<code>${html}</code>`;

      // Handle links
      if (text.href) html = `<a href="${text.href}">${html}</a>`;

      return html;
    })
    .join("");
}

// Function to convert blocks to HTML
async function blocksToHtml(
  notion: Client,
  blocks: NotionBlock[]
): Promise<string> {
  let html = "";

  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        const richText = richTextToHtml(block.paragraph.rich_text);
        if (richText.trim() === "") {
          html += `<br />`; // Handle empty paragraphs as line breaks
        } else {
          html += `<p>${richText}</p>`;
        }
        break;
      case "heading_1":
        html += `<h1>${richTextToHtml(block.heading_1.rich_text)}</h1>`;
        break;
      case "heading_2":
        html += `<h2>${richTextToHtml(block.heading_2.rich_text)}</h2>`;
        break;
      case "heading_3":
        html += `<h3>${richTextToHtml(block.heading_3.rich_text)}</h3>`;
        break;
      case "bulleted_list_item":
        html += `<ul><li>${richTextToHtml(
          block.bulleted_list_item.rich_text
        )}</li></ul>`;
        break;
      case "numbered_list_item":
        html += `<ol><li>${richTextToHtml(
          block.numbered_list_item.rich_text
        )}</li></ol>`;
        break;
      case "image":
        const imageUrl =
          block.image.type === "external"
            ? block.image.external.url
            : block.image.file.url;
        html += `<img src="${imageUrl}" alt="Notion Image" />`;
        break;
      case "quote":
        html += `<blockquote>${richTextToHtml(
          block.quote.rich_text
        )}</blockquote>`;
        break;
      case "divider":
        html += `<hr />`;
        break;
      case "callout":
        html += `<div class="callout">${richTextToHtml(
          block.callout.rich_text
        )}</div>`;
        break;
      case "table":
        html += `<table>`;
        for (const row of block.table.rows || []) {
          html += `<tr>`;
          for (const cell of row.cells || []) {
            html += `<td>${richTextToHtml(cell)}</td>`;
          }
          html += `</tr>`;
        }
        html += `</table>`;
        break;
      case "table_row":
        html += `<tr>`;
        for (const cell of block.table_row.cells || []) {
          html += `<td>${richTextToHtml(cell)}</td>`;
        }
        html += `</tr>`;
        break;
      default:
        console.log(`Unsupported block type: ${block.type}`);
    }
  }

  return html;
}

// Function to get the content of a Notion page and convert it to HTML
async function renderPageAsHtml(
  notion: Client,
  pageId: string
): Promise<string> {
  const blocks: NotionBlock[] = [];
  let cursor: string | null = null;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor || undefined,
    });

    log(response);

    blocks.push(...(response.results as NotionBlock[]));
    cursor = response.next_cursor;
  } while (cursor);

  const html = await blocksToHtml(notion, blocks);
  return html;
}

// Export functions
export { richTextToHtml, blocksToHtml, renderPageAsHtml };
