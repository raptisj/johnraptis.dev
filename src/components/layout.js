import React, { useEffect, useState } from "react"
import Navigation from "./Navigation"
import "../styles/main.scss"
import sun from '../../content/assets/sun.svg'
import moon from '../../content/assets/moon.svg'

const Layout = ({ children }) => {
  const theme = typeof window !== 'undefined' && localStorage.getItem('theme')
  const [isDark, setIdDark] = useState(theme !== null && theme === "dark")


  if (theme === null) {
    localStorage.setItem('theme', 'dark');
    setIdDark(true)
  }

  const changeTheme = () => {
    !isDark ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
    setIdDark(!isDark)
  }

  return (
    <div className={isDark ? "dark" : "light"}>
      <Navigation changeTheme={changeTheme} icon={isDark ? sun : moon} />
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

export default Layout
