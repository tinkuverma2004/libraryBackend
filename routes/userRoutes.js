const express = require("express")
const router = express.Router()
const{ addUser, loginUser,updateUser ,searchUser , UserHistory} = require("../controllers/userController")


router.get('/userHistory',UserHistory)
router.get("/search-user", searchUser);

router.post('/addUser', addUser)

router.post('/login', loginUser)
router.put("/updateUser/:id", updateUser);

module.exports = router ;