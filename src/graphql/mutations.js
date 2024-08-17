import { gql } from '@apollo/client';
import { BOOK_DETAILS } from './fragments';

export const SIGN_UP = gql`
mutation createUser( $username: String!, $passwordHash: String!) {
  createUser(username: $username, passwordHash: $passwordHash) {
    username
  }
}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $male: String, $female: String, $description: String, $comment: String, $time: String!, $rating: Int, $genres: [String!], $saved: Boolean!) {
  addBook(
    title: $title,
    author: $author,
    male: $male,
    female: $female,
    description: $description,
    comment: $comment
    time: $time,
    rating: $rating,
    genres: $genres,
    saved: $saved
  ) {
    ...BookDetails
  }
} ${BOOK_DETAILS}
`