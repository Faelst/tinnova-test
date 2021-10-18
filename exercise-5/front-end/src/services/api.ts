import axios, { Axios } from 'axios'

export class ApiService {    
    axiosInstance: Axios

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.API_URL,
        });
    }

    async getVehicles() {
        return await this.axiosInstance.get('/veiculos')
    }

    async getVehicleBrands() {
        return await this.axiosInstance.get('/marcas')
    }

    async registerNewVehicle(vehicleData) {
        return await this.axiosInstance.post('/veiculos', { ...vehicleData })
    }

    async getVehicleById(vehicleId) {
        return await this.axiosInstance.get(`/veiculos/${vehicleId}`)
    }

    async updateVehicle(vehicleData) {
        const vehicleId = vehicleData.id
        delete vehicleData.id
        return await this.axiosInstance.put(`/veiculos/${vehicleId}`, { ...vehicleData })
    }

    async deleteVehicle({ vehicleId }){
        return await this.axiosInstance.delete(`/veiculos/${vehicleId}`)
    }
}