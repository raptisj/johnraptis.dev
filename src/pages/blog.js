import React, { useState } from "react"
import Layout from "../components/layout"

import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"

const Blog = ({ data }) => {
  const [currentTag, setCurrentTag] = useState('all')
  const posts = data.allMarkdownRemark.edges
  const { title, description } = data.site.siteMetadata
  const allTags = [...new Set(posts.map(p => p.node.frontmatter.tags.flat()).flat())];

  return (
    <Layout>
      <Helmet title={`Articles - John Raptis`} />
      <SEO title={title} description={description} />
      <h1 className="main-title">Articles</h1>

      <div className="tags-list">
        <span data-value='all' onClick={() => setCurrentTag('all')}>all</span>
        {allTags.length > 0 && allTags.map((p, i) => (
          <span data-value={p} key={i} onClick={() => setCurrentTag(p)}>{p}</span>
        ))}
      </div>

      <section className="posts__grid">
        {posts.filter(({node}) => node.frontmatter.tags.includes(currentTag) || currentTag === 'all').map(({ node }) => {
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
        fields: { slug: { nin: ["/learn-in-public-greek/"] } }
        frontmatter: { category: { nin: ["ideas", "about"] } }
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
            tags
            description
          }
        }
      }
    }
  }
`


          {/* <div className="post__info"> */}
                  {/* <div className="post__tags">
                    {node.frontmatter.tags?.length > 0 && node.frontmatter.tags.map((p, i) => (
                      <span data-value={p} key={i}>{p}</span>
                    ))}
                  </div> */}
                {/* </div> */}