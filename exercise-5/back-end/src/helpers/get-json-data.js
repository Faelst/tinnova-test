const fs = require('fs')
const path = require('path')

const getJsonOnFile = () => {
    const dirPath = path.resolve(__dirname, '..', 'data')
    const textReadFile = fs.readFileSync(`${dirPath}/vehicles.json`)
    return JSON.parse(textReadFile.toString())
}

const registerNewVersionOfFileData = (jsonData) => {
    const dirPath = path.resolve(__dirname, '..', 'data')
    fs.writeFileSync(`${dirPath}/vehicles.json`, JSON.stringify(jsonData))
}

module.exports = { getJsonOnFile, registerNewVersionOfFileData }