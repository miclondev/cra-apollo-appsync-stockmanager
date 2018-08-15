import gql from 'graphql-tag';

export default gql`

query liscategories($store_id: String!){
  listCategoriesStoreId(
   store_id: $store_id,
   cat_for: "Products"){
    items{
      category_id
      cat_name
    }
  }
}
`