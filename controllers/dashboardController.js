const sequelize = require("sequelize");
const issuedBooksModel = require("../models/issueBook");
const moment = require("moment");
const quantity = require("../models/quantity");

const today = moment();
module.exports = function getDashboardData(req, res) {
  // * Date Calculation for query & formatting date

  let date = today.format("YYYY-MM-DD");

  // * Variables for making JSON for response
  var bookCount,
    issuedBooks,
    booksInCirculation,
    reIssuedBooks = 0;

  // * Getting no.of Books
  quantity
    .findAll({
      attributes: [
        [sequelize.fn("sum", sequelize.col("available_quantity")), "total"],
      ],
    })
    .then((data) => {
      bookCount = Number(data[0].dataValues.total);

      // * Getting the no.of issued Books current day
      issuedBooksModel
        .count({
          col: "issued_id",
          where: {
            issue_date: date,
          },
        })
        .then((count) => {
          issuedBooks = count;

          // * Getting the no.of books in Circulation
          issuedBooksModel
            .count({
              col: "issued_id",
              where: {
                isReturned: false,
                // issue_date: date,
              },
            })
            .then((count) => {
              console.log(count);
              booksInCirculation = count;
              // * Getting the no.of books Reissued current day
              issuedBooksModel
                .count({
                  col: "issued_id",
                  where: {
                    isReissued: true,
                    issue_date: date,
                  },
                })
                .then((count) => {
                  reIssuedBooks = count;

                  // ! Sending Response
                  res.status(200).json({
                    totalBooks: bookCount,
                    booksIssuedCurr: booksInCirculation,
                    totalIssuedBooks: issuedBooks,
                    booksReissued: reIssuedBooks,
                  });
                });
            });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        result: false,
        message: "Something went wrong",
        error: err,
      });
    });
};
