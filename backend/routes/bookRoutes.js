const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// Get all books + search
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const books = await Book.find(filter);

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch books",
      error: error.message
    });
  }
});

// Add book
router.post("/", async (req, res) => {
  try {
    const { title, author, category, status } = req.body;

    const book = new Book({
      title,
      author,
      category,
      status
    });

    await book.save();

    res.status(201).json({
      message: "Book added successfully",
      book
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add book",
      error: error.message
    });
  }
});

// Update book
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json({
      message: "Book updated successfully",
      book
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update book",
      error: error.message
    });
  }
});

// Delete book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json({
      message: "Book deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete book",
      error: error.message
    });
  }
});

module.exports = router;