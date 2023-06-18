const mongoose = require("mongoose")

const inventorySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectID,
            required: [true],
            ref: "User"
        },
        dealerID: {
            type: String,
            required: [false] // set to false for development
        },
        tuluStockNum: {
            type: String,
            required: [true]
        },
        dealerStockNum: {
            type: String,
            required: [false] // set to false for development
        },
        published: {
            type: Boolean,
            required: [true]
        },
        vin: {
            type: String,
            required: [false, "Please add a VIN number"]
        },
        year: {
            type: String,
            required: [true, "Please add a model year"]
        },
        make: {
            type: String,
            required: [false, "Please add a vehicle make"]
        },
        model: {
            type: String,
            required: [false, "Please add a vehicle model"]
        },
        trim: {
            type: String,
            required: [false, "Please add a vehicle trim"]
        },
        optionsList: {
            type: Object,
            required: [false, "Please add the vehicle options"]
        },
        optionsHighlights: {
            type: Object,
            required: [false]
        },
        mileage: {
            type: String,
            required: [false] // set to false for development
        },
        fuelType: {
            type: String,
            required: [false] // set to false for development
        },
        engine: {
            type: String,
            required: [false] // set to false for development. ***only applies to gas vehicles
        },
        transmission: {
            type: String,
            required: [false] // set to false for development
        },
        driveTrain: {
            type: String,
            required: [false] // set to false for development
        },
        seating: {
            type: String,
            required: [false] // set to false for development
        }

    },
    {
        timestamps: true,
        collection: process.env.INVENTORY_DB_NAME
    })

    module.exports = mongoose.model("Inventory", inventorySchema)