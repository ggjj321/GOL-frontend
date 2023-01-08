var button = document.querySelector('.write');
var showtxt = document.querySelector('.show');

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

function applyRefund(issueID, refundMoney, game_id) {
    var guest = window.prompt('accept this refund?', '');
    if (guest == null || "") {
        showtxt.innerHTML = '您已取消輸入'
    } else {
        console.log(issueID, refundMoney);
        $.ajax({
            type: "PATCH",
            url: "http://127.0.0.1/Issue/update_issue_refund_acception?game_id=" + game_id + "&issue_id=" + issueID + "&refund=" + refundMoney,
            headers: {
                Accept: "application/json",
                "Authorization": " Bearer " + getCookie("access_token")
            },
            success: (response) => {
                alert("accept refund");
                window.location.href = "mail.html";
            },
            error: (response) => console.log(response),
        });
    }
}


$.ajax({
    type: "GET",
    url: "http://127.0.0.1/Issue/get_refund?skip=0&limit=100",
    headers: {
        Accept: "application/json",
        "Authorization": " Bearer " + getCookie("access_token")
    },
    success: (response) => {
        response.forEach(element => {
            if (element["Issue"]["refund_acception"] == false && element["Issue"]["issue_type"] == "Refund") {
                $(".main-widget").append(
                    `<div class="each-mail">
                        <a href="javascript:applyRefund(${element["Issue"]["issue_id"]}, ${element["Game"]["game_sale_price"]}, ${element["Game"]["game_id"]})">
                        <h3 class="mail-title">user name : ${element["User"]["name"]} game name : ${element["Game"]["game_name"]} sale price : ${element["Game"]["game_sale_price"]}</h3>
                        </a>   
                    </div>`
                );
            }
        })
    },
    error: (response) => console.log(response),
});

function popup3(e) {
    var guest = window.prompt('sent the violation to user', '').split(":");
    if (guest == null || "") {
        showtxt.innerHTML = '您已取消輸入'
    } else {
        let violation = {
            "issue_id": 0,
            "create_at": "2023-01-07T17:32:41.355Z",
            "issue_type": 1,
            "issue_deleted_at": null,
            "user_id": guest[0],
            "violation_content": guest[1],
            "refund_acception": false,
            "refund_gameId": 0
        };

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/Issue/add_issue_Vio",
            data: JSON.stringify(violation),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": " Bearer " + getCookie("access_token")
            },
            success: (response) => {
                alert("sent violation");
            },
            error: (response) => console.log(response),
        });
    }
}

button.addEventListener('click', popup3);