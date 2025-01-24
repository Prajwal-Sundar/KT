/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const { Client } = require("@notionhq/client");
const util = require("util");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DOM_DB = process.env.DOM_DB;
const COLOURS_LIST = process.env.COLOURS_LIST.split(",");

const notion = new Client({ auth: NOTION_API_KEY });

const log = (obj) =>
  console.log(
    util.inspect(obj, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  );

const app = express();
app.use(cors());
const port = 5000;

app.get("/domains", async (req, res) => {
  const domains = await getDomains();
  res.send(JSON.stringify(domains));
});

app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
