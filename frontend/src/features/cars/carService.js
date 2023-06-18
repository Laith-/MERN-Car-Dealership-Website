import axios from "axios"

const API_URL = "/api/inventory/"

//Create to inventory
const createCar = async (carData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, carData, config)

    return response.data
}

// Get dealer inventory
const getCars = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

// get one car
const getPublishedCar = async (carId) => {
    let url = '/api/inventory/getPublicInventory';
    if (carId) {
        url += `/${carId}`;
    }
    const response = await axios.get(url);
    return response.data
}

// update inv info
const updateInventory = async (carId, updatedFields, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}${carId}`, updatedFields, config)


    return response.data
}

// delete from inventory
const deleteCar = async (carId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}${carId}`, config)


    return response.data
}




const carService = {
    createCar,
    getCars,
    getPublishedCar,
    updateInventory,
    deleteCar
}

export default carService