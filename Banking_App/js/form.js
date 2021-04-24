
const adminInput = {
    name: document.querySelector('#log-in #name'),
    email: document.querySelector('#log-in #email'),
    password:document.querySelector('#log-in #password')

}
const log_in_btn = document.querySelector('#log-in #log');
adminInput.name.value= 'Leif';
adminInput.email.value = 'family@bank';
adminInput.password.value ='familybank';
//======================= LOG-IN ADMIN ====================================//
log_in_btn.addEventListener('click', logIn);
function logIn(e){
    if(adminInput.name.value.length > 1 && adminInput.password.value.length > 1){
        e.preventDefault();
        validate(adminInput.name.value,adminInput.password.value,adminInput.email.value);
        
    }

    function validate(adminName, adminPass, adminEmail){
        if(adminName === bankApp.bankAdmin.name && adminPass=== bankApp.bankAdmin.password && adminEmail=== bankApp.bankAdmin.email){
            location.href = 'main.html';
        }
        else{
            alert('Incorrect Input!!');
        }
    }
}

