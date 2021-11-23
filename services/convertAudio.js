const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const convertAudio = async (inputFilePath, target) => {
    const outputFileName = `${Date.now()}-${uuidv4()}.${target}`;
    const outputFilePath = path.resolve(process.cwd(), "converted", outputFileName);
    await childProcess.execSync(`ffmpeg -i ${inputFilePath} ${outputFilePath}`, (error, stdout, stderr) => {
        console.log(error);
    });
    fs.unlink(inputFilePath, (error) => {
        console.log(error);
    });
    return outputFileName;
}

module.exports = convertAudio;