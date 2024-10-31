const ClothingItem = require("../models/clothingItem");

const {
  INT_SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  FORBIDDEN,
  returnError,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res
          .status(BAD_REQUEST_CODE)
          .send({ message: `${BAD_REQUEST_CODE} Validation Failed` });
      } else {
        res
          .status(INT_SERVER_ERROR_CODE)
          .send({ message: `${INT_SERVER_ERROR_CODE} Server Error` });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.status(200).send(item))
    .catch((error) => {
      if (error.name === "ValidationError") {
        res
          .status(BAD_REQUEST_CODE)
          .send({ message: `${BAD_REQUEST_CODE} Validation Failed` });
      } else {
        res
          .status(INT_SERVER_ERROR_CODE)
          .send({ message: `${INT_SERVER_ERROR_CODE} Server Error` });
      }
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((error) => returnError(res, error));
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
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
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      const ownerId = item.owner.toString();

      if (userId !== ownerId) {
        return res
          .status(FORBIDDEN)
          .send({ message: "You do not have permission to delete this item" });
      }
      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.send({ message: "Item deleted successfully " })
      );
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res
          .status(BAD_REQUEST_CODE)
          .send({ message: `${BAD_REQUEST_CODE} Validation Failed` });
      }
      if (error.name === "DocumentNotFoundError") {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: `${NOT_FOUND_CODE} Document Not Found` });
      } else {
        res
          .status(INT_SERVER_ERROR_CODE)
          .send({ message: `${INT_SERVER_ERROR_CODE} Server Error` });
      }
      return ClothingItem.findByIdAndDelete(itemId);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
