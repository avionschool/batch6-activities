
//================================ CREATE NEW USER ======================================//

const newUserInput = {
    name: document.querySelector('.register #new-name'),
    // accntNum: document.querySelector('.register #new-accnt'),
    balance: document.querySelector('.register #init-depo'),
}
const registerBtn = document.querySelector('.register #submit');
registerBtn.addEventListener('click', function(e){
    if(newUserInput.name.value.length > 1){
        e.preventDefault();
        create_user(newUserInput.name.value,newUserInput.balance.value);
        location.reload();
    }
});


