(function () {
    
    $.ajax({
        type: "GET",
        url: "Session",
        async: false,
        success: function(data){
            if(data == 0){
                window.location = 'index.html';
            }
        }
    });
    
    var $search = $('.js-search');
    var $result = $('.js-results');

    $search.keyup(function () {
        $result.html("");
        var $url = "http://api.deezer.com/search/track?q=" + $search.val() + "&output=jsonp";
        $.ajax({
            url: $url,
            jsonp: "callback",
            dataType: "jsonp",
            type: 'GET',
            data: {
                format: "json"
            },
            success: function (response) {
                $.each(response.data, function (i, element) {
                    var $song = "<div class=\"song clearfix\">\n" +
                            "                <p class=\"name\">" + element.title + "</p>\n" +
                            "                <p class=\"artist\">" + element.artist.name + "</p>\n" +
                            "                <button onClick=\"radio(" + element.id + "); return false;\" class=\"_button _button-5\" type=\"button\">+radio</button>\n" +
                            "                <button onClick=\"my(" + element.id + "); return false;\" class=\"_button _button-6\" type=\"button\">+my</button>\n" +
                            "            </div>";
                    $result.append($song);
                });
            }
        });
    });
})();

function my(id) {
    $.ajax({
        type: "POST",
        url: "PrivateSong",
        data: {SongID: id},
    });
    alert("Song added to your playlist.")
}

function radio(id) {
    $.ajax({
        type: "POST",
        url: "PublicSong",
        data: {SongID: id},
    });
    alert("Song added to the radio.")
}