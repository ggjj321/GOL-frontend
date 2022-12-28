document.documentElement.setAttribute('data-theme','dark');

let tokenCookie = document.cookie;

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

const createCookie = (userInfo) => {
    tokenCookie += userInfo.username + "=" + userInfo.password + ";";
}


const onclickLogin = () => {
    // let formData = new FormData();
    // formData.append('username', 'kll');
    // formData.append('password', '123456');
    // console.log(formData);

    const userInfo = {
        'username' : document.getElementById("username").value,
        'password' : document.getElementById("password").value
    }
    console.log(userInfo);

    fetch('http://0.0.0.0:80/login', {
        method: 'POST',
        body: JSON.stringify(userInfo),
    })
    .then(response => {
        console.log(response);
        createCookie(userInfo);
    })
    .catch(err => {
        console.log(err)
    })
    console.log(tokenCookie);
};

