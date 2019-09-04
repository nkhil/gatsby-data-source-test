import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import hero from '../../static/hero.jpg'
import moment from 'moment'

export default ({data}) => (
  <Layout>
    {console.log('data \n', data)}
    {/* <h1>Amazing {data.site.siteMetadata.title}</h1> */}
    <h1>Hi, I'm Nikhil</h1>
    <div>
      <img
        src={hero}
        alt={data.site.siteMetadata.title}
      />
    </div>
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {data.allMarkdownRemark.edges.map(({node}) => (
          <li key={node.id}>
             <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <h3
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}
              </h3>
              <p>{moment(node.frontmatter.date).format('MMMM Do, YYYY')}</p>
              <p>{node.excerpt}</p>
            </Link>
          </li>
        ))} 
      </ul>

    </div>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
  `