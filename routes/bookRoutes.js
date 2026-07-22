const express = require("express")
const router = express.Router()
const upload = require("../middleware/upload")
const { getBooks, addBook, deleteBook, updateBook, availableBooks, returnedBooks, returnedBookss, getOverDueBooks } = require("../controllers/bookControler")
const { issuedBook } = require("../controllers/issuedBookController")



router.get("/getbooks", getBooks);

router.post('/addbook',upload.single("image"), addBook)

router.delete("/deletebook/:id", deleteBook)

router.put("/updatebook/:id", updateBook)

router.get("/availablebooks", availableBooks)

router.post("/issue", issuedBook)

router.put("/returnBook/:id", returnedBooks)

router.get("/returned", returnedBookss)

router.get("/due-books", getOverDueBooks)








module.exports = router;