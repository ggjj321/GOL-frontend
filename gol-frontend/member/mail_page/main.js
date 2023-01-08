var button = document.querySelector('.write');
var showtxt = document.querySelector('.show');

$.ajax({
    type: "GET",
    url: "http://127.0.0.1/Issue/get_violation?skip=0&limit=100",
    headers: {
        Accept: "application/json",
        "Authorization": " Bearer " + getCookie("access_token")
    },
    success: (response) => {
        response.forEach(element => {
            console.log(element);
            $(".main-widget").append(
                `<div class="each-mail">
                    <a>
                        <h3 class="mail-title">violation : ${element["violation_content"]}</h3>
                    </a>   
                </div>`
            );
        })
    },
    error: (response) => console.log(response),
});

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

function popup3(e) {
    var guest = window.prompt('sent the need refunded game id', '');
    if (guest == null || "") {
        showtxt.innerHTML = '您已取消輸入'
    } else {
        let issue = {
            "issue_id": 0,
            "create_at": "2023-01-07T17:32:41.355Z",
            "issue_type": 1,
            "issue_deleted_at": null,
            "user_id": 0,
            "violation_content": "string",
            "refund_acception": true,
            "refund_gameId": guest
        };

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/Issue/add_issue_Refund",
            data: JSON.stringify(issue),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": " Bearer " + getCookie("access_token")
            },
            success: (response) => {
                alert("sent refund");
            },
            error: (response) => console.log(response),
        });
    }
}

button.addEventListener('click', popup3);