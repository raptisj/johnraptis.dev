import React from "react"
import Layout from "../components/layout"

import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"

const Blog = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={`Articles - John Raptis`} />
      <SEO />
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
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { nin: "/about/" } } }
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
