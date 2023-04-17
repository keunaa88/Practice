import React, { useState } from 'react'

const category = [
  { value: 'top', label: 'Top' },
  { value: 'pants', label: 'Pants' },
  { value: 'dress', label: 'Dress' },
  { value: 'bag', label: 'Bag' },
  { value: 'shoes', label: 'Shoes' },
]

function Dropbox({select, onSelect}) {
    return (
        
        <select
            value={select} 
            onChange={(e) => onSelect(e.target.value)}>
            { category.map(x => {
                return ( 
                    <option value={x.value}>{x.label}</option>
                )})
            }
        </select>
    );
}
export default Dropbox;