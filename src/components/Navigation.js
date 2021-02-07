import React, { Fragment, useEffect, useState } from "react"
import { Link } from "gatsby"
import favicon from "../../content/assets/favicon.png"

const Navigation = ({changeTheme, icon}) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", navOnScroll)

    return _ => {
      window.removeEventListener("scroll", navOnScroll)
    }
  })

  const navOnScroll = () => {
    if (window.scrollY > 80) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }

    const logoIcon = document.querySelector(".nav__brand a img")

    logoIcon.style.transform = `rotate(-${window.scrollY / 10}deg)`
  }

  return (
    <Fragment>
      <div className="ball"></div>
      <div className="tilt-bg"></div>

      <nav className={scrolled ? "nav scrolled" : "nav"}>
        <div className="nav__container">
          <div className="nav__brand">
            <Link to="/">
              <img src={favicon} className="nav__favicon" alt="favicon" />
              <span className="nav__site-title">John Raptis</span>
            </Link>
          </div>

          <div className="nav__social">
          <Link to="/about">About</Link>
            <Link to="/blog">Articles</Link>
            <a href="https://garden.johnraptis.dev/" target="_blank">Garden</a>

            <div onClick={() => changeTheme()} className="nav__theme-icon">
              <img src={icon} />
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  )
}

export default Navigation
