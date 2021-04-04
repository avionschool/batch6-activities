const store = {
    storeName: ``,
    inventoryList: [],
    earnings: 0,
}

const addBook = (title, quantity, value) =>{
    const book = {
        title: '',
        quantity: 0,
        value: 0
    }

    book.title = title,
    book.quantity = quantity,
    book.value = value

    store.inventoryList.push(book)
    return store.inventoryList
}
console.log(addBook('eli', 100, 100))
console.log(addBook('aww', 200, 60))

const restockBook = (title, quantity) =>{
    for (const book of store.inventoryList) {
        if (book.title === title) {
            book.quantity += quantity
            return book
        }
    }
    return `there is no ${title} in the inventory`
}
console.log(restockBook('eli', 2))
console.log(restockBook('aww', 2))
console.log(restockBook('awwsss', 2))


// NOTE: fix this
const sellBook = (title, quantity) =>{
    for (const book of store.inventoryList) {
        if (book.title === title) {
            book.quantity -= quantity
            store.earnings + book.value
            return `successful transaction`
        }else if (book.quantity < quantity) {
            return `only ${book.quantity} stocks left`
        }
        return book
    }
}
console.log(sellBook('eli', 5))
console.log(sellBook('aww', 500))
console.log(sellBook('awwsss', 500))
console.log(store.inventoryList)

const totalEarnings = () =>{
    return `The Total Earnings: ${store.earnings}`;
}

function listInventory(){
    return store.inventoryList;
}
// console.log(totalEarnings())
// console.log(listInventory())
// module.exports = {store, addBook}