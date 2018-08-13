import gql from 'graphql-tag'

export default gql`
query listStoresformUser{
  listUserStores {
    items{
      store_id
      store_name
    }
  }
}`