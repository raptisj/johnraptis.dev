import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"
import Img from "gatsby-image"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { title, description, date, thumb, updated, tag } = post.frontmatter
  const { html, timeToRead } = post

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet title={`${title} - John Raptis`} />
      <SEO
        title={title}
        description={description || post.excerpt}
        thumbnail={thumb}
      />

      <article className="single-post">
        <header className="single-post__title">
          {thumb && (
            <Img
              fixed={thumb.childImageSharp.fixed}
              className="single-post__thumbnail"
            />
          )}
          <h1>{title}</h1>
          <p>{date}</p>
          <span> {timeToRead} min read</span>
          {updated && <p>Updated: {updated}</p>}
        </header>

        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr />

        <footer>
          <Bio />
        </footer>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        updated(formatString: "MMMM DD, YYYY")
        description
        thumb {
          childImageSharp {
            fixed(width: 100, height: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
