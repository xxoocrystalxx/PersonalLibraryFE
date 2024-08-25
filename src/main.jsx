import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities'
import { ConfigProvider } from './configs/config_context'
import { ChakraProvider } from '@chakra-ui/react'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  }
})

const httpLink = new HttpLink({ uri: '/graphql' })

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allBooks: relayStylePagination(),
        allAuthors: relayStylePagination(),
      },
    },
  },
})

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
})

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ConfigProvider>
      <ApolloProvider client={client}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </ConfigProvider>
  </ChakraProvider>
)
