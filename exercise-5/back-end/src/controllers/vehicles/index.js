const { getJsonOnFile } = require("../../helpers/get-json-data");
const uuid = require('uuid')

class Vehicles {
    constructor() { }

    getVehicles(req, res) {
        const vehicles = (getJsonOnFile()).filter(e => !e.vendido)
        res.status(200).json({
            status: true,
            veiculos: vehicles
        })
    }

    getVehicleById(req, res) {
        const { id } = req.params
        const vehicles = (getJsonOnFile()).filter(e => !e.vendido && e.id === id)

        if (!vehicles.length)
            return res.status(400).json({
                status: false,
                error: 'not found any vehicle'
            })

        res.status(200).json({
            status: true,
            veiculo: vehicles.shift()
        })
    }

    registerVehicle(req, res) {
        const {
            veiculo,
            marca,
            ano,
            descricao,
        } = req.body

        const newVehicleObj = {
            id: uuid.v4(),
            veiculo,
            marca,
            ano,
            descricao,
            vendido: false,
            created: new Date(),
            deleted: null
        }

        res.status(201).json({
            status: true,
            veiculo: newVehicleObj
        })
    }
}

module.exports = Vehicles