
//=============== DEPOSIT =======================//
const depositor = {
    name: document.querySelector('#deposit #deposit-form #depositor'),
    balance: document.querySelector('#deposit #deposit-form #dep-amnt'),
}
const depositMoney = document.querySelector('#deposit #deposit-form #deposit-btn');

depositMoney.addEventListener('click', addMoney);
function addMoney(e){
    if(depositor.name.value.length > 1 && depositor.balance.value > 0){
        e.preventDefault();
        if(bankApp.currentUsers.some(item => item.name === depositor.name.value.toUpperCase())){
            valideDeposit(depositor.name.value, depositor.balance.value)
            location.reload();
        }

        else if(!bankApp.currentUsers.some(item => item.name === depositor.name.value)){
            alert('User does not Exist!!');
        }
    }
}

//=================== WITHDRAW ===========================//

const withdrawer = {
    name: document.querySelector('#withdraw #withdraw-form #withdrawer'),
    balance: document.querySelector('#withdraw #withdraw-form #with-amnt'),
}
const withdrawMoney = document.querySelector('#withdraw #withdraw-form #withdraw-btn');

withdrawMoney.addEventListener('click', removeMoney);
function removeMoney(e){
    if(withdrawer.name.value.length > 1 && withdrawer.balance.value > 0){
        e.preventDefault();
        if(bankApp.currentUsers.some(item => item.name === withdrawer.name.value.toUpperCase())){
            validateWithdraw(withdrawer.name.value, withdrawer.balance.value);
            location.reload();
        }
        else{
            alert('User does not Exist!!');
        }
    }
}

//=================== NAV BUTTON =========================================//
const navMenu = {
    depositBtn: document.querySelector('.side-bar .menu-link #deposit-link'),
    withdrawBtn: document.querySelector('.side-bar .menu-link #withdraw-link'),
    transferBtn: document.querySelector('.side-bar .menu-link #transfer-link'),

    hideBtns: function(){
        document.getElementById('deposit').style.visibility = 'hidden';
        document.getElementById('withdraw').style.visibility = 'hidden';
        document.getElementById('send').style.visibility = 'hidden';
    },
    navigate: function(){
        this.depositBtn.addEventListener('click', function(){
            navMenu.hideBtns();
            document.getElementById('deposit').style.visibility = 'visible';   
        })
        this.withdrawBtn.addEventListener('click', function(){
            navMenu.hideBtns();
            document.getElementById('withdraw').style.visibility = 'visible';
        })
        this.transferBtn.addEventListener('click', function(){
            navMenu.hideBtns();
            document.getElementById('send').style.visibility = 'visible';
        })
    }
}
navMenu.navigate()


// function calcWithdraw(){
//     for(i =0; i <bankApp.currentUsers.length; i++){
//         if(bankApp.currentUsers[i].name === withdrawer.name.value && bankApp.currentUsers[i].balance >= withdrawer.balance.value){
//             bankApp.currentUsers[i].balance -= parseInt(withdrawer.balance.value);
//             let newVal = JSON.stringify( bankApp.currentUsers[i]);
//             localStorage.setItem(`${i}`, newVal);
//             alert('Successful Transaction!!');
//         }
//         else if(bankApp.currentUsers[i].name === withdrawer.name.value && bankApp.currentUsers[i].balance < withdrawer.balance.value){
//             return alert('Insufficient Fund!!');
//         }
//     }
// }