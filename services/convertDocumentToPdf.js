const { PDFNet } = require('@pdftron/pdfnet-node');
const dotenv = require('dotenv');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
dotenv.config();
const key = process.env.KEY;

const convertDocumentToPdf = async (pathFile) => {
    const filename = `${uuidv4()}`;
    const inputPath = path.resolve(pathFile);
    const outputPath = path.resolve(process.cwd(), "converted", `${filename}.pdf`);

    const main = async () => {
        const pdfdoc = await PDFNet.PDFDoc.create();
        await pdfdoc.initSecurityHandler();
        await PDFNet.Convert.toPdf(pdfdoc, inputPath);
        pdfdoc.save(
            outputPath,
            PDFNet.SDFDoc.SaveOptions.e_linearized,
        );
    };

    let result = PDFNet.runWithCleanup(main, key).catch(function (error) {
        console.log('Error: ' + JSON.stringify(error));
    }).then(function () { PDFNet.shutdown(); }).then(function() {
        return `${filename}.pdf`;
    });
    return result;
}

module.exports = convertDocumentToPdf;