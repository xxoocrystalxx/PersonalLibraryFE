import { Suspense, lazy, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
// import Migrate from './components/Migrate';
import useBooks from './hooks/useBooks'
import { useConfig } from './hooks/useConfig'
import Loader from './components/Loader'

const SignUp = lazy(() => import('./components/Header/SignUp'))
const SignIn = lazy(() => import('./components/Header/SignIn'))
const BookList = lazy(() => import('./components/BookList'))
const Navigation = lazy(() => import('./components/Header/Navigation'))
const AuthorList = lazy(() => import('./components/AuthorList'))

function App() {
  // const {data, loading} = useUserInfo()
  const [token, setToken] = useState(null)

  const { books, handleFetchMore, refetch, error } = useBooks({
    first: 20,
  })

  const nodes = books ? books.edges.map((edge) => edge.node) : []

  const config = useConfig()
  const showSignUp = config.REACT_APP_SHOW_SIGNUP === 'true'

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Navigation setToken={setToken} refetch={refetch} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Routes>
          {showSignUp && (
            <Route path="/SignUp" element={<SignUp setToken={setToken} />} />
          )}
          <Route path="/SignIn" element={<SignIn setToken={setToken} />} />
          <Route
            path="/"
            element={
              <BookList
                books={nodes}
                handleFetchMore={handleFetchMore}
                error={error}
                refetch={refetch}
                token={token}
              />
            }
          />
          <Route path="/AuthorList" element={<AuthorList />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
