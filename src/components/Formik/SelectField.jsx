import { useField } from 'formik'
import { FormControl, FormErrorMessage } from '@chakra-ui/react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import PropTypes from 'prop-types'

const SelectField = ({ name, createble, ...props }) => {
  const [field, meta, helpers] = useField(name)

  const getSelectedOption = () => {
    if (props.options && field.value) {
      return (
        props.options.find((option) => option.value === field.value) || {
          label: field.value,
          value: field.value,
        }
      )
    }
    return ''
  }

  const SelectComponent = createble ? CreatableSelect : Select

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <SelectComponent
        {...props}
        {...field}
        value={getSelectedOption()}
        onChange={(option) => helpers.setValue(option.value)}
      ></SelectComponent>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  createble: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.string,
}

export default SelectField
