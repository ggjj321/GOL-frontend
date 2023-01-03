function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getCurrentBalance() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1/user_info",
        dataType: 'json',
        headers: {
            "Authorization": " Bearer " + token
        },
        success: function (user) {
            $(".balance").text("balance : " + user["member_balance"] + "$");
        }
    });
}

let token = getCookie("access_token");
getCurrentBalance();

function addMoney() {
    let addMoney = $(".enter-dollar").val();
    console.log(addMoney);

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1/add_money?add_money=" + addMoney,
        dataType: 'json',
        headers: {
            "Authorization": " Bearer " + token,
            Accept: "application/json",
        },
        success: function (user) {
            $(".balance").text("balance : " + user["member_balance"] + "$");
        }
    });

    getCurrentBalance();
}