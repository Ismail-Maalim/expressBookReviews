const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const SECRET_KEY = "fingerprint_customer";

let users = [];




/*const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}*/

const isValid = (username) => {
    return users.some((user) => user.username === username);
  };
  const authenticatedUser = (username, password) => {
    return users.some((user) => user.username === username && user.password === password);
  };

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  const SECRET_KEY = "fingerprint_customer";
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  // Validate the credentials
  if (authenticatedUser(username, password)) {
    // Generate JWT token (expires in 1 hour)
    let accessToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    // Save token and username to session
    req.session.authorization = {
      accessToken,
      username
    };
    
    return res.status(200).json({ message: "User successfully logged in", token: accessToken });
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

  const isbn = req.params.isbn;
  const reviewContent = req.query.review; // Retrieve review from request query parameters
  const username = req.user.username; // Obtained from the verified JWT token
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }
  if (!reviewContent) {
    return res.status(400).json({ message: "Review content is required in query parameter (?review=...)" });
  }
  // Set or update the review under the logged-in user's name
  books[isbn].reviews[username] = reviewContent;
  
  return res.status(200).send(JSON.stringify({ 
    message: "Review successfully added/updated", 
    reviews: books[isbn].reviews 
  }, null, 4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
