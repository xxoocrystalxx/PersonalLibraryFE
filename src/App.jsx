import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import BookList from './components/BookList'
import SignUp from './components/Header/SignUp'
import SignIn from './components/Header/SignIn'
import Navigation from './components/Header/Navigation'
import AddBook from './components/AddBook'
// import Migrate from './components/Migrate';
import useBooks from './hooks/useBooks'
import { useConfig } from './hooks/useConfig'

function App() {
  // const {data, loading} = useUserInfo()
  // console.log(data);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(null)
  const { books, handleFetchMore, refetch } = useBooks({ first: 5 })

  const nodes = books ? books.edges.map((edge) => edge.node) : []

  const config = useConfig()
  const showSignUp = config.REACT_APP_SHOW_SIGNUP === 'true'

  return (
    <>
      <Navigation setToken={setToken} refetch={refetch} />
      <Routes>
        {showSignUp && (
          <Route path="/SignUp" element={<SignUp setToken={setToken} />} />
        )}
        <Route path="/SignIn" element={<SignIn setToken={setToken} />} />
        <Route path="/AddBook" element={<AddBook setToken={setToken} />} />
        <Route
          path="/"
          element={<BookList books={nodes} handleFetchMore={handleFetchMore} />}
        />
      </Routes>
    </>
  )
}

export default App
