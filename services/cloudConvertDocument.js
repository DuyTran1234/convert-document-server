const dotenv = require('dotenv');
dotenv.config();
const groupdocs_conversion_cloud = require('groupdocs-conversion-cloud');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const myStorage = process.env.STORAGE;
const config = new groupdocs_conversion_cloud.Configuration(clientId, clientSecret);
config.apiBaseUrl = "https://api.groupdocs.cloud";

const cloudConvertDocument = () => {

}

const upload = (pathFile) => {
    // Open file in IOStream from local/disc.
    var pathFile = 'C:\\Files\\sample.docx';
    // read file
    fs.readFile(pathFile, (err, fileStream) => {
        // construct FileApi
        var fileApi = groupdocs_conversion_cloud.FileApi.fromConfig(config);
        // create upload file request
        var request = new groupdocs_conversion_cloud.UploadFileRequest("sample.docx", fileStream, myStorage);
        // upload file
        fileApi.uploadFile(request);
    });

}