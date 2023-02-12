import { arabicContent, englishContent } from "../../constants/locale"
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../redux/authSlice'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import "./Login.css"

export default function Login() {
  const isArabic = useSelector(state => state.locale)
  const pageContent = isArabic ? arabicContent : englishContent

  const {
    loginSign,
    emailPlaceholder,
    passwordPlaceholder,
    loginButton
  } = pageContent

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pword, setPword] = useState('')
  const [isEmailValid, setEmailValid] = useState(false)
  const [isPassValid, setPassValid] = useState(false)

  const handleFormSubmit = event => {
    event.preventDefault()
    dispatch(userLogin({
      id: nanoid(),
      email,
      password: pword
    }))
    navigate('/', { replace: true })
  }

  const validateEmail = value => {
    const isEmailValid = Boolean(value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
    setEmailValid(isEmailValid)
  }

  const validatePassword = value => {
    // Check if password is between 8 - 15 characters and has 1 Uppercase letter, 1 Lowecase letter
    // 1 Special Character and 1 Number
    const isPasswordValid = Boolean(value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/i))
    setPassValid(isPasswordValid)
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
    validateEmail(event.target.value)
  }

  const handlePassChange = event => {
    setPword(event.target.value)
    validatePassword(event.target.value)
  }

  return (
    <div className="login-page">
      <div className="card">
        <h1 className="sign">{loginSign}</h1>
        <form className="login-form">
          <input
            name="email"
            type="email"
            onChange={handleEmailChange}
            value={email}
            placeholder={emailPlaceholder}
            required
          />
          <input
            name="pword"
            type="password"
            onChange={handlePassChange}
            value={pword}
            placeholder={passwordPlaceholder}
            required
          />
          <button
            type="button"
            className="login-button"
            disabled={!(isEmailValid && isPassValid)}
            onClick={handleFormSubmit}
          >
            {loginButton}
          </button>
        </form>
      </div>
    </div>
  )
}
