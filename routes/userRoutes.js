const express = require("express")
const router = express.Router()
const{ addUser, loginUser,updateUser ,searchUser} = require("../controllers/userController")

router.get("/search-user", searchUser);

router.post('/addUser', addUser)

router.post('/login', loginUser)
router.put("/updateUser/:id", updateUser);

module.exports = router ;