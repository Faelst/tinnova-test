const fs = require('fs')
const path = require('path')
const uuid = require('uuid')

const dirPath = path.resolve(__dirname, '..', 'data')
const textReadFile = fs.readFileSync(`${dirPath}/vehicles-proto-type.json`)
const json = JSON.parse(textReadFile.toString())
const jsonParsed = json.map((e, i) => ({
    id: uuid.v4(),
    veiculo: e.Specification.Title,
    marca: e.Specification.Make.Value,
    ano: e.Specification.YearModel,
    descricao: e.LongComment,
    vendido: Math.random() > 0.7,
    created: new Date(),
    deleted: Math.random() > 0.9 ? new Date : null,
}))
fs.writeFileSync(`${dirPath}/vehicles.json`, JSON.stringify(jsonParsed))