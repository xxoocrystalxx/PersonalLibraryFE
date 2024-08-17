import { Suspense, lazy, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
// import Migrate from './components/Migrate';
import useBooks from './hooks/useBooks'
import { useConfig } from './hooks/useConfig'
import Loader from './components/Loader'

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
      <Suspense fallback={<Loader />}>
        <Navigation setToken={setToken} refetch={refetch} />
      </Suspense>

      <Routes>
        {showSignUp && (
          <Route
            path="/SignUp"
            element={
              <Suspense fallback={<Loader />}>
                <SignUp setToken={setToken} />
              </Suspense>
            }
          />
        )}
        <Route
          path="/SignIn"
          element={
            <Suspense fallback={<Loader />}>
              <SignIn setToken={setToken} />
            </Suspense>
          }
        />
        <Route
          path="/AddBook"
          element={
            <Suspense fallback={<Loader />}>
              <AddBook setToken={setToken} />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <BookList books={nodes} handleFetchMore={handleFetchMore} />
            </Suspense>
          }
        />
      </Routes>
    </>
  )
}

export default App