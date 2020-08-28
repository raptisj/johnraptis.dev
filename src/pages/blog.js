import React from "react"
import Layout from "../components/layout"

import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"

const Blog = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const { title, description } = data.site.siteMetadata

  return (
    <Layout>
      <Helmet title={`Articles - John Raptis`} />
      <SEO title={title} description={description} />
      <h1 className="main-title">Articles</h1>
      <section className="posts__grid">
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
    </Layout>
  )
}

export default Blog

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
