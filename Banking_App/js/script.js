
const bankApp = {
    name:'Family Bank',
    bankAdmin:{
        name: 'Leif',
        email: 'family@bank',
        password: 'familybank',
    },
    currentUsers:[],
   
}

const formatter = new Intl.NumberFormat('en',{
    style: 'currency',
    currency: 'php',
})

extractLocalStorage();
function user(username,user_num, user_balance){
    this.name = username.toUpperCase();
    this.accntNum = user_num;
    this.balance = parseFloat(user_balance);
    this.histDeposit = [];
    this.histWithdraw = [];
    this.depositAmnt = [];
    this.withdrawAmnt = [];

//====== FOR STORING TRANSFER DATA =====//
    this.sender = [];
    this.receiver = [];
    this.amount_received = [];
    this.amount_sent =[];
    this.histReceived = [];
    this.histSent = [];
}

function create_user(username,user_balance){
    let clientNum = 'Client#' + bankApp.currentUsers.length;
    let newUser = new user(username,clientNum, user_balance);
    if(!bankApp.currentUsers.some(item=> item.name === username.toUpperCase())){
        let index = bankApp.currentUsers.length;
        let Str = JSON.stringify(newUser);
        localStorage.setItem(`${index}`, Str);
    }
    else if(bankApp.currentUsers.some(item=> item.name === username.toUpperCase())){
        console.log('User alreadty Exist!');
        alert('User alreadty Exist!');
    }
}


//================= FOR STORED USERS ===========================//
function extractLocalStorage(){
    for(i=0; i < localStorage.length; i++){
        let record = localStorage.getItem(`${i}`);
        let Object = JSON.parse(record);
        bankApp.currentUsers.push(Object);
    }
}
//=================== DEPOSIT ========================================//
//=================== TRY USING "[index]"" of bankApp.currentUser[index].balance ===============//
function deposit(username, amount){
    for(i=0;i<bankApp.currentUsers.length; i++){
        if(bankApp.currentUsers[i].name === username){
            bankApp.currentUsers[i].balance += parseFloat(amount)
            bankApp.currentUsers[i].histDeposit.push(new Date);
            bankApp.currentUsers[i].depositAmnt.push(amount);
            let newVal = JSON.stringify(bankApp.currentUsers[i])
            localStorage.setItem(`${i}`, newVal);
            alert(`${formatter.format(amount)} is added to ${bankApp.currentUsers[i].name}'s account`);
        }
    }
   
}

function valideDeposit(username, amount){
    let capName = username.toUpperCase();
    if(bankApp.currentUsers.some(item => item.name === capName)){
        deposit(capName, amount);
    }
}

//=========================== WITHDRAW =========================================//
function withdraw(username, amount){
    for(let i=0;i<bankApp.currentUsers.length; i++){
        if(bankApp.currentUsers[i].name === username){
           return compute(amount);
        }

        function compute(amount){
            if(bankApp.currentUsers[i].balance < amount){
                alert( 'Insufficient Balance!');
            }
            else{
                bankApp.currentUsers[i].balance -= parseFloat(amount);
                bankApp.currentUsers[i].histWithdraw.push(new Date);
                bankApp.currentUsers[i].withdrawAmnt.push(amount);
                let newVal = JSON.stringify(bankApp.currentUsers[i]);
                localStorage.setItem(`${i}`, newVal);
                alert(`Withdrew amount ${formatter.format(amount)}`);
            }
        }
    }
}

function validateWithdraw(username, amount){
    let capName = username.toUpperCase()
    if(bankApp.currentUsers.some(item => item.name === capName)){
        withdraw(capName, amount);
    }
}

//===================== TRANSFER FUND =================================//

function sendUserTwo(userTwo, userOne, amount){
    for(let j =0; j < bankApp.currentUsers.length;j++){
        if(bankApp.currentUsers[j].name === userTwo && userOne.balance >=parseFloat(amount)){
            userOne.balance -= parseInt(amount);
            bankApp.currentUsers[j].balance += parseFloat(amount);
            userOne.receiver.push(`${bankApp.currentUsers[j].name}`);
            userOne.amount_sent.push(amount);
            userOne.histSent.push(new Date);
            bankApp.currentUsers[j].sender.push(`${userOne.name}`);
            bankApp.currentUsers[j].amount_received.push(amount);
            bankApp.currentUsers[j].histReceived.push(new Date);
            let newValOne = JSON.stringify(userOne);
            let newValTwo = JSON.stringify(bankApp.currentUsers[j]);
            localStorage.setItem(`${bankApp.currentUsers.indexOf(userOne)}`, newValOne);
            localStorage.setItem(`${j}`, newValTwo);
            return alert( `Amount Php ${amount}.00 has been successfuly sent to ${bankApp.currentUsers[j].name}!`)
        }
        else if(userOne.balance < parseFloat(amount)){
            return alert( `Insufficient Fund!`)
        }
    }
}

function send(user_one, user_two, amount){
    if(user_one != user_two){
        for(let i=0; i < bankApp.currentUsers.length;i++){
            if(bankApp.currentUsers[i].name === user_one){
                return sendUserTwo(user_two, bankApp.currentUsers[i], amount);
            }
        }
    }
    else if(user_one === user_two){
        alert(`Cannot Transfer to Self!!`)
    }
    
}
function validateSend(userOne, userTwo, amount){
    let capOne = userOne.toUpperCase();
    let capTwo = userTwo.toUpperCase();
    if(bankApp.currentUsers.some(item => item.name === capOne) && bankApp.currentUsers.some(item => item.name === capTwo)){
        send(capOne, capTwo, amount);
    }
    else if(!bankApp.currentUsers.some(item => item.name === capOne)){
        alert(`${capOne} Does Not Exist!`);
    }
    else if(!bankApp.currentUsers.some(item => item.name === capTwo)){
        alert(`${capTwo} Does Not Exist!`);
    }
}

