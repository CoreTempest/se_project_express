const router = require("express").Router();
const { getUserById, updateProfile } = require("../controllers/users");

router.get("/me", getUserById);
router.patch("/me", updateProfile);
//router.get("/:userId", getUserById);
//router.post("/", createUser);

module.exports = router;
