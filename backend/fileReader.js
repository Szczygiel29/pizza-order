const { readFile } = require("fs/promises")

const fileReaderAsync = async (filePath) => {
    try {
        return await readFile(filePath);
    } catch (error) {
        console.error(`Filre reading error: ${error.message}`)
    }
}

module.exports = fileReaderAsync