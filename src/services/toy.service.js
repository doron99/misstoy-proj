
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            //if (!toys) return [];
            // if (!filterBy.txt) filterBy.txt = ''
            // if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            // if (!filterBy.minSpeed) filterBy.minSpeed = -Infinity
            // const regExp = new RegExp(filterBy.txt, 'i')
            // return toys.filter(toy =>
            //     regExp.test(toy.vendor) 
            //     && toy.price <= filterBy.maxPrice 
            //     && toy.speed >= filterBy.minSpeed
            // )
            return toys;
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '', 
        price: 0, 
        labels: [], 
        createdAt: new Date().getTime(), 
        inStock: true,
    }
}
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
'Outdoor', 'Battery Powered']
function getRandomLabels(arr) {
    const count = Math.floor(Math.random() * 3) + 1; // Randomly choose 1, 2, or 3
    const shuffled = arr.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, count); // Return the first 'count' elements
}
function getRandomLabel(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
function getRandomToy() {
    const randomLabels = getRandomLabels(labels);


    return {
        name: `${utilService.makeId(7)} Doll`, 
        price: utilService.getRandomIntInclusive(1000, 9000), 
        labels: randomLabels, 
        createdAt: new Date().getTime(), 
        inStock: true,
        //vendor: 'Susita-' + (Date.now() % 1000),
        //price: utilService.getRandomIntInclusive(1000, 9000),
        //speed: utilService.getRandomIntInclusive(90, 200),
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', minSpeed: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


