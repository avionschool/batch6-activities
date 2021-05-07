//==================== TRANSFER ACCOUNT ============================//

const twoUsers = {
    user1: document.querySelector('#send #sender-name'),
    user2: document.querySelector('#send #receiver-name'),
    amount: document.querySelector('#send #send-amount')
}
const sendBtn = document.querySelector('#send #send-button');

sendBtn.addEventListener('click', sendMoney);
function sendMoney(e){
    if(twoUsers.amount.value > 0){
        e.preventDefault()
        validateSend(twoUsers.user1.value, twoUsers.user2.value, twoUsers.amount.value);
        location.reload()
    }
     
}