import { useField } from 'formik'
import { FormControl, FormErrorMessage } from '@chakra-ui/react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import PropTypes from 'prop-types'

const SelectField = ({ name, createble, ...props }) => {
  const [field, meta, helpers] = useField(name)
  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      {createble ? (
        <CreatableSelect
          {...props}
          {...field}
          onChange={(option) => helpers.setValue(option.value)}
          value={
            props.options
              ? props.options.find((option) => option.value === props.value)
              : ''
          }
        />
      ) : (
        <Select
          {...field}
          {...props}
          value={
            props.options
              ? props.options.find((option) => option.value === props.value)
              : ''
          }
          onChange={(option) => helpers.setValue(option.value)}
        />
      )}

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  createble: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.string,
}

export default SelectField
