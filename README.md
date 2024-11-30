# Personal Library Frotend

- react v18
- chakra ui
- apollo client

## Start

`npm run dev`

- localhost:5173

## Github Actions

- pipeline to build and copy to backend project

# CHANGELOG

## [2024-11-30] Added new functionality

- Added delete book function
- Added delete author function

## [2024-11-03] Added new functionality

- Retrieving author order by book list that are saved.
- Showing author alias in author list
- Add search by author name and author alias.

## [2024-11-02]

- Refactoring BookList extracting BookCard.
- Show author list with their book list.
- Can order by bookCount

## [2024-08-18] New Functionality

- Add list for managing authors
- add buttons in Booklist for edit books
- implemented pagination for authors

## [2024-08-17] Migrating create-app-react to react vite

- Changed component js with jsx
- delete proxy from package.json to vite.config.js
- react vite build is on folder **dist**, not **build**
