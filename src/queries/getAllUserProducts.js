import gql from 'graphql-tag'

export default gql`
query getUserProducts($user_id: ID!) {
    listProductsFromUser(user_id: $user_id){
      items{
        product_id
        title
        Description
        store_id{
          store_name
        }
      }
    }
  }
`