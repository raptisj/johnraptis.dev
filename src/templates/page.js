import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = ({data}) => {
	const content = data.markdownRemark
	return (
		<Layout>
		    <SEO
          		title={content.frontmatter.title}
          		description={content.frontmatter.description || content.excerpt}
        	/>
			<h1 className="main-title">About me</h1>
			<div className="about-page" dangerouslySetInnerHTML={{ __html: content.html }} />
		</Layout>
	)
}

export default Page

export const PageQuery = graphql`
query MQuery {
  markdownRemark(fields: {slug: {eq: "/about/"}}) {
    html
    excerpt(pruneLength: 160)
    frontmatter {
      title
      description
    }
  }
}
`