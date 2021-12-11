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

  const yearHeading = ['2021', '2020', '2019']

  const year2021 = []
  const year2020 = []
  const year2019 = []

  const listByYear = posts.reduce((acc, cur) => {
    const filterByTag = cur.node.frontmatter.tags.includes(currentTag) || currentTag === 'all'
    const yearxx = cur.node.frontmatter.date.split(' ')[2]

    if (yearxx === yearHeading[0] && filterByTag) {
      year2021.push(cur)
    }

    if (yearxx === yearHeading[1] && filterByTag) {
      year2020.push(cur)
    }

    if (yearxx === yearHeading[2] && filterByTag) {
      year2019.push(cur)
    }

    acc = [year2021, year2020, year2019]
    return acc;
  }, [])

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
        {yearHeading.map((p, i) => (
          <div key={p}>
            {listByYear[i].length ? <h2 className="year-heading">{p}</h2> : null}
            {listByYear[i].filter(({ node }) => node.frontmatter.tags.includes(currentTag) || currentTag === 'all').map(({ node }) => {
              return (
                <div key={node.fields.slug}>
                  <Link to={node.fields.slug} className="post__link">
                    <h3 className="post__title">{node.frontmatter.title}</h3>
                    <span>{node.frontmatter.date}</span>
                  </Link>
                </div>
              )
            })}
          </div>
        ))}
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