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
    var flag = 0;
    $.ajax({
        type: "GET",
        url: "PublicPlaylist",
        success: function (data) {
            $songs = jQuery.parseJSON(data);
            $.each($songs, function (i, song) {
                var $url = "http://api.deezer.com/track/" + song + "&output=jsonp";
                var $likes = 0;
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
                        $.ajax({
                            url: "Likes",
                            type: "GET",
                            data: {SongID: song},
                            async: false,
                            success: function (data) {
                                $likes = data;
                            }
                        });
                        var $song = "<div class=\"song clearfix\">\n" +
                                "                <p class=\"name\">" + response.title + "</p>\n" +
                                "                <p class=\"artist\">" + response.artist.name + "</p>\n" +
                                "                <button onClick=\"my(" + response.id + "); return false;\" class=\"_button _button-5\" type=\"button\">+my</button>\n" +
                                "                <button onClick=\"like(" + response.id + "); return false;\" id=\"like_" + response.id + "\" class=\"_button _button-6 js-like\" type=\"button\">" + $likes + "</button>\n" +
                                "            </div>";
                        $result.append($song);
                        if (i == 0){
                            flag = 1;
                            $player.attr('src', response.preview);
                        }
                    }
                });
            });
        }
    });

    $player.bind("ended", function () {
        $result.html("")
        $.ajax({
            type: "GET",
            url: "PublicPlaylist",
            success: function (data) {
                $songs = jQuery.parseJSON(data);
                $.each($songs, function (i, song) {
                    var $url = "http://api.deezer.com/track/" + song + "&output=jsonp";
                    var $likes = 0;
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
                            $.ajax({
                                url: "Likes",
                                type: "GET",
                                data: {SongID: song},
                                async: false,
                                success: function (data) {
                                    $likes = data;
                                }
                            });
                            var $song = "<div class=\"song clearfix\">\n" +
                                    "                <p class=\"name\">" + response.title + "</p>\n" +
                                    "                <p class=\"artist\">" + response.artist.name + "</p>\n" +
                                    "                <button onClick=\"my(" + response.id + "); return false;\" class=\"_button _button-5\" type=\"button\">+my</button>\n" +
                                    "                <button onClick=\"like(" + response.id + "); return false;\" id=\"like_" + response.id + "\" class=\"_button _button-6 js-like\" type=\"button\">" + $likes + "</button>\n" +
                                    "            </div>";
                            $result.append($song);
                            if (i == 0 && flag == 0)
                                $player.attr('src', response.preview);
                        }
                    });
                });
            }
        });
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

function like(id) {
    $.ajax({
        type: "POST",
        url: "Like",
        data: {SongID: id},
        success: function (data) {
            $('#like_' + id).html(data);
        }
    });
}

function my(id) {
    $.ajax({
        type: "POST",
        url: "PrivateSong",
        data: {SongID: id}
    });
    alert("Song added to your playlist.");
}