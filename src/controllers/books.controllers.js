const Book = require('../models/book')



// otbener todos los libros
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({ estado: true })
            .populate('categoria', 'name'); // Rellena el campo 'categoria' con el campo 'name' de la colección Categoria
        const totalBooks = books.length;
        res.json({
            totalBooks,
            books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
};


// LIBRO POR ID
const getBookId = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id)
            .populate('categoria', 'name'); // Rellena el campo 'categoria' con el campo 'name' de la colección Categoria
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el libro' });
    }
};


// crear book
const createBook = async(req,res)=> {

    const {title, author, categoria, pages, publication_date} = req.body

    const databooks = {
      title,
      author,
      categoria,
      pages,
      publication_date
    }

    const book = new Book(databooks)
    
    await book.save(

      res.status(201).json(book)
    )

}


//Actualizar libro
const updateBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        res.json(book);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
};




//Eliminar libro
const deleteBook = async(req,res)=> {

    const {id} = req.params;

    try {
        const book = await Book.findByIdAndUpdate(id, {estado:false});

        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        res.json({
            message: "Libro eliminado correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el libro' });
    }
};



module.exports = {
    getAllBooks,
    getBookId,
    createBook,
    updateBook,
    deleteBook
}