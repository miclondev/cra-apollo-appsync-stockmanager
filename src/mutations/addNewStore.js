import gql from 'graphql-tag';

export default gql`
mutation createStore($title: String!, $description:String) {
  createStore(input:{
    store_name: $title,
    description: $description
  }){
    store_id
    user_id
    created_on
	updated_on
  }
}
`