import { useContext } from 'react'
import { ConfigContext } from '../configs/config_context'

export const useConfig = () => {
  return useContext(ConfigContext)
}
