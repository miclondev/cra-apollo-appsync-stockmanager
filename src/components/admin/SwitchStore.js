import React from 'react';
import { graphql } from 'react-apollo';
import { withAuthenticator } from 'aws-amplify-react';
import getUserStores from '../../queries/getUserStores';

const SwitchStore = (props) => {
    console.log(props)
    if(props.authState !== "signedIn"){
        return <div> Loading .... </div>
    }
    if(props.stores.loading){
        return <div> Loading .... </div>
    }
    const { listUserStores } = props.stores
    return(
        <div>
            {
                listUserStores.items.map(store => (
                   <h2 key={store.store_id}> {store.store_name} </h2> 
                ))
            }
        </div>
    )
}

export default withAuthenticator(
    graphql(getUserStores,{ name: 'stores'})(SwitchStore)
)