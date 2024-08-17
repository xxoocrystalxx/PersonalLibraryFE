import { gql } from '@apollo/client';
import { BOOK_DETAILS } from './fragments';

export const USER_INFO = gql`
query {
  me {
    username
  }
}
`

export const GET_AUTHORS = gql`
query {
  allAuthors {
    name
  }
}
`

export const GET_GENRES = gql`
query {
  allGenres {
    name
  }
}
`
export const GET_BOOKS = gql`
query allBooks($search:String, $first: Int, $after: String){
  allBooks (search:$search,first:$first,after:$after){
    edges {
      cursor
      node {
        ...BookDetails
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}${BOOK_DETAILS}
`