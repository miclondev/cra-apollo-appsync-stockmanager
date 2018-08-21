import gql from 'graphql-tag'

export default gql`
    mutation sellProduct($product_id: ID!, $shop_id: String,
     $product_price: String, $selling_price: String, $tax: Int,
     $stock: Int 
     ){
        sellProduct(input:
        { product_id: $product_id,
        shop_id: $shop_id,
        product_price: $product_price,
        selling_price: $selling_price,
        tax: $tax
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