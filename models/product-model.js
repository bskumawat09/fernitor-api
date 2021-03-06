const mongoose = require("mongoose");
const Review = require("./review-model");
const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		name: {
			type: String,
			unique: [true, "product with the same name already exist"],
			required: true
		},
		price: {
			type: Number,
			default: 0,
			min: 0
		},
		image: {
			url: String,
			filename: String
		},
		color: {
			type: String,
			lowercase: true
		},
		category: {
			type: String,
			lowercase: true
		},
		description: {
			type: String,
			default: null
		},
		isFeatured: {
			type: Boolean,
			default: false
		},
		inStock: {
			type: Boolean,
			default: true
		},
		onSale: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

// virtual populate
productSchema.virtual("reviews", {
	ref: "Review",
	foreignField: "product",
	localField: "_id"
});

// mongoose query middleware, triggers when a product gets deleted, it deletes all reviews associated with product
productSchema.post("findOneAndDelete", async (doc) => {
	if (doc) {
		await Review.deleteMany({
			_id: { $in: doc.reviews }
		});
		// TODO: Remove product from cart if product no longer exists
	}
});

module.exports = mongoose.model("Product", productSchema, "products");
