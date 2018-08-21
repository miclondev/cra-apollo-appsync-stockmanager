import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import constants from '../../config/constants'
class sellProduct extends Component {

    state = {
        showInput: false,
        store_id: constants.store_id,
        product_id: "",
        user_id: "",
    }

    render() {
        console.log('sell props', this.props)
        return (
            <div>
                <Button onPress={() => this.setState({ showInput: !this.state.showInput })}> Sell</Button>
                { this.state.showInput && <Input /> }
            </div>
        )
    }
}

export default sellProduct;