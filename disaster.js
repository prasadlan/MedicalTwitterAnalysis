module.exports = {
    analyze: function (searchString, response) {

        //init twitter params
        var twit = require('twitter');
        var config = {
            consumer_key: 'cawTdQqUijbgrd8LPeQyoteUo',
            consumer_secret: 'onO5zUrs38VMx2F5cgA2ffSqnv9azhv2t5lEEIkqKh7HMHw62p',
            access_token_key: '776146037459279873-Vviu9KQ51v8x1BD5YEDBPl61BI5DWPB',
            access_token_secret: 'ZyZ1ILcnuM08RK7Yhs4ant5HIg6PCO2s0Wr4IiePploDH'
        };
        var twitterClient = new twit(config);
        console.log(searchString);
        var params = { q: searchString, count: 100,result_type: 'popular',lang:'en'};

        //pass twitter data to watson
        twitterClient.get('search/tweets', params, function(error, tweets) {
            if (!error) {
                var iter = tweets.statuses.length;
                //var fs = require('fs');
                //fs.open('out.txt', 'a+', function(err) {
                    for (i = 0; i < iter; i++) {
                        console.log ( tweets.statuses[i].text);
                        var mainstring = tweets.statuses[i].text;
                        console.log(mainstring);
                        if(mainstring !== ""){
                            var lastIndex = mainstring.lastIndexOf("https:");
                            var texts = mainstring.substring(0, lastIndex-1);
                            var url = mainstring.substring(lastIndex, mainstring.length);
                            tweets.statuses[i].text = texts;
                            tweets.statuses[i].redirectUrl = url;
                            console.log(texts);
                            console.log(url);
                        }
                    } 
                    return response(null, tweets.statuses);     
            }
        });
    }
};







