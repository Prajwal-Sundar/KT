/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const { Client } = require("@notionhq/client");
const util = require("util");
const express = require("express");
const cors = require("cors");

const NOTION_API_KEY = "secret_o9Xxhf8GQq5NUCJkw1WKlDkMrvNVNogPIATPkOppmhn";
const DOM_DB = "757ece9dcd764ffb9396af8851e3525f";
const AGRI_DB = "16843df6abb78093aecdd189102447d5";
const COLOURS_LIST = ["#F5D365", "#EF523C", "#FEAFE1"];
const notion = new Client({ auth: NOTION_API_KEY });

const log = (obj) =>
  console.log(
    util.inspect(obj, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  );

const getDomains = async () => {
  const response = await notion.databases.query({ database_id: DOM_DB });
  response.results.sort((a, b) => {
    return a.properties.Priority.number - b.properties.Priority.number;
  });
  const domains = new Array(response.results.length);
  log(response.results);
  response.results.forEach((row, index) => {
    domains[index] = {
      id: index,
      Profile: row.properties.Title.title[0]?.plain_text,
      ExamName: row.properties.Exam.rich_text[0]?.plain_text,
      img: row.properties.Image.files[0]?.file.url,
      Color: COLOURS_LIST[index % COLOURS_LIST.length],
      Database: row.properties.Database.rich_text[0]?.plain_text,
    };
  });
  return domains;
};

const getDomain = async (domain) => {
  const domains = await getDomains();
  let DOMAIN_DB = false;
  domains.forEach((obj, index) => {
    if (obj.Profile.toLowerCase() == domain.toLowerCase())
      DOMAIN_DB = obj.Database;
  });
  if (!DOMAIN_DB) return false;
  const response = await notion.databases.query({ database_id: DOMAIN_DB });
  const obj = response.results[0].properties;
  const result = {
    mainHeading: obj.MainHeading.title[0]?.plain_text,
    subHeading: obj.SubHeading.rich_text[0]?.plain_text,
    content: obj.Content.rich_text[0]?.plain_text.split("\n"),
  };
  log(result);
  return result;
};

const app = express();
app.use(cors());
const port = 5000;

app.get("/domains", async (req, res) => {
  const domains = await getDomains();
  res.send(JSON.stringify(domains));
});

app.get("/domains/:domain", async (req, res) => {
  const { domain } = req.params;
  const data = await getDomain(domain);
  if (!data) res.send("Domain Not Found in Database.");
  else res.send(JSON.stringify(data));
});

app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
