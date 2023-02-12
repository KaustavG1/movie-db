import { API_KEY } from "../../../private/api_secret"
import { arabicContent, englishContent } from "../../constants/locale"
import { localeArabic } from "../../redux/localeSlice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { userLogin } from "../../redux/authSlice"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import "./Details.css"

export default function Details() {
  const isArabic = useSelector(state => state.locale)
  const lang = isArabic ? 'ar' : 'en-US'
  const pageContent = isArabic ? arabicContent : englishContent

  const {
    locale,
    logo,
    logout,
    prevButton,
    nextButton
  } = pageContent

  const dispatch = useDispatch()

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [config, setConfig] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setConfig({baseURL: data?.images?.base_url, size: data?.images?.poster_sizes}))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${lang}&page=${page}`)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err))
  }, [page, isArabic])

  const handlePrev = () => setPage(page => page - 1)
  const handleNext = () => setPage(page => page + 1)

  const handleTranslate = () => {
    dispatch(localeArabic())
  }

  const handleLogout = () => {
    navigate('/login', {replace: true})
    dispatch(userLogin([]))
  }

  return (
    <div>
      <div className="header">
        <span className="login-options" onClick={handleTranslate}>
          {locale}
        </span>
        <span className="logo">{logo}</span>
        <span className="login-options" onClick={handleLogout}>{logout}</span>
      </div>
      <div className="container">
        {movies.map(movie =>
          (<div className="movie-card" key={movie?.title}>
            <img alt="Movie Poster" src={`${config?.baseURL}w342${movie?.poster_path}`} />
            <h3>{movie?.title}</h3>
          </div>))}
      </div>
      <div className="button-wrapper">
        <button onClick={handlePrev} disabled={page - 1 === 0}>
          {prevButton}
        </button>
        <button onClick={handleNext}>
          {nextButton}
        </button>
      </div>
    </div>
  )
}
