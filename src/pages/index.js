import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"
import Projects from "../components/Projects"
import projects from "../../data/projects"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import meme from "../../content/assets/meme.png"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const { title, description } = data.site.siteMetadata

  return (
    <Layout>
      <Helmet title={`John Raptis – Developer`} />
      <SEO title={title} description={description} />
      <section className="home">
        <div>
          <h1 className="main-title">Hi people!</h1>
          <p>John here. This is my space.</p>
          <p>
            I like writing about JavaScript, React and programming fundamentals.
            If I can explain it, I sure understand a little something. Enjoy!!
          </p>
        </div>
        <div className="home__image">
          <img src={meme} alt="John Raptis" />
        </div>
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

      {/* <section className="section home-projects">
        <h2>Projects</h2>
        <p>Some projects I'm working on. Tweaks are being made all the time.</p>
        <Projects projects={projects} />
      </section> */}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { slug: { nin: ["/about/", "/learn-in-public-greek/"] } }
      }
      limit: 3
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
