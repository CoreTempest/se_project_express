const router = require("express").Router();
const clothingItem = require("./clothingItems");
const { NOT_FOUND_CODE } = require("../utils/errors");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItem);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res
    .status(NOT_FOUND_CODE)
    .send({ message: `${NOT_FOUND_CODE} Router not found` });
});

module.exports = router;
