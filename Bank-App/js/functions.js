const formDOM = {
    addClientTab: {
        accountName: document.querySelector('#accountName'),
        accountNumber: document.querySelector('#accountNumber'),
        initialDeposit: document.querySelector('#initialDeposit')
    },
    depositTab: {
        accountName: document.querySelector('#accountName-deposit-tab'),
        accountNumber: document.querySelector('#accountNumber-deposit-tab'),
        depositAmount: document.querySelector('#deposit-amount'),
    },
    withdrawTab: {
        accountName: document.querySelector('#accountName-withdraw-tab'),
        accountNumber: document.querySelector('#accountNumber-withdraw-tab'),
        depositAmount: document.querySelector('#withdraw-amount'),
    },
    transferTab: {
        accountNameFrom: document.querySelector('#accountName-transfer-tab-from'),
        accountNumberFrom: document.querySelector('#accountNumber-transfer-tab-from'),
        transferAmountFrom: document.querySelector('#transfer-amount'),

        accountNameTo: document.querySelector('#accountName-transfer-tab-to'),
        accountNumberTo: document.querySelector('#accountNumber-transfer-tab-to'),
    },
    searchTab: {
        searchName: document.querySelector('#search-bar')
    },
    // buttons
    addClientBtn: document.querySelector('#add-client-btn'),
    depositBtn: document.querySelector('#deposit-btn'),
    withdrawBtn: document.querySelector('#withdraw-btn'),
    transferBtn: document.querySelector('#transfer-btn'),
    searchBtn: document.querySelector('#search-btn'),
}

let table = document.querySelector('.table')
let tableBody = document.querySelector('.table-body')
let clients = []

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2
  })

const init = () =>{
    for (let i = 0; i < localStorage.length; i++) {
        let lsItem = localStorage.getItem(localStorage.key(i));
        let client = JSON.parse(lsItem);
        clients.push(client);
    }
    
    for (const row of Object.values(clients)) {

        let tr = tableBody.insertRow();
        let td0 = tr.insertCell(0);
        let td1 = tr.insertCell(1);
        let td2 = tr.insertCell(2);

        tr.setAttribute(`class`, 'client-row');
        td0.innerHTML = row.name;
        td1.innerHTML = row.accountNumber;
        td2.setAttribute("id", `${row.accountNumber}`);
        td2.innerHTML = formatter.format(row.initialDeposit)
    }
}
init()

const addClient = (e) =>{
    // e.preventDefault();
    const newClient = {}

    let aName = formDOM.addClientTab.accountName.value.toUpperCase()
    let aNumber = formDOM.addClientTab.accountNumber.value
    let aDepositAmount = formDOM.addClientTab.initialDeposit.value

    // verify if required fields are not empty
    try {
        if (aName === "") throw "Account Name is required!";
        if (aNumber === "") throw "Account Number is required!";
        if (aDepositAmount === "") throw "Amount is required!";
    } catch (err) {
        alert(err);
        return;
    }

    // error handling, if name and account number already exist
    for (const client of Object.values(clients)) {
        if (client.name === aName) {
            alert('Client already Exist.')
            return
        }
        if (client.accountNumber === aNumber) {
            alert('Account Number already in use!')
            return
        }
    }

    let row = tableBody.insertRow();
    let cName = row.insertCell(0);
    let cNo = row.insertCell(1);
    let cBal = row.insertCell(2);

    newClient.name = aName.toUpperCase(),
    newClient.accountNumber = aNumber,
    newClient.initialDeposit = parseInt(aDepositAmount)

    cName.innerHTML = newClient.name;
    cNo.innerHTML = newClient.accountNumber;
    cBal.setAttribute("id", `${accountNumber.value}`);
    cBal.innerHTML = formatter.format(`${newClient.initialDeposit}`);
    // ₱
    let client = JSON.stringify(newClient)
    localStorage.setItem(`${aName.toUpperCase()}`, client)

    alert(`New Client was added\n\nNAME: ${aName}\nACCOUNT NUMBER: ${aNumber}\nINITIAL DEPOSIT: ${aDepositAmount}`)
}

