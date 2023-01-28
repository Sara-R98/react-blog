import { gql } from "@apollo/client";

const GET_BLOGS_INFO= gql`
 query {
    posts {
    author {
      ... on Author {
        name
        avatar {
          url
        }
      }
    }
    slug
    title
    id
    coverPhoto {
      url
    }
  }
}
`;

const GET_AUTHORS_INFO= gql`
  query{
    authors {
    id
    name
    slug
    avatar {
      url
    }
  }
  }
`;

const GET_AUTHOR_INFO = gql`
  query getAuthorInfo($slug: String!){
    author(where: {slug: $slug}) {
    avatar {
      url
    }
    field
    name
    description {
      html
    }
    posts {
      coverPhoto {
        url
      }
      id
      slug
      title
    }
  }
  }
`;

const GET_POST_INFO = gql `
  query getPost( $slug: String! ) {
  post(where: {slug: $slug }) {
    author {
      ... on Author {
        name
        field
        avatar {
          url
        }
      }
    }
    content {
      html
    }
    title
    coverPhoto {
      url
    }
  }
}
`

const GET_POST_COMMENTS = gql `
 query getPostComments($slug: String!) {
  comments(where: {post: {slug: $slug}}) {
    id
    name
    text
  }
}
`

const GET_CATEGORIES = gql`
  query{
    categories {
    id
    name
    slug
    posts {
      coverPhoto {
        url
      }
      id
      slug
      title
    }
    categoryChildren {
      id
      name
      slug
      posts {
        coverPhoto {
          url
        }
        id
        slug
        title
      }
    }
  }
 
  #   categories {
  #   id
  #   name
  #   categories_id {
  #     id
  #     name
  #     slug
  #     posts {
  #       id
  #       slug
  #       title
  #       coverPhoto {
  #         url
  #       }
  #     }
  #   }
  # }
  }
`

export {GET_BLOGS_INFO , GET_AUTHORS_INFO , GET_AUTHOR_INFO , GET_POST_INFO , GET_POST_COMMENTS , GET_CATEGORIES }