// let types = require('../my_Type.json')
//migrate from mysql database to mondoDB
import useAddBook from '../hooks/useAddBook'

let booktypes = require('../my_BookType.json')
let books = require('../my_Book.json')

const Migrate = () => {
  // console.log(booktypes)
  // console.log(books)
  const [addBook] = useAddBook()
  const handle = (event) => {
    event.preventDefault()

    books.forEach( async b => {

      const find = booktypes.filter( a=> a.BookType_Book_id===b.Book_id)

      const mytypes = find 
        ? find.map( f => f.BookType_name)
        : []

      // console.log(parseInt(b.Book_rating))
      const saved = b.Book_saved === "Yes" 
       ? true
       : false

      try {
        await addBook( {title:b.Book_name,
            author:b.Book_author_name,
            male:b.Book_male,
            female:b.Book_female,
            description:b.Book_desc,
            comment:b.Book_comment,
            time:b.Book_time,
            rating:parseInt(b.Book_rating),
            saved,
            genres:mytypes})
      } catch (e) {
        console.log(b.Book_name, e)
      }
  })  
  }

  return (<button onClick={handle}>Migrate</button>)
}

export default Migrate