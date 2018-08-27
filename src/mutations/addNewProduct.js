import gql from 'graphql-tag';

export default gql`
mutation CreateProduct(
  $title: String!,
  $description: String,
  $store_id: ID!, 
  $initial_cost: Int,
  $stock: Int,
  $category: String, 
  $retail: Int,
  $wholesale: Int,
  $offer: Int
  ) {
  createProduct(input: {
    store_id: $store_id
    category_id: $category
    title: $title
    initial_cost: $initial_cost
    stock: $stock
    description: $description
    retail: $retail
    wholesale: $wholesale
    offer: $offer
  }){
    title
    product_id
    created_on
    description
    created_on
    stock
  }
}
`