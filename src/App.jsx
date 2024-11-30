import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import Migrate from './components/Migrate';
import useBooks from "./hooks/useBooks";
import { useConfig } from "./hooks/useConfig";
import Loader from "./components/Loader";
import useAuthors from "./hooks/useAuthors";

const SignUp = lazy(() => import("./components/Header/SignUp"));
const SignIn = lazy(() => import("./components/Header/SignIn"));
const BookList = lazy(() => import("./components/BookList"));
const Navigation = lazy(() => import("./components/Header/Navigation"));
const AuthorList = lazy(() => import("./components/AuthorList"));
const AuthorListWithSavedBook = lazy(() =>
  import("./components/AuthorListWithSavedBook")
);

function App() {
  // const {data, loading} = useUserInfo()
  const [token, setToken] = useState(null);

  const { booksCursor, loading, handleFetchMore, refetch, error } = useBooks({
    first: 10,
  });

  const authorsFetch = useAuthors({
    first: 5,
  });
  const config = useConfig();
  const showSignUp = config.REACT_APP_SHOW_SIGNUP === "true";

  useEffect(() => {
    // Retrieve the token from localStorage if it exists
    const savedToken = localStorage.getItem("library-user-token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Navigation
          setToken={setToken}
          refetch={refetch}
          authorRefetch={authorsFetch.refetch}
        />
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
                booksCursor={booksCursor}
                handleFetchMore={handleFetchMore}
                loading={loading}
                error={error}
                refetch={refetch}
                token={token}
              />
            }
          />
          <Route
            path="/AuthorList"
            element={<AuthorList authorsFetch={authorsFetch} />}
          />
          <Route
            path="/AuthorWithSavedBook"
            element={<AuthorListWithSavedBook />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
