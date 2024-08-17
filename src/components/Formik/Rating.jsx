import { Stack } from '@chakra-ui/react'
import Ratings from 'react-ratings-declarative'
import PropTypes from 'prop-types'

const MyRating = ({ value, setFieldValue }) => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Ratings
        rating={value}
        widgetRatedColors="teal"
        changeRating={(value) => setFieldValue('rating', value)}
        widgetHoverColors="teal"
        justifyContent="center"
      >
        <Ratings.Widget widgetDimension="30px" />
        <Ratings.Widget widgetDimension="30px" />
        <Ratings.Widget widgetDimension="30px" />
        <Ratings.Widget widgetDimension="30px" />
        <Ratings.Widget widgetDimension="30px" />
      </Ratings>
    </Stack>
  )
}

MyRating.propTypes = {
  value: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
}

export default MyRating
