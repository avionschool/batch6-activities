
//================================ CREATE NEW USER ======================================//

const newUserInput = {
    last_name: document.querySelector('.register #new-last-name'),
    first_name: document.querySelector('.register #new-first-name'),
    // accntNum: document.querySelector('.register #new-accnt'),
    balance: document.querySelector('.register #init-depo'),
}
const registerBtn = document.querySelector('.register #submit');
registerBtn.addEventListener('click', function(e){
    if(newUserInput.last_name.value.length > 1 && newUserInput.first_name.value.length > 1){
        e.preventDefault();
        create_user(newUserInput.last_name.value, newUserInput.first_name.value, newUserInput.balance.value);
        document.querySelector('.register').reset();
    }
});


