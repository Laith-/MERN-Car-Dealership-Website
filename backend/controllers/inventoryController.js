const asyncHandler = require("express-async-handler")

const Inventory = require("../models/inventoryModel")
const User = require("../models/userModel")

const {tuluStockNumberGenerator} = require("../middleware/stockNumberMiddleware")

const {optionhighlights} = require("../middleware/vehicleOptionsMiddleware")

// desc: gets inventory
// route: GET /api/inventory
// access: Private
const getInventory = asyncHandler(async (req, res) => {
    const car = await Inventory.find({user: req.user.id})

    res.status(200).json(car)
})


// desc: uploads inventory
// route: POST /api/inventory
// access: Private
const addInventory = asyncHandler(async (req, res) => {
    if(!req.body.vin) {
        res.status(400)
        throw new Error("FILL ALL FIELDS")
    }
    const stockNumber = tuluStockNumberGenerator()
    const parsedOptions = JSON.parse(req.body.optionsList)
    const highlightedOptions = optionhighlights(parsedOptions)

    const car = await Inventory.create({
        user: req.user.id,
        dealerID: req.body.dealerID,
        tuluStockNum: stockNumber,
        dealerStockNumber: req.body.dealerStockNumber,
        vin: req.body.vin,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        trim: req.body.trim,
        mileage: req.body.mileage,
        fuelType: req.body.fuelType,
        engine: req.body.engine,
        transmission: req.body.transmission,
        driveTrain: req.body.driveTrain,
        seating: req.body.seating,
        optionsList: parsedOptions,
        optionsHighlights: highlightedOptions
    })

    res.status(200).json(car)
})

// desc: updates inventory
// route: PUT /api/inventory
// access: Private
const updateInventory = asyncHandler(async (req, res) => {
    const car = await Inventory.findById(req.params.id)

    if (!car) {
        res.status(400)
        throw new Error("Car not found")
    }

    const user = await User.findById(req.user.id)

    // checking for user
    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }
    
    // making sure logged in user matches the vehicle user
    if(car.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, req.body)
    const updatedCar = await Inventory.findByIdAndUpdate(req.params.id, req.body) // running twice to get back the update document

    res.status(200).json(updatedCar)
})

// desc: deletes inventory
// route: DELETE /api/inventory
// access: Private
const deleteInventory = asyncHandler(async (req, res) => {
    const car = await Inventory.findById(req.params.id)

    if (!car) {
        res.status(400)
        throw new Error("Car not found")
    }

    const user = await User.findById(req.user.id)

    // checking for user
    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }
    
    // making sure logged in user matches the vehicle user
    if(car.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    await Inventory.findByIdAndRemove(req.params.id)
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getInventory,
    addInventory,
    updateInventory,
    deleteInventory
}