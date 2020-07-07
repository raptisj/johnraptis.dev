import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"
import Projects from "../components/Projects"
import projects from "../../data/projects"
import { Link, graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={`John Raptis – Developer`} />
      <SEO />
      <section className="home">
        <h1 className="main-title">Hi people</h1>
        <p>I'm John. I'm a web developer from Greece.</p>
        <p>
          I like writing about JavaScript, React and programming fundamentals.
          If I can explain it, I sure understand a little something.
        </p>
      </section>

      <section className="posts__grid">
        <div className="latest__post">
          <h2>Latest Articles</h2>
          <div>
            <Link to="/blog">See more</Link>
          </div>
        </div>
        {posts.map(({ node }) => {
          return (
            <div key={node.fields.slug}>
              <Link to={node.fields.slug} className="post__link">
                <h3 className="post__title">{node.frontmatter.title}</h3>
                <span>{node.frontmatter.date}</span>
              </Link>
            </div>
          )
        })}
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

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
      skip: 1
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
