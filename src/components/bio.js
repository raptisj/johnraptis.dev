import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/meme.jpg/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className="bio__container">
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <div className="bio__container--content">
      <p>
        <br />
        In love with JavaScript, React and programming fundamentals in general.
        {` `}
        <br />
        <a href={`https://twitter.com/${social.twitter}`} target="_blank">
          Me on Twitters
        </a>
      </p>

        <hr />
        <br />
        <a
          className="newsletter-button"
          href="https://johnraptis.substack.com"
          target="_blank"
          rel="noreferrer"
        >
          Join newsletter
        </a> 
        <span>Ain't no spam here when you sub.</span>
      </div>
    </div>
  )
}

export default Bio
