const express = require("express");
const { isLoggedIn, isAuthor, permit } = require("../middleware");
const userController = require("../controllers/users");

const router = express.Router();

// get all users
router.get("/", isLoggedIn, permit("admin"), userController.getUsers);

// get user's cart
router.get("/:uid/cart", isLoggedIn, isAuthor, userController.getUserCart);

// add product to cart
router.put(
	"/:uid/cart",
	isLoggedIn,
	isAuthor,
	permit("user"),
	userController.addToCart
);

// remove product from cart
router.delete(
	"/:uid/cart/:pid",
	isLoggedIn,
	isAuthor,
	userController.removeFromCart
);

// get user stats
router.get("/stats", isLoggedIn, permit("admin"), userController.getUserStats);

// get a user
router.get("/:uid", isLoggedIn, isAuthor, userController.getUser);

// update user
router.put(
	"/:uid",
	isLoggedIn,
	isAuthor,
	permit("user"),
	userController.updateUser
);

module.exports = router;
