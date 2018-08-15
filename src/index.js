import React from 'react';
import ReactDOM from 'react-dom';

import AWSAppSyncClient, { defaultDataIdFromObject } from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
// import { InMemoryCache } from "apollo-cache-inmemory";

import './index.css';
import './styles/styles.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import config from './aws-exports';

Amplify.configure(config)

const client = new AWSAppSyncClient({
    url: "https://gvwchuftgjesrmetgzauii7ax4.appsync-api.eu-west-1.amazonaws.com/graphql",
    region: "eu-west-1",
    auth: {
        type: 'AMAZON_COGNITO_USER_POOLS',
        apiKey:  "da2-fy5w7nwjgbht5bloibtq7kvocu",
        //credentials: () => Auth.currentCredentials(),
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(), 
    },
    complexObjectsCredentials: () => Auth.currentCredentials(),
   // disableOffline: true,
   cacheOptions: {
       dataIdFromObject: (obj) => {
           let id = defaultDataIdFromObject(obj)
           if(!id){
               const { __typename : typename} = obj;
               switch(typename){
                   case 'Product':
                   return `${typename}:${obj.product_id}`
                   default:
                   return id
               }
           }
           return id
       }
  
   }
})


const Root = () => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <App />
        </Rehydrated>
    </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
