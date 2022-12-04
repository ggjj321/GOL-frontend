document.documentElement.setAttribute('data-theme','dark');

function signUpToCreateNewAccount(){
    let name = $("#name").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let comfirmPassword = $("#comfirmPassword").val();

    if (password == comfirmPassword){
        let user = JSON.stringify(
            {
                "name" : name,
                "password" : password,
                "phone" : phone,
                "email" : email
            }
        );

        console.log(typeof user);

        $.post("http://127.0.0.1:8000/sign_up", {'user': user}, function(result){
            console.log(user);
        });
    }
}
