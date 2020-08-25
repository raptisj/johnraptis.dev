import React from "react"
import Navigation from "./Navigation"
import "../styles/main.scss"

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <Navigation />
        <div>
          <div className="container">
            <main className="container__inner">{children}</main>
          </div>
        </div>
        <footer className="footer">
          © {new Date().getFullYear()}, John Raptis
          {` `}
        </footer>
      </div>
    )
  }
}

export default Layout
