const asyncHandler = require("express-async-handler")

const Inventory = require("../models/inventoryModel")

// desc: gets inventory
// route: GET /api/getInventory
// access: Private
const getInventory = asyncHandler(async (req, res) => {
    const car = await Inventory.find()

    res.status(200).json(car)
})


// desc: uploads inventory
// route: POST /api/getInventory
// access: Private
const addInventory = asyncHandler(async (req, res) => {
    if(!req.body.vin) {
        res.status(400)
        throw new Error("Please add a text field")
    }

    const car = await Inventory.create({
        vin: req.body.vin,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        trim: req.body.trim
    })

    res.status(200).json(car)
})

// desc: updates inventory
// route: PUT /api/getInventory
// access: Private
const updateInventory = asyncHandler(async (req, res) => {
    const car = await Inventory.findById(req.params.id)

    if (!car) {
        res.status(400)
        throw new Error("Car not found")
    }
    
    const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, req.body)
    const updatedCar = await Inventory.findByIdAndUpdate(req.params.id, req.body) // running twice to get back the update document

    res.status(200).json(updatedCar)
})

// desc: deletes inventory
// route: DELETE /api/getInventory
// access: Private
const deleteInventory = asyncHandler(async (req, res) => {
    const car = await Inventory.findById(req.params.id)

    if (!car) {
        res.status(400)
        throw new Error("Car not found")
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