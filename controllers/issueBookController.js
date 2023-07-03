const express = require("express");
const issueBooks = require("../models/issueBook");

module.exports = function issueBook(req, res) {
  console.log(req.body);
  b = req.body;
  issueBooks
    .count({
      where: {
        sid: b.sid,
        isReturned: false,
      },
    })
    .then((count) => {
      // * Check if the student has issued more than 2 issued books
      if (count >= 2) {
        console.log("Student cannot issue more than 2 books");
        res.status(200).json({
          result: false,
          message: "Student cannot issue more than 2 books",
        });
      } else {
        // * if yhe student can issue book
        issueBooks
          .findAll({
            where: {
              book_id: b.book_id,
              sid: b.sid,
              isReturned: false,
            },
          })

          .then((data) => {
            if (data.length > 0) {
              res.status(200).json({
                result: false,
                message: "User has already issued this book",
              });
            } else {
              issueBooks
                .create({
                  book_id: b.book_id,
                  issue_date: b.issue_date,
                  due_date: b.due_date,
                  sid: b.sid,
                  isReturned: false,
                  isReissued: false,
                })
                .then((data) => {
                  
                  // res.status(200).json({
                  //   result: true,
                  //   message: "User can issue the book",
                  // });
                  console.log("Book Issued successfully!");
                  res.status(200).json({
                    result: true,
                    message: "Book issued successfully!",
                    // length: data.length,
                  });
                });
            }
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        result: false,
        message: "Someting went wrong while issueing book",
        error: err,
      });
    });
};
