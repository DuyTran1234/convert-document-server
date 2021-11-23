const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const convertImage = async (inputFilePath, target) => {
    // const width = Number.parseInt(resizeImage["width"]);
    // const height = Number.parseInt(resizeImage["height"]);
    // if(isNaN(width) || isNaN(height)) {
    //     return new Error('ParseInt resize image failed');
    // }
    const outputFileName = `${uuidv4() + Date.now()}.${target}`;
    const outputFilePath = path.resolve(process.cwd(), "converted", `${outputFileName}`);

    let inStream = fs.createReadStream(inputFilePath);
    let outStream = fs.createWriteStream(outputFilePath);

    outStream.on('error', () => {
        console.log('OutStream Error');
    });
    outStream.on('close', () => {
        console.log('Successfully write file');
    });
    let transform = sharp().resize().on('info', (fileInfo) => {
        console.log("Resizing done, file not saved");
    });
    const convert = await inStream.pipe(transform).pipe(outStream);
    const deleteFileUpload = await fs.unlink(`${inputFilePath}`, (error) => {
        console.log(error);
    });
    return outputFileName;
}

module.exports = { convertImage }