const deposit = (e)=>{
    // e.preventDefault()
    let aName = formDOM.depositTab.accountName.value.toUpperCase()
    let aNumber = formDOM.depositTab.accountNumber.value
    let aDepositAmount = formDOM.depositTab.depositAmount.value

    // verify if required fields are not empty
    try {
        if (aName === "") throw "Account Name is required!";
        if (aNumber === "") throw "Account Number is required!";
        if (aDepositAmount === "") throw "Amount is required!";
    } catch (err) {
        alert(err);
        return;
    }

    for (const row of Object.values(clients)) {
        if (row.name === aName && row.accountNumber === aNumber) {
            row.initialDeposit += parseInt(aDepositAmount)
            let r = JSON.stringify(row)
            localStorage.setItem(`${aName}`, r)
            alert(`${aName} deposited an amount of: ${aDepositAmount}`)
            return
        }
        if (row.name !== aName && row.accountNumber === aNumber || row.name === aName && row.accountNumber !== aNumber){
            return alert("Client account name and account number did not match.");
        }    
    }
}

const withdraw = () =>{
    let aName = formDOM.withdrawTab.accountName.value.toUpperCase()
    let aNumber = formDOM.withdrawTab.accountNumber.value
    let aDepositAmount = formDOM.withdrawTab.depositAmount.value

    // verify if required fields are not empty
    try {
        if (aName === "") throw "Account Name is required!";
        if (aNumber === "") throw "Account Number is required!";
        if (aDepositAmount === "") throw "Amount is required!";
    } catch (err) {
        alert(err);
        return;
    }

    for (const row of Object.values(clients)) {
        if (row.name === aName && row.accountNumber === aNumber) {
            if (row.initialDeposit < aDepositAmount) {
                alert('Insufficient')
                return          
            }
            row.initialDeposit -= parseInt(aDepositAmount)
            let r = JSON.stringify(row)
            localStorage.setItem(`${row.name}`, r)
            alert(`${aName} withdrew an amount of: ${aDepositAmount}`)
            return
        }   
        if (row.name !== aName && row.accountNumber === aNumber || row.name === aName && row.accountNumber !== aNumber){
            alert("Client account name and account number did not match.");
            return
        }
    }
}

const transfer = (e) =>{
    // e.preventDefault()
    let FromName = formDOM.transferTab.accountNameFrom.value.toUpperCase()
    let FromNumber = formDOM.transferTab.accountNumberFrom.value
    let FromTransferAmount = formDOM.transferTab.transferAmountFrom.value

    let ToName = formDOM.transferTab.accountNameTo.value.toUpperCase()
    let ToNumber = formDOM.transferTab.accountNumberTo.value

    // verify if required fields are not empty
    try {
        if (FromName === "") throw "Sender Name is required!";
        if (FromNumber === "") throw "Sender Account Number is required!";
        if (FromTransferAmount === "") throw "Transfer Amount is required!";
        if (ToName === "") throw "Receiver Name is required!";
        if (ToNumber === "") throw "Receiver Account Number is required!";
    } catch (err) {
        alert(err);
        return;
    }

    for (const row of Object.values(clients)) {
        if (row.name === FromName) {
            if (row.initialDeposit < FromTransferAmount) {
                alert('Insufficient')
                return
            }
            row.initialDeposit -= parseInt(FromTransferAmount)
            alert(`${FromName} sent an amount of: ${FromTransferAmount} to ${ToName}`)
        }
        if (row.name === ToName) {
            row.initialDeposit += parseInt(FromTransferAmount)
        }
        if (row.initialDeposit < FromTransferAmount) {
            alert('Insufficient')
            return
        }
        if (row.name !== FromName && row.accountNumber === FromNumber || row.name === FromName && row.accountNumber !== FromNumber){
            return alert("Sender account name and account number did not match.");
        }
        if (row.name !== ToName && row.accountNumber === ToNumber || row.name === ToName && row.accountNumber !== ToNumber){
            return alert("Receiver account name and account number did not match.");
        }
        let r = JSON.stringify(row)
        localStorage.setItem(`${row.name}`, r)
    }
}

const search = () =>{
    let searchName = formDOM.searchTab.searchName.value.toUpperCase()

    if (searchName === '') return alert('No name is entered')

    for (const row of Object.values(clients)) {
        if (row.name === searchName) {
            alert(`Client Name: ${row.name}\nClient Account Number: ${row.accountNumber}\nClient Balance: ${row.initialDeposit}`)
        }
        console.log(row)
    }
}
// for (let i = 0; i < clients.length; i++) {
//     console.log(clients[i].name)
//     // for (let j = 0; j < clients[i].length; j++) {
//     // }
// }

formDOM.addClientBtn.addEventListener('click', addClient)
formDOM.depositBtn.addEventListener('click', deposit)
formDOM.withdrawBtn.addEventListener('click', withdraw)
formDOM.transferBtn.addEventListener('click', transfer)
formDOM.searchBtn.addEventListener('click', search)