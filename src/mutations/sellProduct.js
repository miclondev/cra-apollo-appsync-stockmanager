import gql from 'graphql-tag'

export default gql`
    mutation sellProduct($product_id: ID!, $shop_id: ID!,
     $product_price: Int, $selling_price: Int, $tax: Int,
     $stock: Int , $count: Int
     ){
        sellProduct(input: { 
        product_id: $product_id,
        shop_id: $shop_id,
        product_price: $product_price,
        selling_price: $selling_price,
        tax: $tax,
        count: $count
        }){
            response
        }
        updateProduct(input: {product_id: $product_id,
        stock: $stock}){
            stock
            product_id
        }
    }
`