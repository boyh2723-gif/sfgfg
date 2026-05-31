const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
    const id = event.queryStringParameters.id;

    if (!id) {
        return {
            statusCode: 400,
            body: "Missing id"
        };
    }

    const filePath = path.join(__dirname, "../../js01.json");

    let data = { banned: [] };

    try {
        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        }
    } catch (e) {
        // ignore
    }

    if (!data.banned.includes(id)) {
        data.banned.push(id);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

    return {
        statusCode: 200,
        body: "OK"
    };
};
