const Fine = require("../models/fine");





exports.getAllFines = async (req, res) => {
  try {
    const fines = await Fine.find()
      .populate("userId")
      .populate({
        path: "issueBookId",
        populate: {
          path: "bookId",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      data: fines,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Fine history not found",
    });
  }
};

exports.collectFine = async (req, res) => {
  try {
    let { payAmount } = req.body;

    payAmount = Number(payAmount);

    if (!payAmount || payAmount <= 0) {
      return res.status(400).send({
        success: false,
        message: "Valid payment amount is required",
      });
    }

    const fine = await Fine.findById(req.params.id);

    if (!fine) {
      return res.status(404).send({
        success: false,
        message: "Fine not found",
      });
    }

    if (fine.paid) {
      return res.status(400).send({
        success: false,
        message: "Fine already paid",
      });
    }

    if (payAmount > fine.unpaidAmount) {
      return res.status(400).send({
        success: false,
        message: "Payment is greater than remaining amount",
      });
    }

    fine.paidAmount += payAmount;
    fine.unpaidAmount -= payAmount;

    if (fine.unpaidAmount === 0) {
      fine.paid = true;
      fine.paidAt = new Date();
    }

    await fine.save();

    res.status(200).send({
      success: true,
      message: "Fine collected successfully",
      data: fine,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Fine not collected",
    });
  }
};