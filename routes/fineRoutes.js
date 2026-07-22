const express = require("express")
const router = express.Router()

const { getAllFines,collectFine } = require("../controllers/fineController")

router.get("/fines" , getAllFines)
router.put("/collect-fine/:id", collectFine);


module.exports = router;