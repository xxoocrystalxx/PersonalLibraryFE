import { useEffect, useState } from 'react'
import {
  Box,
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  InputLeftElement,
} from '@chakra-ui/react'
import { Search2Icon, CloseIcon } from '@chakra-ui/icons'
import { useDebounce } from 'use-debounce'
import PropTypes from 'prop-types'

const SearchBar = ({ refetch }) => {
  const [search, setSearch] = useState('')
  const [value] = useDebounce(search, 500)

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    refetch({ search: value })
  }, [refetch, value])

  return (
    <Box w="40%">
      <InputGroup>
        <InputLeftElement>
          <Search2Icon color="cyan.500" />
        </InputLeftElement>
        <Input
          placeholder="search book"
          value={search}
          onChange={handleSearch}
        />
        <InputRightElement>
          <IconButton
            icon={<CloseIcon />}
            onClick={() => setSearch('')}
            bg={'white'}
            size="sm"
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

SearchBar.propTypes = {
  refetch: PropTypes.func.isRequired,
}

export default SearchBar
