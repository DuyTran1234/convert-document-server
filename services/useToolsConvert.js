const convertDocument = require("./convertDocument");
const path = require('path');
const { convertImage } = require("./convertImage");
const convertAudio = require("./convertAudio");

const useToolsConvert = async (pathFile, tool) => {
    const parsedTool = parseInt(tool);
    const resource = path.extname(pathFile).slice(1);
    if(parsedTool === 0 || parsedTool === 1 || parsedTool === 2 || parsedTool === 6) {
        const result = await convertDocument(pathFile, resource, "pdf");
        return result;
    }
    else if(parsedTool === 3) {
        const result = await convertDocument(pathFile, resource, "docx");
        return result;
    }
    else if(parsedTool === 4) {
        const result = await convertDocument(pathFile, resource, "xlsx");
        return result;
    }
    else if(parsedTool === 5) {
        const result = await convertDocument(pathFile, resource, "pptx");
        return result;
    }
    else if(parsedTool === 7) {
        const result = await convertImage(pathFile, "png");
        return result;
    }
    else if(parsedTool === 8) {
        const result = await convertAudio(pathFile, "mp3");
        return result;
    }
    else {
        return new Error('Error select tool');
    }
}

module.exports = useToolsConvert;