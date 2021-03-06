import gql from 'graphql-tag'

export default gql`
query getUserProducts{
    listProductsFromUser{
      items{
        product_id
        title
        description
        created_on
        initial_cost
        stock
        retail
        wholesale
        offer
      }
    }
  }
`