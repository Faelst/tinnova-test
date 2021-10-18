const { getJsonOnFile, registerNewVersionOfFileData } = require("../../helpers/get-json-data");
const uuid = require('uuid')

class Vehicles {
    constructor() { }

    getVehicles(req, res) {
        const vehicles = (getJsonOnFile()).filter(e => !e.deleted)
        res.status(200).json({
            status: true,
            veiculos: vehicles
        })
    }

    getVehicleById(req, res) {
        const { id } = req.params
        const vehicles = (getJsonOnFile()).filter(e => !e.deleted && e.id === id)

        if (!vehicles.length)
            return res.status(200).json({
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

        const vehiclesJson = getJsonOnFile()
        vehiclesJson.push(newVehicleObj)
        registerNewVersionOfFileData(vehiclesJson)

        res.status(201).json({
            status: true,
            veiculo: newVehicleObj
        })
    }

    updateVehicle(req, res) {
        const { id } = req.params
        const vehicleUpdateData = req.body
        const vehiclesJson = getJsonOnFile()

        const vehicleFinded = (vehiclesJson.filter(e => !e.deleted && e.id == id)).shift()

        if (!vehicleFinded)
            return res.status(400).json({
                status: false,
                error: 'not found any vehicle'
            })

        for (const [i, e] of Object(vehiclesJson).entries()) {
            if (e.id == id)
                vehiclesJson.splice(i, 1, { ...e, ...vehicleUpdateData })
        }

        registerNewVersionOfFileData(vehiclesJson)

        res.status(200).json({
            status: true,
            vehicle: { ...vehicleFinded, ...vehicleUpdateData }
        })
    }

    deleteVehicle(req, res) {
        const { id } = req.params
        const vehiclesJson = getJsonOnFile()
        const vehicleFinded = (vehiclesJson.filter(e => e.id == id)).shift()

        if (!vehicleFinded)
            return res.status(400).json({
                status: false,
                error: 'not found any vehicle'
            })

        const vehicleDeleted = { ...vehicleFinded, deleted: new Date() }

        for (const [i, e] of Object(vehiclesJson).entries()) {
            if (e.id == id)
                vehiclesJson.splice(i, 1, vehicleDeleted)
        }

        registerNewVersionOfFileData(vehiclesJson)

        res.status(200).json({
            status: true,
            vehicle: vehicleDeleted
        })
    }
}

module.exports = Vehicles