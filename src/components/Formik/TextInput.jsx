import { useField } from 'formik'
import {
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const TextInput = ({ left, right, ...props }) => {
  const [field, meta] = useField(props.name)
  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <InputGroup>
        {left ? (
          <InputLeftElement pointerEvents="none">{left}</InputLeftElement>
        ) : (
          <></>
        )}
        <Input {...field} {...props} />
        {right ? (
          <InputRightElement width="4.5rem">{right}</InputRightElement>
        ) : (
          <></>
        )}
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
}

export default TextInput
