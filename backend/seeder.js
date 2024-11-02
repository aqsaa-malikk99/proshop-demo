// Import necessary packages and modules
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Function to import data into the database
const importData = async () => {
  try {
    // Clear existing data from collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert users and assign the first one as admin
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Prepare products with admin user as creator
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert sample products
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Function to destroy data from the database
const destroyData = async () => {
  try {
    // Clear all collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check command-line arguments to determine action
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
