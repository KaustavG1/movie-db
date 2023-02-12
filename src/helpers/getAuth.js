import { useSelector } from 'react-redux'

export default function getAuth() {
  const auth = useSelector(state => state.auth)
  return Boolean(auth.length)
}
