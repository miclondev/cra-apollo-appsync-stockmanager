import gql from 'graphql-tag';

export default gql`
mutation CreateProduct($title: String!,
 $description: String,
  $store_id: ID!, 
  $cost: Int,
  $stock: Int,
  $category: String,
  $selling_price: Int
  ) {
  createProduct(input: {
    store_id: $store_id
    category_id: $category
    title: $title
    intial_cost: $cost
    stock: $stock
    description: $description 
    selling_price: $selling_price
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