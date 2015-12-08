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
    
    var $player = $('.js-player');
    var $result = $('.js-results');
    var $songs;
    var m = 1;

    $.ajax({
        type: "GET",
        url: "PrivateList",
        success: function (data) {
            $songs = jQuery.parseJSON(data);

            $.each($songs, function (i, song) {
                var $url = "http://api.deezer.com/track/" + song + "&output=jsonp";
                $.ajax({
                    url: $url,
                    jsonp: "callback",
                    dataType: "jsonp",
                    type: 'GET',
                    async: false,
                    data: {
                        format: "json"
                    },
                    success: function (response) {
                        var $song = "<div class=\"song clearfix\">\n" +
                                "                <p class=\"name\">" + response.title + "</p>\n" +
                                "                <p class=\"artist\">" + response.artist.name + "</p>\n" +
                                "                <button onClick=\"radio(" + response.id + ");\n" +
                                "                        return false;\" class=\"_button\" type=\"button\">+radio</button>\n" +
                                "            </div>";
                        $result.append($song);
                        if (i == 0)
                            $player.attr('src', response.preview);
                    }
                });
            });
        }
    });

    $player.bind("ended", function () {
        var $url = "http://api.deezer.com/track/" + $songs[m] + "&output=jsonp";
        $.ajax({
            url: $url,
            jsonp: "callback",
            dataType: "jsonp",
            type: 'GET',
            async: false,
            data: {
                format: "json"
            },
            success: function (response) {
                $player.attr('src', response.preview);
            }
        });
        m++;
    });
})();


function radio(id) {
    $.ajax({
        type: "POST",
        url: "PublicSong",
        data: {SongID: id},
    });
    alert("Song added to the radio.")
}