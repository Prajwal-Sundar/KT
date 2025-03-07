import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import "../globals.css";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const convertToEmbedUrl = (originalUrl: string) => {
  const url = new URL(originalUrl);
  const videoId = url.searchParams.get("v");

  if (!videoId) {
    throw new Error("Invalid YouTube URL or VIDEO_ID not found.");
  }

  return `https://www.youtube.com/embed/${videoId}`;
};

// Utility function to fetch the mapping
const fetchMapping = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID!;

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const mapping = response.results
    .map((page) => {
      if ("properties" in page) {
        const customNameProperty = page.properties["Domain"];
        const pageIdProperty = page.properties["Link"];

        const customName =
          customNameProperty?.type === "title" &&
          Array.isArray(customNameProperty.title) &&
          customNameProperty.title[0]?.plain_text
            ? customNameProperty.title[0].plain_text
            : null;

        const pageId =
          pageIdProperty?.type === "rich_text" &&
          Array.isArray(pageIdProperty.rich_text) &&
          pageIdProperty.rich_text[0]?.plain_text
            ? pageIdProperty.rich_text[0].plain_text
            : null;

        if (customName && pageId) {
          return { customName, pageId };
        }
      }
      return null;
    })
    .filter(Boolean);

  return mapping as { customName: string; pageId: string }[];
};

// Define the expected type for params
interface PageParams {
  params: { id: string };
}

// Server Component
export default async function NotionPage({ params }: PageParams) {
  const mapping = await fetchMapping();
  const entry = mapping.find((m) => m.customName === params.id);

  if (!entry) {
    return <div>Page not found</div>;
  }

  try {
    const page = (await notion.pages.retrieve({
      page_id: entry.pageId,
    })) as PageObjectResponse;

    const blocks = await notion.blocks.children.list({
      block_id: entry.pageId,
    });

    const titleProperty = page.properties["Name"];
    const title =
      titleProperty?.type === "title" &&
      Array.isArray(titleProperty.title) &&
      titleProperty.title[0]?.plain_text
        ? titleProperty.title[0].plain_text
        : "Untitled";

    return (
      <div className="notion-page">
        <h1 className="notion-title">{title}</h1>
        <div className="notion-content">
          {await renderBlocks(blocks.results)}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching Notion page:", error);
    return <div>Error loading page</div>;
  }
}

// Render blocks function
async function renderBlocks(
  blocks: ListBlockChildrenResponse["results"] | null
) {
  const groupedBlocks: JSX.Element[] = [];
  let currentList: JSX.Element[] = [];
  let listType: "ul" | "ol" | null = null;

  for (const block of blocks || []) {
    if (!("type" in block)) continue;

    const renderNestedBlocks = async (block: BlockObjectResponse) => {
      if (block.has_children) {
        const childBlocks = await notion.blocks.children.list({
          block_id: block.id,
        });
        return await renderBlocks(childBlocks.results);
      }
      return null;
    };

    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      const isBulleted = block.type === "bulleted_list_item";
      if (!listType) {
        listType = isBulleted ? "ul" : "ol";
      } else if (
        (listType === "ul" && !isBulleted) ||
        (listType === "ol" && isBulleted)
      ) {
        groupedBlocks.push(
          listType === "ul" ? <ul>{currentList}</ul> : <ol>{currentList}</ol>
        );
        currentList = [];
        listType = isBulleted ? "ul" : "ol";
      }

      const listItem =
        block.type === "bulleted_list_item"
          ? block.bulleted_list_item
          : block.numbered_list_item;

      currentList.push(
        <li key={block.id}>
          {listItem.rich_text.map((text, i) => (
            <span
              key={i}
              style={{
                fontWeight: text.annotations.bold ? "bold" : undefined,
                fontStyle: text.annotations.italic ? "italic" : undefined,
                textDecoration: text.annotations.underline
                  ? "underline"
                  : text.annotations.strikethrough
                  ? "line-through"
                  : undefined,
                color:
                  text.annotations.color !== "default"
                    ? text.annotations.color
                    : undefined,
              }}
            >
              {text.plain_text}
            </span>
          ))}
          {block.has_children && <ul>{await renderNestedBlocks(block)}</ul>}
        </li>
      );
    } else {
      if (listType) {
        groupedBlocks.push(
          listType === "ul" ? <ul>{currentList}</ul> : <ol>{currentList}</ol>
        );
        currentList = [];
        listType = null;
      }

      switch (block.type) {
        case "paragraph":
          groupedBlocks.push(
            <div key={block.id} className="notion-paragraph">
              {block.paragraph.rich_text.map((text, idx) => (
                <span key={idx}>{text.plain_text}</span>
              ))}
            </div>
          );
          break;

        case "heading_1":
          groupedBlocks.push(
            <h1 key={block.id} className="notion-heading-1">
              {block.heading_1.rich_text.map((text) => text.plain_text)}
            </h1>
          );
          break;

        case "heading_2":
          groupedBlocks.push(
            <h2 key={block.id} className="notion-heading-2">
              {block.heading_2.rich_text.map((text) => text.plain_text)}
            </h2>
          );
          break;

        case "heading_3":
          groupedBlocks.push(
            <h3 key={block.id} className="notion-heading-3">
              {block.heading_3.rich_text.map((text) => text.plain_text)}
            </h3>
          );
          break;

        case "divider":
          groupedBlocks.push(
            <div key={block.id}>
              <hr />
            </div>
          );
          break;

        case "quote":
          groupedBlocks.push(
            <blockquote key={block.id} className="notion-quote">
              {block.quote.rich_text.map((text) => text.plain_text)}
            </blockquote>
          );
          break;

        case "image":
          groupedBlocks.push(
            <div key={block.id} className="notion-image">
              {block.image.type === "external" ? (
                <img src={block.image.external.url} alt="Notion Image" />
              ) : (
                <img src={block.image.file.url} alt="Notion Image" />
              )}
            </div>
          );
          break;

        case "video":
          groupedBlocks.push(
            <div key={block.id} className="notion-video">
              {block.video.type === "external" && (
                <iframe
                  width="560"
                  height="315"
                  src={convertToEmbedUrl(block.video.external.url)}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          );
          break;

        default:
          groupedBlocks.push(
            <div key={block.id}>
              <p>Unsupported block type: {block.type}</p>
            </div>
          );
      }
    }
  }

  if (listType) {
    groupedBlocks.push(
      listType === "ul" ? <ul>{currentList}</ul> : <ol>{currentList}</ol>
    );
  }

  return groupedBlocks;
}
