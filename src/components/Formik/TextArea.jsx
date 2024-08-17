import { useField } from 'formik'
import { Textarea, FormControl, FormErrorMessage } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const TextArea = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <Textarea
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
        {...field}
        {...props}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
}

export default TextArea
