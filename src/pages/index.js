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
    <h1>Amazing {data.site.siteMetadata.title}</h1>
    <div>
      <img
        src={hero}
        alt={data.site.siteMetadata.title}
      />
    </div>
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {data.blog.edges.map((post, i) => (
          <li key={i}>
             <Link
              to={post.node.fields.slug}
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
                {post.node.frontmatter.title}
              </h3>
              <p>{moment(post.node.frontmatter.date).format('MMM Do, YYYY')}</p>
              <p>{post.node.excerpt}</p>
            </Link>
          </li>
        ))} 
      </ul>
    </div>
    <div>
      <h2>Projects</h2>
      <ul>
        {data.projects.edges.map((post, i) => (
          <li key={i}>
             <Link
              to={post.node.fields.slug}
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
                {post.node.frontmatter.title}
              </h3>
              <p>{moment(post.node.frontmatter.date).format('MMM Do, YYYY')}</p>
              <p>{post.node.excerpt}</p>
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
    blog: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fileAbsolutePath: {regex: "/blog\/.*md$/"}}
      ) {
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
    projects: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fileAbsolutePath: {regex: "/projects\/.*md$/"}}
      ) {
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