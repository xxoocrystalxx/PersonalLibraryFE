import { Suspense, lazy, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
// import BookList from './components/BookList'
// import SignUp from './components/Header/SignUp'
// import SignIn from './components/Header/SignIn'
// import Navigation from './components/Header/Navigation'
// import AddBook from './components/AddBook'
// import Migrate from './components/Migrate';
import useBooks from './hooks/useBooks'
import { useConfig } from './hooks/useConfig'

const SignUp = lazy(() => import('./components/Header/SignUp'))
const SignIn = lazy(() => import('./components/Header/SignIn'))
const AddBook = lazy(() => import('./components/AddBook'))
const BookList = lazy(() => import('./components/BookList'))
const Navigation = lazy(() => import('./components/Header/Navigation'))

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
      <Suspense fallback={<div>Loading Navigation...</div>}>
        <Navigation setToken={setToken} refetch={refetch} />
      </Suspense>

      <Routes>
        {showSignUp && (
          <Route
            path="/SignUp"
            element={
              <Suspense fallback={<div>Loading SignUp...</div>}>
                <SignUp setToken={setToken} />
              </Suspense>
            }
          />
        )}
        <Route
          path="/SignIn"
          element={
            <Suspense fallback={<div>Loading SignIn...</div>}>
              <SignIn setToken={setToken} />
            </Suspense>
          }
        />
        <Route
          path="/AddBook"
          element={
            <Suspense fallback={<div>Loading AddBook...</div>}>
              <AddBook setToken={setToken} />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading BookList...</div>}>
              <BookList books={nodes} handleFetchMore={handleFetchMore} />
            </Suspense>
          }
        />
      </Routes>
    </>
  )
}

export default App
