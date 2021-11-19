const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

const convertAudio = async (inputFilePath, target) => {
    const outputFileName = `${Date.now()}.${target}`;
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