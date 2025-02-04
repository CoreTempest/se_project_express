const router = require("express").Router();
const clothingItem = require("./clothingItems");
const { NOT_FOUND_CODE } = require("../utils/errors");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const {
  validateUserAuthentication,
  validateUserCreation,
} = require("../middleware/validation");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", userRouter);
router.use("/items", clothingItem);
router.post("/signin", validateUserAuthentication, login);
router.post("/signup", validateUserCreation, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
