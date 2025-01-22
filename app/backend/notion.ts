/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from "@notionhq/client";
import util from "util";
import express from "express";
import { renderPageAsHtml } from "./notionToHtml";

const notion = new Client({
  auth: "secret_o9Xxhf8GQq5NUCJkw1WKlDkMrvNVNogPIATPkOppmhn",
});
const log = (obj) =>
  console.log(
    util.inspect(obj, { showHidden: false, depth: null, colors: true })
  );

const databases = {
  kalvithadam: "7408b12e28b34f718ad89686bf08bdfd",
  core: "50b217c2d6354a76a2922334ea8caba7",
  domains: "757ece9dcd764ffb9396af8851e3525f",
};

const getDomains = async () => {
  const response = await notion.databases.query({
    database_id: databases.domains,
  });
  response.results.sort((a, b) => {
    return a.properties.Priority.number - b.properties.Priority.number;
  });
  log(response.results);
  const domains = new Array(response.results.length);
  response.results.forEach((row, index) => {
    const title = row.properties.Title.title[0]?.plain_text;
    domains[index] = title;
  });
  return domains;
};

const app = express();
const port = 3000;

app.get("/page-content", async (req, res) => {
  const pageId = "7b2eb6d7-7553-4f2a-ae51-490842949049"; // Replace with your Notion page ID
  try {
    const htmlContent = await renderPageAsHtml(notion, pageId);
    res.send(htmlContent);
  } catch (error) {
    res.status(500).send("Error rendering page: " + error.message);
  }
});

app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
