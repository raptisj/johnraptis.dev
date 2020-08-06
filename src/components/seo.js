/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import logo from "../../content/assets/favicon.png"
import meme from "../../content/assets/meme.png"

function SEO({ description, lang, meta, title, thumbnail }) {
  const { site, sitePage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        sitePage {
          path
        }
      }
    `
  )

  const metaImage = thumbnail ? thumbnail.childImageSharp.fixed : logo
  // const thumbnailImage = sitePage.path === "/about/" ? meme : metaImage
  const metaDescription = description || site.siteMetadata.description
  // console.log(metaImage)

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      // title={title}
      // titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `og-image`,
          content: metaImage,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: metaImage,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  // title: PropTypes.string.isRequired,
}

export default SEO
