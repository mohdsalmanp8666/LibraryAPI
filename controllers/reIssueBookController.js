const express = require("express");
const moment = require("moment");
const m = moment();
const issueBooks = require("../models/issueBook");

module.exports = function reIssueBook(req, res) {
  console.log("Inside reIssueBook COntroller");
  console.log(req.body.issued_id);
  // * Getting the current data and making due and return date in specific format
  let issue_date = m.format("YYYY-MM-DD");
  let due_date = moment().add(15, "days");
  due_date = due_date.format("YYYY-MM-DD");
  // console.log(due_date.format("YYYY-MM-DD"));
  // let date_ob = new Date();
  // let issue_date;
  // let due_date;
  // issue_date.setDate(date_ob);
  // due_date.setDate(date_ob);
  // issue_date =
  //   date_ob.getFullYear() +
  //   "-" +
  //   ("0" + (date_ob.getMonth() + 1)).slice(-2) +
  //   "-" +
  //   date_ob.getDate();

  // due_date =
  //   date_ob.getFullYear() +
  //   "-" +
  //   ("0" + (date_ob.getMonth() + 1)).slice(-2) +
  //   "-" +
  //   (date_ob.getDate() + 7);

  // * Getting the issueing details for the specific issued id
  issueBooks
    .findAll({
      where: {
        issued_id: req.body.issued_id,
      },
    })
    .then((data) => {
      // console.log(data);
      // console.log(due_date.format("YYYY-MM-DD"));
      if (data.lenght < 1) {
        res.send(200).json({
          message: "No data to display!",
        });
      } else {
        let d = data[0].dataValues; // ? Old id

        // * Creating new issue for that same book for 7 days
        issueBooks
          .create({
            book_id: d.book_id,
            issue_date: issue_date,
            due_date: due_date,
            sid: d.sid,
            isReturned: false,
            isReissued: false,
          })
          .then((data) => {
            console.log("Book Reissued!");

            // * Updating the old book data after issueing the book again
            issueBooks
              .update(
                {
                  return_date: issue_date,
                  isReturned: true,
                  isReissued: true,
                  reIssue_Id: data.dataValues.issued_id,
                },
                {
                  where: {
                    issued_id: d.issued_id,
                  },
                }
              )
              .then((data) => {
                console.log("Reissuing old book successfull!");

                //   * Sending response in order to let the user know that Book reissued
                res.status(200).json({
                  result: true,
                  message: "Book Reissued Successfully!",
                  data,
                });
              });
          });
      }
    })
    .catch((err) => {
      console.log("Something went wrong!");
      res.status(500).json({
        result: false,
        message: "Something went wrong!",
        err: err,
      });
    });
};
