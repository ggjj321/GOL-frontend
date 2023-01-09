document.documentElement.setAttribute('data-theme', 'dark');

function routeToDetail(game_id) {
    document.cookie = "detailgameID=" + game_id + "; path=/";
    window.location.href = "../game_detail_page/game_detail.html";
}

$.ajax({
    type: "GET",
    url: "http://127.0.0.1/Game/get_game_data?skip=0&limit=100",
    headers: {
        Accept: "application/json",
    },
    success: (response) => {
        response.forEach(element => {
            $(".review-photo").append(
                `<div>
                <a href = "javascript:routeToDetail(${element["game_id"]})">
                    <img class="review" src="${element["game_picture"]}"  referrerpolicy="no-referrer">
                </a>
                <button class="btn-plus" type="button"><i class="gg-math-plus"></i></button>
                <button class="btn-readme" type="button"><i class="gg-readme"></i></button>
                </div>`
            )
        });
    },
    error: (response) => console.log(response),
});