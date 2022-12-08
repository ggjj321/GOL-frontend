document.documentElement.setAttribute('data-theme','dark');

function signUpToCreateNewAccount(){
    let name = $("#name").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let comfirmPassword = $("#comfirmPassword").val();

    if (password == comfirmPassword){
        let account = {
            'name' : name,
            'password' : password,
            'phone' : phone,
            'email' : email
        };

        $.ajax({
            type : "POST",
            url : "http://127.0.0.1:8000/sign_up",
            data : JSON.stringify(account),
            contentType : "application/json",
            success : (response) => console.log(response),
        })
    }
}
