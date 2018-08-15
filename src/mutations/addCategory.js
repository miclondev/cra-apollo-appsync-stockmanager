import gql from 'graphql-tag'

export default gql`
    mutation createProductCategory(
        $store_id: String!
        $cat_name: String!
        $cat_for: String!){
    createCategory(input : {
        store_id: $store_id
        cat_name: $cat_name
        cat_for: $cat_for
    }){
        category_id
        cat_name
    }
 }
`