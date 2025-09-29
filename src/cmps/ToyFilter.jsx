// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState, useCallback } from "react"
import { utilService } from "../services/util.service.js"
import {FloatTextInput} from "../cmps/FloatTextInput.jsx"
import {CheckboxList} from "../cmps/CheckboxList.jsx"
import {toyService} from "../services/toy.service.js"
export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [labelArr, setLabelArr] = useState(null)


    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
    useEffect(() => {
        loadLabels();
    },[])
    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])
    function loadLabels() {
        toyService.getLabels()
            .then(labels => setLabelArr(labels))
            .catch(err => {
                console.log('Had issues in toy labels', err)
                navigate('/toy')
            })
    }
    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     value = type === 'number' ? +value : value
    //     setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    // }
    function handleChange({ target }) {
        console.log('target',target)
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break
        
            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    const handleChangeNew = (newValue,txtInputId) => {
        //setTxt(newValue); // Update the state with the new value
        console.log('handleChangeNew','input',txtInputId,'value',newValue)
        let field = '';
        if (txtInputId == 'name') {
            field = 'name';
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
    const { name, labels,inStock } = filterByToEdit
    function setLabelsToCurrentUser(items) {
        console.log('setLabelsToCurrentUser',items);
        //setToyToEdit((prevToy) => ({ ...prevToy, labels: items }))

        
    }
    const handleSelectedItemsChange = useCallback((selectedItems) => {
            console.log('Updated selected items:', selectedItems);
            //setToyToEdit((prevToy) => ({ ...prevToy, labels: selectedItems }))
            setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: selectedItems }))

        }, []);
    return (
        <fieldset className="car-filter" style={{ maxWidth: '630px', margin: 'auto' }} >
            <legend className="car-filter-legend">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ display: 'inline-block' }}>Filter Toys</span>
                    {/* <SvgIcon iconName='filter' style={iconSvgStyle} /> */}
                </div>
            </legend>

            <form className="car-filter-form" onSubmit={onSubmitFilter} >

                <div style={{display:'flex'}}>
                    <div>
                        <div style={{ marginBottom: '5px' }}>

                            <FloatTextInput
                                id="name"
                                txt={name}
                                label="Toy Name"
                                placeholder=""
                                onChange={handleChangeNew} />
                        </div>
                        <fieldset style={{width:'150px'}}>
                        <legend>In Stock:</legend>
                            <div>
                            <input type="radio" id="all" name="inStock" value="all"
                                checked={inStock === 'all'}
                                onChange={handleChange}/>
                            <label htmlFor="all">All</label>
                            </div>
                            <div>
                            <input type="radio" id="inStock" name="inStock" value="inStock"
                            checked={inStock === 'inStock'}
                            onChange={handleChange} />
                        <label htmlFor="inStock">inStock</label>
                            </div>
                            <div>
                            <input type="radio" id="outOfStock" name="inStock" value="outOfStock"
                                checked={inStock === 'outOfStock'}
                                onChange={handleChange}/>
                            <label htmlFor="outOfStock">outOfStock</label>
                            </div>
                       
                    </fieldset>

                    </div>
                   
                    {labelArr &&
                    <fieldset style={{width:'150px'}}>
                    <legend>Labels:</legend>
                        <div>
                    <CheckboxList
                                        KeyValuelabelList={labelArr}
                                        selectedListFromOutside={labels}
                                        onSelectedItemsChange={handleSelectedItemsChange}
                                    />
                                    </div>
                                    </fieldset>
                                    }
                    
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