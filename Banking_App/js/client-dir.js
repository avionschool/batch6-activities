//===================== LIST ALL USERS ===============================//

const list_users = document.querySelector('#list-users table');
const list_users_modal = document.querySelector('#list-users .modal');
const list_users_modalRow = document.querySelector('#list-users .modal table');
listUsers()
function listUsers(){
    for(i =0; i <bankApp.currentUsers.length; i++){
        let row = list_users.insertRow(-1);
        let cellOne = row.insertCell(0);
        let cellTwo = row.insertCell(1);
        let cellThree = row.insertCell(2);
        let cellFour = row.insertCell(3);
        let cellFive = row.insertCell(4);
        let cellSix = row.insertCell(5);
        let cellSeven = row.insertCell(6);

        cellOne.append(`${bankApp.currentUsers[i].name}`);
        cellTwo.append(`${bankApp.currentUsers[i].accntNum}`);
        cellThree.append(`${formatter.format(bankApp.currentUsers[i].balance)}`);
        cellFour.innerHTML = `<button class = "withdraw-button" id = "withdraw-${bankApp.currentUsers[i].name}" type = "button">Withraw</button>`;
        cellFive.innerHTML = `<button class = "deposit-button" id = "deposit-${bankApp.currentUsers[i].name}" type = "button">Deposit</button>`;
        cellSix.innerHTML =`<button class = "transfer-button" id = "transfer-${bankApp.currentUsers[i].name}" type = "button">Transfer</button>`;
        cellSeven.innerHTML =`<button class = "received-button" id = "received-${bankApp.currentUsers[i].name}" type = "button">Received</button>`;

    }
    if(bankApp.currentUsers.length > 12){
        document.querySelector('#transaction .list-users').style.overflowY = 'scroll';
        document.querySelector('#transaction .list-users table').style.height = '60%';
    }
}

const btn = document.querySelectorAll('#list-users button');
btn.forEach(item => {
    item.addEventListener('click', showHistory)
})

function showHistory(e){
    let button = e.target;
    if(button.className === "withdraw-button"){
        console.log('withdraw');
        showHistoryWithdraw(button);
    }
    else if(button.className === "deposit-button"){
        console.log('deposit');
        showHistoryDeposit(button);
    }
    else if(button.className === "transfer-button"){
        console.log('transfer')
        showHistoryTransfer(button);
    }
    else if(button.className === "received-button")
   showHistoryReceived(button);
}

function showHistoryDeposit(e){
    let button = e;
    console.log(button.id)
    for(j=0; j< bankApp.currentUsers.length; j++){
        if(button.id === `deposit-${bankApp.currentUsers[j].name}`){
            list_users_modal.style.visibility = 'visible';
            list_users_modal.style.pointerEvents = 'auto';
            document.querySelector('#list-users .modal h1').innerHTML =`${bankApp.currentUsers[j].name}'s Deposit History` ;
            let depoHist = bankApp.currentUsers[j].histDeposit;
            let depoAmount = bankApp.currentUsers[j].depositAmnt;
            
            for(i=0; i<depoHist.length; i++){
                let row = list_users_modalRow.insertRow(-1)
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);

                cell1.append(`${depoHist[i].slice(0,10)}`);
                cell2.append(`${formatter.format(depoAmount[i])}`)
            }
        }
    }
}

function showHistoryWithdraw(e){
    let button = e;
    for(j=0; j< bankApp.currentUsers.length; j++){
        if(button.id === `withdraw-${bankApp.currentUsers[j].name}`){
            list_users_modal.style.visibility = 'visible';
            list_users_modal.style.pointerEvents = 'all';
            document.querySelector('#list-users .modal h1').innerHTML =`${bankApp.currentUsers[j].name}'s Withdraw History` ;

            let withdrawHist = bankApp.currentUsers[j].histWithdraw;
            let withdrawAmount = bankApp.currentUsers[j].withdrawAmnt;
            for(i=0; i< withdrawHist.length; i++){
                let row = list_users_modalRow.insertRow(-1)
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);

                cell1.append(`${withdrawHist[i].slice(0,10)}`);
                cell2.append(`${formatter.format(withdrawAmount[i])}`)
            }
        }
    }
}

function showHistoryTransfer(e){
    let button = e;
    for(i=0; i < bankApp.currentUsers.length; i++){
        if(button.id === `transfer-${bankApp.currentUsers[i].name}`){
            list_users_modal.style.visibility = 'visible';
            list_users_modal.style.pointerEvents = 'all';
            let cell_receiver = document.querySelector('#list-users .modal table tbody tr').insertCell(1);
            cell_receiver.outerHTML = '<th>Receiver</th>';
            document.querySelector('#list-users .modal table tbody #amount').innerHTML = 'Amount Sent'
            document.querySelector('#list-users .modal h1').innerHTML =`${bankApp.currentUsers[i].name}'s Transfer History` ;
            let histSent = bankApp.currentUsers[i].histSent;
            let receiverHist = bankApp.currentUsers[i].receiver;
            let amountSent = bankApp.currentUsers[i].amount_sent;
            

            for(j=0; j < receiverHist.length; j++){
                let row = list_users_modalRow.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);

                cell1.append(`${histSent[j].slice(0,10)}`);
                cell2.append(`${receiverHist[j].slice(0,10)}`);
                cell3.append(`${formatter.format(amountSent[j])}`)

            }
        }
    }
}

function showHistoryReceived(e){
    let button =e;
    for(i=0; i< bankApp.currentUsers.length; i++){
        if(button.id === `received-${bankApp.currentUsers[i].name}`){
            list_users_modal.style.visibility = 'visible';
            list_users_modal.style.pointerEvents = 'all';
            let cell_sender = document.querySelector('#list-users .modal table tbody tr').insertCell(1);
            cell_sender.outerHTML = '<th>Sender</th>';
            document.querySelector('#list-users .modal table tbody #amount').innerHTML = 'Amount Received'
            document.querySelector('#list-users .modal h1').innerHTML =`${bankApp.currentUsers[i].name}'s Request History` ;
            let histReceived = bankApp.currentUsers[i].histReceived;
            let senderHist = bankApp.currentUsers[i].sender;
            let amountReceived = bankApp.currentUsers[i].amount_received;

            for(j=0; j < senderHist.length; j++){
                let row = list_users_modalRow.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);

                cell1.append(`${histReceived[j].slice(0,10)}`);
                cell2.append(`${senderHist[j].slice(0,10)}`);
                cell3.append(formatter.format(amountReceived[j]));

            }
        }
    }
}

function closeModal(){
    list_users_modal.style.visibility = 'hidden';
    location.reload();
}
list_users_modal.addEventListener('click', closeModal);
