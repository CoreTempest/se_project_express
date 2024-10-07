const ClothingItem = require("../models/clothingItem");

const { INT_SERVER_ERROR_CODE, BAD_REQUEST_CODE } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  const { owner } = req.user._id;

  ClothingItem.create({ name, weather, imageURL, owner })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res
        .status(INT_SERVER_ERROR_CODE)
        .send({ message: `${INT_SERVER_ERROR_CODE} Server Error` });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({}).then((items) => res.status(200).send(items));

  if (err.name === "ValidationError") {
    res
      .status(BAD_REQUEST_CODE)
      .send({ message: `${BAD_REQUEST_CODE} Validation Failed` });
  } else if (err.name === "") {
    res
      .status(INT_SERVER_ERROR_CODE)
      .send({ message: `${INT_SERVER_ERROR_CODE} Server Error` });
  }
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(req.params.itemId)
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((error) => returnError(res, error));
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(req.params.itemId)
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((error) => returnError(res, error));
};

/* const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(INT_SERVER_ERROR_CODE).send({
        message: `${INT_SERVER_ERROR_CODE}: an unknown error has occurred`,
      });
    });
}; */

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}));
  if (err.name === "CastError") {
    res
      .status(BAD_REQUEST_CODE)
      .send({ message: `${BAD_REQUEST_CODE} Validation Failed` });
  } else if (err.name === "") {
    res
      .status(INT_SERVER_ERROR_CODE)
      .send({ message: `${INT_SERVER_ERROR_CODE} Server Error` });
  }
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
