const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUpdateUser } = require("../middleware/validation");
const auth = require("../middleware/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", validateUpdateUser, updateUser);

module.exports = router;
