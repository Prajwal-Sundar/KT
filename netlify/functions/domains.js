const { Client } = require("@notionhq/client");

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DOM_DB = process.env.DOM_DB;
const COLOURS_LIST = process.env.COLOURS_LIST.split(",");

const notion = new Client({ auth: NOTION_API_KEY });

const getDomains = async () => {
  const response = await notion.databases.query({ database_id: DOM_DB });
  return response.results.map((row, index) => ({
    id: index,
    Profile: row.properties.Title.rich_text[0]?.plain_text,
    ExamName: row.properties.Exam.rich_text[0]?.plain_text,
    img: row.properties.Image.files[0]?.file.url,
    Color: "#" + COLOURS_LIST[index % COLOURS_LIST.length],
  }));
};

exports.handler = async () => {
  try {
    const domains = await getDomains();
    return {
      statusCode: 200,
      body: JSON.stringify(domains),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch domains." }),
    };
  }
};
