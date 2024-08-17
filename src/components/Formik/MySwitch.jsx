import { Switch, FormLabel } from '@chakra-ui/react'
import { FormControl } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const MySwitch = ({ label, setFieldValue, value, ...props }) => {
  return (
    <FormControl display="flex" alignItems="center" justifyContent="center">
      <FormLabel mb="0">{label}</FormLabel>
      <Switch
        {...props}
        isChecked={value}
        onChange={() => setFieldValue('saved', !value)}
      />
    </FormControl>
  )
}

MySwitch.propTypes = {
  label: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
}

export default MySwitch
