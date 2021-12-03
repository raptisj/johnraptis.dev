import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"
import Projects from "../components/Projects"
import projects from "../../data/projects"
import { Link, graphql } from "gatsby"
import meme from "../../content/assets/me.jpeg"
import Twitter from "../icons/Twitter"
import GitHub from "../icons/GitHub"
import { getDifferenceInDays } from '../utils'

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
          <p>John here.</p>
          <p>
            I like writing about JavaScript, React and programming fundamentals
            in general. If I can explain it, I sure understand a little
            something. Enjoy!
          </p>

          <div className="social-container">
            <div>
              <a
                className="newsletter-button"
                href="https://johnraptis.substack.com"
                target="_blank"
                rel="noreferrer"
              >
                Join newsletter
              </a>
            </div>
            <div className="social-icons">
              <a
                href="https://twitter.com/JohnRaptisM"
                target="_blank"
                rel="noopener noreferrer"
                title="twitter"
                data-title="twitter"
              >
                <Twitter />
              </a>
              <a
                href="https://github.com/raptisj"
                target="_blank"
                rel="noopener noreferrer"
                title="github"
                data-title="github"
              >
                <GitHub />
              </a>
            </div>
            <span className="newsletter-button__subtitle">Ain't no spam here when you sub.</span>
          </div>
        </div>
        <div className="home__image">
          <img src={meme} alt="John Raptis" />
          <div />
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
          const isNewPost = getDifferenceInDays(new Date(node.frontmatter.date)) < 7

          return (
            <div key={node.fields.slug}>
              <Link to={node.fields.slug} className="post__link">
                <div className="post__head-wrapper">
                  {isNewPost && <span className="post__is-new-tag">NEW</span>}
                  <h3 className="post__title">{node.frontmatter.title}</h3>
                </div>
                <span className="post__date">{node.frontmatter.date}</span>
              </Link>
            </div>
          )
        })}
      </section>

      <section className="section home-projects">
        <h2>Projects</h2>
        <p>Some projects I'm working on.</p>
        <Projects projects={projects} />
        <div className="projects-status">
          <p>
            🛠️ <span>Work in progress</span>
          </p>
          <p>
            💡 <span>Kinda complete</span>
          </p>
          <p>
            🏡 <span>This website</span>
          </p>
        </div>
      </section>
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
        fields: { slug: { nin: ["/learn-in-public-greek/"] } }
        frontmatter: { category: { nin: ["ideas", "about"] } }
      }
      limit: 5
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
