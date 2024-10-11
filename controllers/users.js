const User = require("../models/user");

const {
  INT_SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
} = require("../utils/errors");

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INT_SERVER_ERROR_CODE)
        .send({ message: `${INT_SERVER_ERROR_CODE} Server Error` });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: `${BAD_REQUEST_CODE} Validation Failed` });
      }
      return res
        .status(INT_SERVER_ERROR_CODE)
        .send({ message: `${INT_SERVER_ERROR_CODE} Server Error` });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFound") {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: `${NOT_FOUND_CODE} Information Not Found` });
      } else if (err.name === "CastError") {
        res
          .status(BAD_REQUEST_CODE)
          .send({ message: `${BAD_REQUEST_CODE} Incomplete information` });
      }
      return res
        .status(INT_SERVER_ERROR_CODE)
        .send({ message: `${INT_SERVER_ERROR_CODE} Server Error` });
    });
};

module.exports = { getUsers, createUser, getUserById };
