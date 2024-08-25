import { gql } from '@apollo/client'
import { BOOK_DETAILS } from './fragments'

export const USER_INFO = gql`
  query {
    me {
      username
    }
  }
`

export const GET_AUTHORS = gql`
  query allAuthors(
    $search: String
    $first: Int
    $after: String
    $sort: String
  ) {
    allAuthors(search: $search, first: $first, after: $after, sort: $sort) {
      edges {
        cursor
        node {
          id
          name
          bookCount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`
export const GET_AUTHORS_SYMPLY = gql`
  query {
    allAuthorSimply {
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
  query allBooks($search: String, $first: Int, $after: String) {
    allBooks(search: $search, first: $first, after: $after) {
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
  }
  ${BOOK_DETAILS}
`
