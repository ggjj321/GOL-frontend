document.documentElement.setAttribute('data-theme', 'dark');

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

function createGame() {
    let image = $('#file').prop('files')[0];
    const formdata = new FormData()
    formdata.append("image", image);
    console.log(formdata);

    fetch("https://api.imgur.com/3/image/", {
        method: "post",
        headers: {
            Authorization: "Client-ID 2bc809be1863321"
        },
        body: formdata
    }).then(data => data.json()).then(data => {
        let imgURL = data.data.link;
        let name = $(".name").val();
        let genre = $(".genre").val();
        let introduction = $(".introduction").val();
        let price = $(".price").val();
        let version = $(".version").val();

        let game = {
            'game_sale_price': parseInt(price),
            'game_developer': "",
            "game_picture": imgURL,
            "game_introduction": introduction,
            "game_discount": 0,
            "game_genre": genre,
            "game_version": version,
            "game_developer_id": 0,
            "game_id": 0,
            "create_at": Date.now(),
            "game_name": name
        };

        let token = getCookie("access_token");

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/Game/add_game",
            data: JSON.stringify(game),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": " Bearer " + token
            },
            success: (response) => alert("success upload"),
            error: (response) => console.log(response),
        });
    })
}