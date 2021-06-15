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
const clientNum_formatter = new Intl.NumberFormat({minimumIntegerDigits: 3})

extractLocalStorage();
function user(firstname, lastname,user_num, user_balance){
    this.name =`${firstname.toUpperCase()}, ${lastname.toUpperCase()}`;
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
function generate_accntNum(){
    let clientNum = `${clientNum_formatter.format(Math.floor(Math.random() * 1000))}-${clientNum_formatter.format(Math.floor(Math.random() * 1000))}-${clientNum_formatter.format(Math.floor(Math.random() * 1000))}`;
    if(!bankApp.currentUsers.some(item=> item.accntNum === clientNum)){
        return clientNum
    }
    else{
        generate_accntNum()
    }
}

function create_user(firstname, lastname,user_balance){
    let newUser = new user(firstname, lastname,generate_accntNum(), user_balance);
    if(!bankApp.currentUsers.some(item=> item.name === newUser.name)){
        let Str = JSON.stringify(newUser);
        localStorage.setItem(`${newUser.name}`, Str);
    }
    else if(bankApp.currentUsers.some(item=> item.name === newUser.name)){
        console.log('User alreadty Exist!');
        alert('User alreadty Exist!');
    }
}


//================= FOR STORED USERS ===========================//
function extractLocalStorage(){
   for(i=0; i < localStorage.length; i++){
       console.log(localStorage.key(i));
       let record = localStorage.getItem(localStorage.key(i));
       let object = JSON.parse(record);
       bankApp.currentUsers.push(object)
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
            localStorage.setItem(bankApp.currentUsers[i].name, newVal);
            document.querySelector('#deposit-form').reset()
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
                localStorage.setItem(bankApp.currentUsers[i].name, newVal);
                document.querySelector('#withdraw-form').reset()
                alert(`Withdrew amount ${formatter.format(amount)} from ${bankApp.currentUsers[i].name}'s account`);
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
            let userOneIndex = bankApp.currentUsers.indexOf(userOne);
            localStorage.setItem(bankApp.currentUsers[userOneIndex].name, newValOne);
            localStorage.setItem(bankApp.currentUsers[j].name, newValTwo);
            return alert( `Amount Php ${amount} has been successfuly sent to ${bankApp.currentUsers[j].name}!`)
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

