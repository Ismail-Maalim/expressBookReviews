const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
   return res.status(200).send(JSON.stringify(books, null, 4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; // Retrieve the ISBN from request parameters
  
  if (books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn], null, 4));
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const authorName = req.params.author.toLowerCase();
  const matchedBooks = {};
  // Obtain all the keys for the 'books' object and iterate through them
  Object.keys(books).forEach((isbn) => {
    if (books[isbn].author.toLowerCase() === authorName) {
      matchedBooks[isbn] = books[isbn];
    }
  });
  if (Object.keys(matchedBooks).length > 0) {
    return res.status(200).send(JSON.stringify(matchedBooks, null, 4));
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  const titleName = req.params.title.toLowerCase();
  const matchedBooks = {};
  // Obtain all the keys for the 'books' object and iterate through them
  Object.keys(books).forEach((isbn) => {
    if (books[isbn].title.toLowerCase() === titleName) {
      matchedBooks[isbn] = books[isbn];
    }
  });
  if (Object.keys(matchedBooks).length > 0) {
    return res.status(200).send(JSON.stringify(matchedBooks, null, 4));
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
