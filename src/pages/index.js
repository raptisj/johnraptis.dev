import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"
import Projects from "../components/Projects"
import projects from "../../data/projects"

const IndexPage = () => {
  return (
    <Layout>
      <Helmet title={`John Raptis – Developer`} />
      <SEO />
      <section className="home">
        <h1 className="main-title">Hi people</h1>
        <p>I'm John. I'm a web developer from Greece.</p>
        <p>
          I like writing about Javascript and programming fundamentals. If I can
          explain it, I sure understand a little something.
        </p>
      </section>

      {/*     <section className="section home-projects">
          <h2>Projects</h2>
          <p>Some projects I'm working on. Tweaks are being made all the time.</p>
          <Projects projects={projects} />
      </section>*/}
    </Layout>
  )
}

export default IndexPage
