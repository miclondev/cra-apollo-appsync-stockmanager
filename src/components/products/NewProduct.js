import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

class NewProduct extends Component {
    render(){
        return(
            <div className="right">
                <Segment> 
                <div className="products-header">
                    <Button> Go back </Button>
                    <h4> Add Product </h4>
                </div>
                 <Divider section />
                    <div>
                    </div>
                </Segment>
            </div>
        )
    }
}

export default NewProduct;