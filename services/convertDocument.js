const dotenv = require('dotenv');
const groupdocs_conversion_cloud = require('groupdocs-conversion-cloud');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
dotenv.config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const convertedFolder = path.resolve(process.cwd(), "converted");

const convertDocument = async (pathFile, resource, target) => {
    try {
        let convertApi = groupdocs_conversion_cloud.ConvertApi.fromKeys(clientId, clientSecret);
        // read file from local disk
        let file = fs.readFileSync(pathFile);

        // create convert document direct request
        let request = new groupdocs_conversion_cloud.ConvertDocumentDirectRequest(`${target}`, file);

        // convert document directly
        let result = await convertApi.convertDocumentDirect(request);

        // save file in working dorectory
        let filenameNew = `${uuidv4() + Date.now()}.${target}`;
        let saveFile = path.resolve(convertedFolder, filenameNew);
        const write = await fs.writeFile(`${saveFile}`, result, "binary", function (err) { });
        console.log("Document converted: " + result.length);
        const deleteFileUpload = await fs.unlink(`${pathFile}`, (error) => {
            console.log(error);
        });
        console.log("File upload deleted");
        return filenameNew;
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = convertDocument;