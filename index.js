const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8888;
const cors = require('cors');
app.use(cors());
app.use(express.json());

// config multer
const multer = require('multer');
const storage = require('./config/configStorage');
const useToolsConvert = require('./services/useToolsConvert');
const upload = multer({ storage: storage, limits: {fileSize: 100 * 1024 * 1024}});
const path = require('path');
const convertedFolder = path.resolve(process.cwd(), "converted");

app.post('/convert-file', upload.single('fileUpload'), async (req, res, next) => {
    const file = req.file;
    const {tool} = req.body;
    console.log(req.body);
    if (!file) {
        const error = new Error('Please upload a file');
        return next(error);
    }
    const pathFile = path.resolve(__dirname, file.path);
    try {
        const convert = await useToolsConvert(pathFile, tool);
        res.send(convert);
    }
    catch(error) {
        return next(error);
    }
})

app.get('/download/filename/:filename', async (req, res) => {
    const {filename} = req.params;
    const link = path.resolve(convertedFolder, `${filename}`);
    res.download(link);
});


app.listen(port, () => {
    console.log("Run server on " + port);
});