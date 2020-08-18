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
import config from "../../data/siteConfig"

function SEO({ description, lang, meta, title, thumbnail }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  let metaImage = `${site.siteMetadata.siteUrl}${config.logo}`

  if (thumbnail) {
    metaImage = `${site.siteMetadata.siteUrl}${thumbnail.childImageSharp.fixed.src}`
  }

  // console.log(metaImage)
  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      // title={title}
      // titleTemplate={`%s | ${site.siteMetadata.title}`}
      // meta={[
      //   {
      //     name: `description`,
      //     content: metaDescription,
      //   },
      //   {
      //     name: `og:image`,
      //     content: metaImage,
      //   },
      //   {
      //     property: `og:title`,
      //     content: title,
      //   },
      //   {
      //     property: `og:description`,
      //     content: metaDescription,
      //   },
      //   {
      //     property: `og:type`,
      //     content: `website`,
      //   },
      //   {
      //     name: `twitter:card`,
      //     content: `summary_large_image`,
      //   },
      //   {
      //     name: `twitter:creator`,
      //     content: site.siteMetadata.author,
      //   },
      //   {
      //     name: `twitter:title`,
      //     content: title,
      //   },
      //   {
      //     name: `twitter:description`,
      //     content: metaDescription,
      //   },
      //   {
      //     name: `twitter:image`,
      //     content: metaImage,
      //   },
      // ].concat(meta)}
    >
      <meta name="description" content={metaDescription} />
      <meta name="image" content={metaImage} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
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
