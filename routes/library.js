import express  from 'express';
import {v4 as uuidv4} from 'uuid';


const router = express.Router();

//mock database
let books = [
    // {
    //     "Title": "The Grass is Always Greener",
    //     "ISBN": 123,
    //     "Category": "Modern Times",
    //     "Author": "Jeffrey Archer",
    //     "Publisher": "Berkleny",
    //     "Status": "Available"
    // },
    // {
    //     "Title": "Murder!",
    //     "ISBN": 124,
    //     "Category": "Crime",
    //     "Author": "Arnold Bennett",
    //     "Publisher": "G.P. Putnam's Sons",
    //     "Status": "Available"
    // }
];

// GET REQUEST
router.get('/', (req, res) => {
    
    res.send(books)
});
// POST REQUEST
router.post('/', (req, res) => {
    
    const library = req.body//request message body for library
  
    books.push({ ...library, id: uuidv4() });
// const libraryWithId = { ...library, id: uuidv4() } //spread operator and create new object ang tawag sa { ...library, id: libraryId}
    res.send(`The Book with the title of ${library.Title} authored by ${library.Author} added to the database`);
})
// SEARCH REQUEST
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundLibrary = books.find((library) => library.id === id)

    res.send(foundLibrary);
})
// DELETE REQUEST
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    books = books.filter((library) => library.id !== id);
    //If the id is not equal to the unique id, the other book will remain
    res.send(`books with the id ${id} deleted from the database`)
});
// UPDATE REQUEST
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { Title, ISBN, Category, Author, Publisher, Status} = req.body;

    const library = books.find((library) => library.id === id);

    if(Title) library.Title = Title;
    if(ISBN) library.ISBN = ISBN;
    if(Category) library.Category = Category;
    if(Author) library.Author = Author;
    if(Publisher) library.Publisher = Publisher;
    if(Status) library.Status = Status; 

    res.send(`Book with the ${id} has been updated`);
});

export default router;