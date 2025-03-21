const { Parser } = require("json2csv");

exports.exportCSV = async (data) => {
  const fields = ["name", "email", "jobTitle", "score", "status"];
  const json2csvParser = new Parser({ fields });
  return json2csvParser.parse(data);
};
