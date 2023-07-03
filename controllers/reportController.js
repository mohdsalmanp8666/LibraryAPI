const express = require("express");
const issueBooks = require("../models/issueBook");
const { Op } = require("sequelize");
const LostBook = require("../models/LostBook");
const moment = require("moment");

module.exports = function generateReport(req, res) {
  console.log(req.query);
  var today = moment();
  var date = today.format("YYYY-MM-DD");
  //  ! Issued Books reports generating from a specific day to a specific day
  if (req.query.reportName == "dailyTransaction") {
    issueBooks
      .findAll({
        where: {
          issue_date: date,
          // {
          //   [Op.between]: [
          //     req.query.startDate,
          //     req.query.endDate || Date.now(),
          //   ],
          // },
          // sid: req.body.sid,
        },
      })
      .then((data) => {
        if (data.length < 1) {
          res.status(200).json({
            result: false,
            message: "No data to show",
            data: [],
          });
        } else {
          console.log(data);
          res.status(200).json({
            result: true,
            message: "Issued Books data",
            data: data,
          });
        }
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
        res.status(500).send({
          result: false,
          message: "something went wrong while generating issued books report",
          error: err,
        });
      });
    //   ! Reissueing Books reports generating from a specific day to a specific day
  } else if (req.query.reportName == "dailyReissued") {
    issueBooks
      .findAll({
        where: {
          issue_date: date,
          // {
          //   [Op.between]: [
          //     req.query.startDate,
          //     req.query.endDate || Date.now(),
          //   ],
          // },
          isReissued: true,
        },
      })
      .then((data) => {
        if (data.length < 1) {
          res.status(200).json({
            result: false,
            message: "No data to show",
            data: [],
          });
        } else {
          res.status(200).json({
            result: true,
            message: "Reissued report sent!",
            data: data,
          });
        }
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
        res.send(err);
      });
    // ! Circulated Books reports generating from a specific day to a specific day
  } else if (req.query.reportName == "circulatedBooks") {
    issueBooks
      .findAll({
        where: {
          issue_date: date,
          // {
          //   [Op.between]: [
          //     req.query.startDate,
          //     req.query.endDate || Date.now(),
          //   ],
          // },
          isReturned: false,
        },
      })
      .then((data) => {
        if (data.length < 1) {
          res.status(200).json({
            result: false,
            message: "No data to show",
          });
        } else {
          res.status(200).json({
            result: true,
            message: "Circulated book report sent!",
            data: data,
          });
        }
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
        res.status(500).json({
          result: false,
          message:
            "Something went wrong while generating Circualted Book report",
          error: err,
        });
      });
    // ! Due dated Books reports generating from a specific day to a specific day
  } else if (req.query.reportName == "dueDatedBooks") {
    issueBooks
      .findAll({
        where: {
          due_date: date,
          // {
          //   [Op.between]: [
          //     req.query.startDate,
          //     req.query.endDate || Date.now(),
          //   ],
          // },
          isReturned: false,
        },
      })
      .then((data) => {
        console.log("Data fetched succesfully!");
        console.log(data.length);
        if (data.length < 1) {
          res.status(200).json({
            result: false,
            message: "No data to show",
          });
        } else {
          res.status(200).json({
            reesult: true,
            message: "Due dated Books data sent successfully!",
            data,
          });
        }
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
        res.status(500).json({
          result: false,
          message:
            "Something went wrong while generating Due dated books report",
          error: err,
        });
      });
    // ! Lost Books reports generating from a specific day to a specific day
  } else if (req.query.reportName == "lostBooks") {
    LostBook.findAll({
      where: {
        date: date,
        // {
        //   [Op.between]: [req.query.startDate, req.query.endDate || Date.now()],
        // },
        // isReturned: false,
      },
    })
      .then((data) => {
        console.log(data);
        res.status(200).json({
          result: true,
          message: "Successfully sent Lost books report",
          data: data,
        });
      })
      .catch((err) => {
        console.log("Something went wrong while generating Lost books report");
        res.status(500).json({
          result: false,
          message: "Something went wrong while generating Lost books report",
          error: err,
        });
      });
  }
};
