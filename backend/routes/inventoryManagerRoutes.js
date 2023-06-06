const express = require("express")
const router = express.Router()
const {getInventory, addInventory, updateInventory, deleteInventory} = require("../controllers/inventoryController")

router.route("/").get(getInventory).post(addInventory)
router.route("/:id").put(updateInventory).delete(deleteInventory)


module.exports = router