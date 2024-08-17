import { gql  } from '@apollo/client'
export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    male
    female
    description
    comment
    time
    rating
    genres {
      name
    }
    saved
    id
  }
`