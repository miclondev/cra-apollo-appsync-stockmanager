import gql from 'graphql-tag'

export default gql`
mutation deleteCategory($category_id: ID!) {
    deleteCategory(input: {
            category_id: $category_id
        }){
            cat_name
            category_id
        }
    }
`