const convertDocument = require("./convertDocument");
const path = require('path');

const useToolsConvert = async (pathFile, tool) => {
    const parsed = parseInt(tool);
    const resource = path.extname(pathFile).slice(1);
    if(parsed === 0 || parsed === 1 || parsed === 2 || parsed === 6) {
        const result = await convertDocument(pathFile, resource, "pdf");
        return result;
    }
    else if(parsed === 3) {
        const result = await convertDocument(pathFile, resource, "docx");
        return result;
    }
    else if(parsed === 4) {
        const result = await convertDocument(pathFile, resource, "xlsx");
        return result;
    }
    else if(parsed === 5) {
        const result = await convertDocument(pathFile, resource, "pptx");
        return result;
    }
    
    
    else {
        return new Error('Error select tool');
    }
}

module.exports = useToolsConvert;