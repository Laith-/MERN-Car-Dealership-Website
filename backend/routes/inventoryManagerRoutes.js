const express = require("express")
const router = express.Router()
const {getInventory, addInventory, updateInventory, deleteInventory} = require("../controllers/inventoryController")
const {protect} = require("../middleware/authMiddleware")

router.route("/").get(protect, getInventory).post(protect, addInventory)
router.route("/:id").put(protect, updateInventory).delete(protect, deleteInventory)


module.exports = router