import React from 'react';
import { Dropdown } from 'semantic-ui-react';


const friendOptions = [
      {
        text: 'Purses',
        value: 'Jenny Hess',
        image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
      },
    ]

const FilterProducts = () => {
    return(
        <Dropdown placeholder='All Categories' selection options={friendOptions} />
    )
}

export default FilterProducts;