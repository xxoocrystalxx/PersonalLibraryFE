import { createContext, useEffect, useState } from 'react'
import Loader from '../components/Loader'
import PropTypes from 'prop-types'

export const ConfigContext = createContext()

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 100000))
        const response = await fetch('api/config')
        const data = await response.json()
        setConfig(data)
      } catch (error) {
        console.log('Failed to fetch configuration', error)
      }
    }

    fetchConfig()
  }, [])

  if (!config) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Loader />
      </div>
    )
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// export const useConfig = () => {
//   return useContext(ConfigContext)
// }
