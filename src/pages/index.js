import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Projects from "../components/Projects"
import projects from '../../data/projects'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="John Raptis" />
      <section>
          <h1 className="main-title">Hi people</h1>
          <p>I'm John. I'm a web developer from Greece.</p>
          <p>I like writing and explaning the things I think I know and things that I try to learn as well. 
            If I can explain it I sure understand a little something.
          </p>
      </section>

{/*      <section className="section">
          <h2>Projects</h2>
          <p>Some projects I'm working on. Tweaks are being made all the time.</p>
          <Projects projects={projects} />
      </section>*/}

    </Layout>
  )
}

export default IndexPage