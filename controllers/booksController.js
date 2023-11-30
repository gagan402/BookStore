const Book = require("../model/book");

const getAllBooks = async (req, resp, next) => {
    let books;
    try {
        books = await Book.find();
        //if we dont provide any parameter for find method it return all books which are now there in books variable
    }
    catch (err) {
        console.log(err);
    }
    if (!books) {
        return resp.status(404).json({ message: "No products found" })
    }
    else {
        return resp.status(200).json({ books });
    }
}

const getById = async (req,resp,next) => {
    const id = req.params.id;
    let book;
    try{
        book = await Book.findById(id);
    }
    catch(err){
        console.log(err);
    }

    if (!book) {
        return resp.status(404).json({ message: "No Book Found" });
    }
    else {
        return resp.status(200).json({ book });
    }
}

const updateBook = async (req,resp,next) => {
    const id = req.params.id;
    const { name, author, description, price, available } = req.body;
    let book;
    try{
        book = await Book.findByIdAndUpdate(id,{
            name,
            author,
            description,
            price,
            available
        });
        book = await book.save()
    }
    catch (err) {
        console.log(err);
    }

    if (!book) {
        return resp.status(404).json({ message: "Unable to update by this id" });
    }
    else {
        return resp.status(200).json({ book });
    }
}

const addBooks = async (req, resp, next) => {
    const { name, author, description, price, available } = req.body;
    let book;
    try {
        book = new Book({

            name,
            author,
            description,
            price,
            available
        });
        await book.save();
    }
    catch (err) {
        console.log(err);
    }

    if (!book) {
        return resp.status(500).json({ message: "Unable to add" });
    }
    else {
        return resp.status(201).json({ book });
    }
}

const deleteBook = async(req,resp,next) =>{
    const id = req.params.id;
    let book;
    try{
        book = await Book.findByIdAndDelete(id);
    }
    catch(err){
        console.log(err);
    }

    if (!book) {
        return resp.status(404).json({ message: "Unable to delete" });
    }
    else {
        return resp.status(200).json({ message: "book deleted" });
    }
}
exports.getAllBooks = getAllBooks
exports.addBooks = addBooks
exports.getById = getById
exports.updateBook = updateBook
exports.deleteBook = deleteBook