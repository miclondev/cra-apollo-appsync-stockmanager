import gql from 'graphql-tag';

export default gql`
    query listProducts{
    listProducts{
        items {
        product_id
        title
        Description
        }
    }
    }
`