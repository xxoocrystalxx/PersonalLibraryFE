import {
  Heading,
  Button,
  Stack,
  Box,
  useToast,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import CreatableSelect from 'react-select/creatable'
import PropTypes from 'prop-types'

import TextInput from './Formik/TextInput'
import useAddBook from '../hooks/useAddBook'
import useAuthors from '../hooks/useAuthors'
import TextArea from './Formik/TextArea'
import MyRating from './Formik/Rating'
import useGenres from '../hooks/useGenres'
import SelectField from './Formik/SelectField'
import MySwitch from './Formik/MySwitch'
import useEditBook from '../hooks/useEditBook'

const timeOptions = [
  { value: '古代', label: '古代' },
  { value: '现代', label: '现代' },
  { value: '未世', label: '未世' },
]

const validationSchema = yup.object().shape({
  title: yup.string().required('title is required'),
  author: yup.string().required('author is required'),
  time: yup.string().required('time is required'),
})

const AddBook = ({ isOpen, onClose, refetch, book }) => {
  const [addBook] = useAddBook()
  const [editBook] = useEditBook()
  const { authors } = useAuthors()
  const { genres } = useGenres()
  const toast = useToast()

  if (!authors || !genres) return null

  let initialValues = {
    title: '',
    author: '',
    male: '',
    female: '',
    description: '',
    comment: '',
    time: '古代',
    rating: 0,
    genres: [],
    saved: false,
  }

  const getGenreOptions = (genres) => {
    return genres.map((g) => ({
      label: g.name,
      value: g.name,
    }))
  }

  if (book) {
    initialValues = {
      title: book.title,
      author: book.author.name,
      male: book.male,
      female: book.female,
      description: book.description,
      comment: book.comment,
      time: book.time,
      rating: book.rating,
      genres: getGenreOptions(book.genres),
      saved: book.saved,
    }
  }

  const options = authors.map((a) => ({
    label: a.name,
    value: a.name,
  }))

  const genreOptions = getGenreOptions(genres)

  const onSubmit = async (values, { resetForm }) => {
    const {
      title,
      author,
      male,
      female,
      description,
      comment,
      time,
      rating,
      saved,
    } = values
    // console.log(values)
    const genres = values.genres ? values.genres.map((g) => g.value) : []
    try {
      if (book) {
        await editBook({
          id: book.id,
          title,
          author,
          male,
          female,
          description,
          comment,
          time,
          rating,
          genres,
          saved,
        })
        onClose()
      } else {
        await addBook({
          title,
          author,
          male,
          female,
          description,
          comment,
          time,
          rating,
          genres,
          saved,
        })
      }

      toast({
        title: book ? `Book ${title} edited` : `Book ${title} created`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      resetForm(initialValues)

      refetch()
    } catch (e) {
      toast({
        title: e.graphQLErrors[0].message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Heading color="teal.400">{book ? 'Edit Book' : 'Add Book'}</Heading>
        </DrawerHeader>

        <DrawerBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form id="my-form">
                <Stack spacing="24px">
                  <Box>
                    <TextInput name="title" placeholder="title" />
                  </Box>
                  <Box>
                    <SelectField
                      name="author"
                      placeholder=" Author "
                      options={options}
                      createble="true"
                      value={props.values.author}
                    />
                  </Box>
                  <Stack direction={['column', 'row', 'row', 'row']}>
                    <SelectField
                      name="time"
                      placeholder="时代背景"
                      options={timeOptions}
                      isSearchable="false"
                      value={props.values.time}
                    />
                    <MySwitch
                      name="saved"
                      value={props.values.saved}
                      setFieldValue={props.setFieldValue}
                      label="Saved?"
                      size="lg"
                    />
                  </Stack>
                  <Stack direction={['column', 'row', 'row', 'row']}>
                    <TextInput name="male" placeholder="男主角" />
                    <TextInput name="female" placeholder="女主角" />
                  </Stack>
                  <Box>
                    <CreatableSelect
                      name="genres"
                      isMulti
                      placeholder=" Genres "
                      closeMenuOnSelect={false}
                      onChange={(newvalue) =>
                        props.setFieldValue('genres', newvalue)
                      }
                      value={props.values.genres}
                      options={genreOptions}
                    />
                  </Box>

                  <Box>
                    <TextArea name="description" placeholder="文案" />
                  </Box>
                  <Box>
                    <TextArea name="comment" placeholder="评论" />
                  </Box>

                  <Box>
                    <MyRating
                      name="rating"
                      value={props.values.rating}
                      setFieldValue={props.setFieldValue}
                    />
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" type="submit" form="my-form">
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

AddBook.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  values: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    saved: PropTypes.bool.isRequired, // Assuming saved is a boolean
    genres: PropTypes.arrayOf(),
    author: PropTypes.string,
    time: PropTypes.string,
  }),
  setFieldValue: PropTypes.func,
  refetch: PropTypes.func,
  book: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
    }),
    comment: PropTypes.string,
    description: PropTypes.string,
    female: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    male: PropTypes.string,
    rating: PropTypes.number,
    saved: PropTypes.bool,
    time: PropTypes.string,
    id: PropTypes.string,
  }),
}

export default AddBook
