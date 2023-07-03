const express = require("express");
const { Op } = require("sequelize");
const Book = require("../models/Book");
const issueBooks = require("../models/issueBook");

module.exports = function getBookData(req, res) {
  issueBooks
    .findAll({
      attributes: ["book_id"],
      where: {
        isReturned: false,
      },
    })
    .then((data) => {
      // console.log(data);
      let a = [];
      data.forEach((element) => {
        console.log(element.book_id);
        a.push(element.book_id);
      });
      console.log(a);
      Book.findAll({
        attributes: ["book_id"],
        order: ["book_id"],
        where: {
          book_id: { [Op.notIn]: a },
          isLost: 0,
        },
      }).then((data) => {
        res.status(200).json({
          result: true,
          message: "Inside Get Book COntroller",
          data: data,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        result: false,
        message: "Something went wrong while displaying Book id",
      });
    });
};
