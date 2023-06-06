const mongoose = require("mongoose")

const inventorySchema = mongoose.Schema(
    {
        vin: {
            type: String,
            required: [true, "Please add a VIN number"]
        },
        year: {
            type: String,
            required: [true, "Please add a model year"]
        },
        make: {
            type: String,
            required: [true, "Please add a vehicle make"]
        },
        model: {
            type: String,
            required: [true, "Please add a vehicle model"]
        },
        trim: {
            type: String,
            required: [true, "Please add a vehicle trim"]
        }
    },
    {
        timestamps: true,
        collection: 'Tulu Vehicles Inventory'
    })

    module.exports = mongoose.model("Inventory", inventorySchema)