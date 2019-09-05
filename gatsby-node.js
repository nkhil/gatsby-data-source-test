const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
              type
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const blogTemplate = path.resolve(`./src/templates/blog.js`);
  const projectTemplate = path.resolve(`./src/templates/project.js`);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log('NODE \n', node.frontmatter);
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
}