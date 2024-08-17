import { Spinner } from '@chakra-ui/react'

const Loader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Spinner color="red.500" />
  </div>
)

export default Loader
