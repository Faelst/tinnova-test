const { getJsonOnFile, registerNewVersionOfFileData } = require("../../helpers/get-json-data");
const uuid = require('uuid')

class VehicleBrands {
    constructor() { }

    getVehiclesBrands(req, res) {
        const brands = (getJsonOnFile())
            .filter(e => !e.deleted)
            .map(e => (e.marca))
            .filter((e, i, s) => s.indexOf(e) === i)
            .filter(e => !!e);


        res.status(200).json({
            status: true,
            marcas: brands
        })
    }
}

module.exports = VehicleBrands