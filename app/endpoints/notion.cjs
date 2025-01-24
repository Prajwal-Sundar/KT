/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { Client } = require("@notionhq/client");
const { inspect } = require("util");
const express = require("express");
// const { renderPageAsHtml } = require("notionToHtml");

// import { renderPageAsHtml } from "./notionToHtml";

const notion = new Client({
  auth: "secret_o9Xxhf8GQq5NUCJkw1WKlDkMrvNVNogPIATPkOppmhn",
});
const log = (obj) =>
  console.log(inspect(obj, { showHidden: false, depth: null, colors: true }));

const databases = {
  kalvithadam: "7408b12e28b34f718ad89686bf08bdfd",
  core: "50b217c2d6354a76a2922334ea8caba7",
  domains: "757ece9dcd764ffb9396af8851e3525f",
};

console.log(notion.databases.query({ database_id: databases.domains }));

const getDomains = async () => {
  const response = await notion.databases.query({
    database_id: databases.domains,
  });
  response.results.sort((a, b) => {
    return a.properties.Priority.number - b.properties.Priority.number;
  });
  const domains = new Array(response.results.length);
  response.results.forEach((row, index) => {
    const title = row.properties.Title.title[0]?.plain_text;
    domains[index] = title;
  });
  log(domains);
  return domains;
};

const app = express();
const port = 3001;

app.get("/", async (req, res) => {
  try {
    const domains = await getDomains();
    res.json(domains); // Send the data as JSON
  } catch (error) {
    console.error("Error fetching domains:", error.message);
    res.status(500).json({ error: "Failed to fetch domains." });
  }

  /*const pageId = "7b2eb6d7-7553-4f2a-ae51-490842949049"; // Replace with your Notion page ID
  try {
    const htmlContent = await renderPageAsHtml(notion, pageId);
    res.send(htmlContent);
  } catch (error) {
    res.status(500).send("Error rendering page: " + error.message);
  }*/
});

app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = {
  getDomains,
};
