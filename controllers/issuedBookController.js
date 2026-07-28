const { bookss } = require("../models/book");
const issuedBook = require("../models/issuedBook");
const Fine = require("../models/fine");

exports.issuedBook = async (req, res) => {
  try {
    const { userId, bookId, issueDate, dueDate } = req.body;

    if (!userId || !bookId || !issueDate || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const alreadyIssued = await issuedBook.findOne({
      bookId,
      isReturn: false,
    });

    if (alreadyIssued) {
      return res.status(400).json({
        success: false,
        message: "Book already issued",
      });
    }

    const issueData = await issuedBook.create({
      userId,
      bookId,
      issueDate,
      dueDate,


      isReturn: false,
      
    });

    await bookss.findByIdAndUpdate(
      bookId,
      {
        status: "borrowed",
      },
      { returnDocument: "after" }
    );

    return res.status(200).json({
      success: true,
      data: issueData,
      message: "Book issued successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Book not issued",
    });
  }
};


