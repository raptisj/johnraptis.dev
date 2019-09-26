import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import github from '../../content/assets/github-icon.svg'
import twitter from '../../content/assets/twitter-icon.svg'
import favicon from '../../content/assets/favicon.png'

  const Navigation = () => (

      <Fragment>
          <div className="tilt-bg"></div>
          <nav className="nav">
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
                </div>
                <div className="nav__social">  
                <a href="https://twitter.com/JohnRaptisM" target="_blank" rel="noopener noreferrer" title="twitter">
                    <img src={twitter} className="nav__social-icons" alt="twitter" />
                </a>
                <a href="https://github.com/john2220" target="_blank" rel="noopener noreferrer" title="github">
                    <img src={github} className="nav__social-icons" alt="github" />
                </a>
                </div>
              </div>
          </nav>
      </Fragment>
    )

export default Navigation