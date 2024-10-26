const router = require("express").Router();
const { getUsers, updateProfile } = require("../controllers/users");

router.get("/me", getUsers);
router.patch("/me", updateProfile);
//router.get("/:userId", getUserById);
//router.post("/", createUser);

module.exports = router;
