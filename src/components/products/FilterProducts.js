import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const FilterProducts = (props) => {
    const options = Array.from(props.categories, cat => {
        return { key: cat.category_id, value: cat.category_id, text: cat.cat_name }
    })
    //console.log(options)
    //const options = [ { key: 'AL', value: 'AL', text: 'Alabama' } ]
    return (
        <Dropdown placeholder='All Categories' selection options={options} />
    )
}

export default FilterProducts;