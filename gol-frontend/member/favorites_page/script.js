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

function openImg() {
    var image = document.getElementById('image');
    var source = image.src;
    window.open(source);
}

$.ajax({
    type: "GET",
    url: "http://127.0.0.1/Cart/get_cart_or_lib?isLib=true&skip=0&limit=100",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": " Bearer " + getCookie("access_token")
    },
    success: (response) => {
        total_money = 0;
        response.forEach(element => {
            $(".review-photo").append(
                `<div>
                <a href = "javascript:routeToDetail(${element["game_id"]})">
                    <img class="review" src="${element["game_picture"]}"  referrerpolicy="no-referrer">
                </a>
                <button class="btn-plus" type="button"><i class="gg-math-plus"></i></button>
                <button class="btn-readme" type="button"><i class="gg-readme"></i></button>
                </div>`
            );
            total_money += parseInt(element["game_sale_price"]) * (1 - parseFloat(element["game_discount"]));
        });
    },
    error: (response) => console.log(response),
});