// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import {FloatTextInput} from "../cmps/FloatTextInput.jsx"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    const handleChangeNew = (newValue,txtInputId) => {
        //setTxt(newValue); // Update the state with the new value
        console.log('handleChangeNew','input',txtInputId,'value',newValue)
        let field = '';
        if (txtInputId == 'txtBookNameFilter') {
            field = 'txt';
        } else if (txtInputId == 'txtPriceFilter') {
            field = 'price';
        }
                
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: newValue }))

        
    };

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }
    const iconSvgStyle = {
            width:'20px',
            height:'20px',
            display:'inline-block'
        }
    const { txt, price, isOnSale , isVintage, readerLevel, isNew } = filterByToEdit

    return (
        <fieldset className="car-filter" style={{ maxWidth: '630px', margin: 'auto' }} >
            <legend className="car-filter-legend">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ display: 'inline-block' }}>Filter Books</span>
                    {/* <SvgIcon iconName='filter' style={iconSvgStyle} /> */}
                </div>
            </legend>

            <form className="car-filter-form" onSubmit={onSubmitFilter} >

                <div>
                    <div style={{ marginBottom: '5px' }}>

                        <FloatTextInput
                            id="txtBookNameFilter"
                            txt={txt}
                            label="Book Name"
                            placeholder=""
                            onChange={handleChangeNew} />
                    </div>
                </div>
            </form>
        </fieldset>
        // <section className="car-filter full main-layout">
        //     <h2>Cars Filter</h2>
        //     <form >
        //         <label htmlFor="vendor">Vendor:</label>
        //         <input type="text"
        //             id="vendor"
        //             name="txt"
        //             placeholder="By vendor"
        //             value={filterByToEdit.txt}
        //             onChange={handleChange}
        //         />

        //         <label htmlFor="maxPrice">Max price:</label>
        //         <input type="number"
        //             id="maxPrice"
        //             name="maxPrice"
        //             placeholder="By max price"
        //             value={filterByToEdit.maxPrice || ''}
        //             onChange={handleChange}
        //         />

        //         <label htmlFor="minSpeed">Min Speed:</label>
        //         <input type="number"
        //             id="minSpeed"
        //             name="minSpeed"
        //             placeholder="By min speed"
        //             value={filterByToEdit.minSpeed || ''}
        //             onChange={handleChange}
        //         />

        //     </form>

        // </section>
    )
}