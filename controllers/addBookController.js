const express = require("express");
const Book = require("../models/Book");
const quantity = require("../models/quantity");

module.exports = function addBook(req, res) {
  let b = req.body;
  var quant_Id = req.body.book_id + req.body.quantity;
  var temp = [];

  // res.status(200).json(temp);
  quantity
    .create({
      quantity_id: quant_Id,
      total_quantity: req.body.quantity,
      available_quantity: req.body.quantity,
    })
    .then((data) => {
      for (let index = 1; index <= req.body.quantity; index++) {
        temp[index] = b.book_id + index;
        console.log(b.book_id + index);

        Book.create({
          book_id: (b.book_id + index).toUpperCase(),
          title: b.title,
          sub_title: b.sub_title,
          var_title: b.var_title,
          Author1: b.Author1,
          Author2: b.Author2,
          Author3: b.Author3,
          corp_author: b.corp_author,
          volume: b.volume,
          editor: b.editor,
          edition: b.edition,
          publishers: b.publishers,
          place: b.place,
          year_of_publication: b.year_of_publication,
          date_added: b.date_added,
          date_modified: b.date_modified,
          library: b.library,
          amount: b.amount,
          order_number: b.order_number,
          quantity_id: data.dataValues.quantity_id,
        }).then((data) => {
          if (index == req.body.quantity)
            res.status(200).json({
              result: true,
              message: "Book added successfully!",
            });
        });
      }
    })
    .catch((error) => {
      console.log("Error while adding student data");
      console.log(error);
      res.status(500).json({
        result: false,
        message: "Something went wrong while adding book",
        errorType: error.message,
      });
    });
};
