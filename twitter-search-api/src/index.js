import { Twitter } from 'twitter-node-client'

var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
    console.log(response, body)
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var config = {
    "consumerKey": "BHMosaWd5gd5Tuh6XjclenAnl",
    "consumerSecret": "q2N0k29qE8FVaHXeNBGdbmSqdBZFnMqOmiZtXjYPhwbD9Hmvv9",
}

var twitter = new Twitter(config);

twitter.getSearch({'q':'#haiku','count': 10}, error, success);