# Gatsby site with multiple content types

## Setup

```
git clone https://github.com/nkhil/gatsby-data-source-test.git
cd gatsby-data-source-test
npm i (to install dependencies)
gatsby develop` (to start the development server)
```

## Description 

This repo is a test for rendering different content types using separate page templates. I used the [official docs](https://www.gatsbyjs.org/tutorial/part-four/) and [this really useful blog post](https://desktopofsamuel.com/gatsby-website-with-multiple-post-types) when I was working out this problem. Note that the blog post is useful, but has a couple of odd omissions that made it hard for me to follow it.

In this repo, I've got `blog` and `project` as the two different content types. I'm using a simple `type` property in the frontmatter of the markdown file to differentiate a blog from a project. 

I then use a conditional statement in the `gatsby-node.js` file to render the page (using gatsby's `createPage` API) using the appropriate template. 

Here's a quick snippet:

```javascript
// see ./gatsby-node.js for the entire file

result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if(node.frontmatter.type === 'work'){
      createPage({
        path: node.fields.slug,
        component: projectTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    } else {
      createPage({
        path: node.fields.slug,
        component: blogTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    }
  })
```

## Rendering different content types

In this repo, I've got two named queries that filter the data based on the absolute file path. 

Snippet: 
```javascript
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
```
