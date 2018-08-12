import gql from 'graphql-tag';

export default gql `
        mutation CreateProduct($title: String!, $description: String, $store_id: ID!) {
        createProduct(input: {
            store_id: $store_id
            title: $title
            Description: $description 
        }){
        product_id
        title
        Description
        }
    }
`