const User = require("../models/user");

const {
  INT_SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  CONFLICT,
} = require("../utils/errors");

const { JWT_SECRET } = require("../utils/config");

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
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 8)
    .then((hash) =>
      User.create({ name, avatar, email, password: hash }).then((user) =>
        res.status(201).send(user)
      )
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: `${BAD_REQUEST_CODE} Validation Failed` });
      }
      if (err.code === 11000) {
        return res
          .status(CONFLICT)
          .send({ message: "User with this email already exists" });
      }
      return res
        .status(INT_SERVER_ERROR_CODE)
        .send({ message: `${INT_SERVER_ERROR_CODE} Server Error` });
    });
};

const updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((updatedProfile) => {
      if (!updatedProfile) {
        return res.status(NOT_FOUND_CODE).send({ message: "User not found" });
      }
      return res.send(updatedProfile);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_CODE).send({ message: "Invalid Data" });
      }
      return res
        .status(INT_SERVER_ERROR_CODE)
        .send({ message: "An error has occurred" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((error) => {
      if (error.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED)
          .send({ message: "Incorrect email or password" });
      }
      return res
        .status(INT_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
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

module.exports = { getUsers, createUser, getUserById, login, updateProfile };
