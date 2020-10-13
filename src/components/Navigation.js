import React, { Fragment, useEffect, useState } from "react"
import { Link } from "gatsby"
import github from "../../content/assets/github-icon.svg"
import twitter from "../../content/assets/twitter-icon.svg"
import favicon from "../../content/assets/favicon.png"

const Navigation = () => {
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
    // console.log((window.scrollY / document.body.clientHeight) * 100)
    // const scrollPercentage = (window.scrollY / document.body.clientHeight) * 100
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

          <div className="nav__links">
            <Link to="/about">About</Link>
            <Link to="/blog">Articles</Link>
            {/* <Link to="/ideas">Ideas</Link> */}
          </div>

          <div className="nav__social">
            <a
              href="https://twitter.com/JohnRaptisM"
              target="_blank"
              rel="noopener noreferrer"
              title="twitter"
            >
              <img src={twitter} className="nav__social-icons" alt="twitter" />
            </a>
            <a
              href="https://github.com/raptisj"
              target="_blank"
              rel="noopener noreferrer"
              title="github"
            >
              <img src={github} className="nav__social-icons" alt="github" />
            </a>
          </div>
        </div>
      </nav>
    </Fragment>
  )
}

export default Navigation
