const { books, bookss } = require("../models/book")
const jwt = require("jsonwebtoken")
const issuedBook = require("../models/issuedBook");
const Fine = require("../models/fine");
const issuedBookModel = require("../models/issuedBook");


exports.availableBooks = async (req, res) => {
  try {
    const book = await bookss.find({
      status: "available"
    });

    res.status(200).send({
      success: true,
      data: book
    });

  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
}

exports.returnedBooks = async (req, res) => {
  try {
    const bookId = req.params.id;

    const issueRecord = await issuedBook.findOne({
      bookId: bookId,
      isReturn: false,
    });

    if (!issueRecord) {
      return res.status(404).json({
        success: false,
        message: "Issued record not found",
      });
    }

    const today = new Date();
    const dueDate = new Date(issueRecord.dueDate);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    let lateDays = 0;
    let fineAmount = 0;
    const finePerDay = 10;

    if (today > dueDate) {
      const diffTime = today - dueDate;
      lateDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      fineAmount = lateDays * finePerDay;
    }

    issueRecord.isReturn = true;
    issueRecord.actualReturnDate = new Date();

    await issueRecord.save();

    if (fineAmount > 0) {
      await Fine.create({
        userId: issueRecord.userId,
        issueBookId: issueRecord._id,
        amount: fineAmount,
        paid: false,
        paidAmount: 0,
        unpaidAmount: fineAmount
      });
    }

    await bookss.findByIdAndUpdate(bookId, {
      status: "available",
    });

    return res.status(200).json({
      success: true,
      data: issueRecord,
      lateDays,
      fineAmount,
      message:
        fineAmount > 0
          ? `Book returned successfully. Fine ₹${fineAmount}`
          : "Book returned successfully. No fine",
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Book return failed",
    });
  }
};

exports.returnedBookss = async (req, res) => {
  try {
    const books = await issuedBook
      .find({
        isReturn: true,
      })
      .populate("userId")
      .populate("bookId");

    res.status(200).send({
      success: true,
      data: books,
      message: "data returned successfully",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "data not returned",
    });
  }
};

exports.getOverDueBooks = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const overDueBooks = await issuedBook
      .find({
        isReturn: false,
        dueDate: { $lt: today },
      })
      .populate("userId", "name email phone")
      .populate("bookId", "title author image status");

    return res.status(200).json({
      success: true,
      count: overDueBooks.length,
      data: overDueBooks,
      message: "Overdue books fetched successfully",
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Overdue books not fetched",
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await bookss.find();

    const issuedRecords = await issuedBookModel.find({
      isReturn: false,
    });

    const booksWithIssueData = books.map((book) => {
      const issueRecord = issuedRecords.find(
        (issue) => issue.bookId.toString() === book._id.toString()
      );

      return {
        ...book.toObject(),
        dueDate: issueRecord ? issueRecord.dueDate : null,
        issueDate: issueRecord ? issueRecord.issueDate : null,
        issuedId: issueRecord ? issueRecord._id : null,
      };
    });

    res.status(200).send({
      success: true,
      data: booksWithIssueData,
    });

  } catch (err) {
    console.log(err);

    res.status(500).send({
      success: false,
      message: "Books not fetched",
    });
  }
}
exports.addBook = async (req, res) => {
  try {
    const {
      id,
      title,
      author,
      category,
      type,
      price,
      rating,
      description,
      status,
    } = req.body;

    console.log("BODY =>", req.body);
    console.log("FILE =>", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const newBook = await bookss.create({
      id,
      title,
      author,
      category,
      type,
      price,
      image: req.file.path,
      rating,
      description,
      status,
    });

    return res.status(201).json({
      success: true,
      data: newBook,
    });

  } catch (error) {
    console.error("ADD BOOK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params

    const deletedBook = await bookss.findByIdAndDelete(id)

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}
exports.updateBook = async (req, res) => {
  const updatedBook = await bookss.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.json({
    success: true,
    data: updatedBook
  })
}

