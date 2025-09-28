import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link,useNavigate  } from 'react-router-dom'


import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'


export function ToyIndex() {
    
    const dispatch = useDispatch()
    const allState = useSelector(storeState => storeState.toyModule)
    const navigate = useNavigate();

    const toys = useSelector(storeState => storeState.toyModule.toys)
    console.log('allState',allState)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load Toys!')
            })
    }, [filterBy])
    
    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove Toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add Toy')
            })
    }
    
    function onEditToy(toy) {
        navigate('/toy/edit/'+toy._id);

        // const price = +prompt('New price?')
        // const carToSave = { ...car, price }

        // saveCar(carToSave)
        //     .then((savedCar) => {
        //         showSuccessMsg(`Car updated to price: $${savedCar.price}`)
        //     })
        //     .catch(err => {
        //         showErrorMsg('Cannot update car')
        //     })
    }

    function addToCart(car) {
        // console.log(`Adding ${car.vendor} to Cart`)
        // dispatch({ type: ADD_CAR_TO_CART, car })
        // showSuccessMsg('Added to Cart')
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                {/* <Link to="/car/edit">Add Car</Link> */}
                <button className='add-btn' onClick={onAddToy}>Add Random Toy ⛐</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}

