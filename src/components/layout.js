import React from "react"

// import { rhythm, scale } from "../utils/typography"
import Navigation from './Navigation'
import '../styles/main.scss'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <div>
      <Navigation />
      <div>
        <div className="container">
          <main className="container__inner">
            {children}
          </main>
        </div>
      </div>
        <footer className="footer">
          © {new Date().getFullYear()}, John Raptis
          {` `}
          {/*<a href="https://www.gatsbyjs.org">John Raptis</a>*/}
        </footer>
      </div>
    )
  }
}

export default Layout
