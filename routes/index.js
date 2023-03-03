var express = require('express');
const fetch = require("node-fetch");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    getTopics().then(val => {
        let topics = val._embedded.topics;
        topics = topics.reverse();
        getTags().then(val => {
            let tags = val["result"];
            res.render('topic', {topics: topics, tags: tags});
        })
    }).catch(err => {
        console.log(err)
    })
});

router.get('/talk-order', function (req, res, next) {
    getTalkOrders().then(val => {
        let talkOrders = val._embedded.talkOrders;
        talkOrders = talkOrders.reverse();
        for (let i = 0; i < talkOrders.length; i++) {
            let sep = talkOrders[i]["_links"]["talkOrder"]["href"].split("/")
            talkOrders[i].id = sep[sep.length - 1]
        }
        res.render('talkorder', {talkOrders: talkOrders});

    }).catch(err => {
        console.log(err)
    })
});

function getTalkOrders() {
    return new Promise(function (resolved, rejected) {
        fetch("http://api.talkbbokki.me/talkOrders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                res
                    .json()
                    .then((val) => {
                        resolved(val);
                    })
                    .catch((err) => {
                        rejected(err);
                    });
            })
            .catch((err) => {
                rejected(err);
            });
    });
}

function getTopics() {
    return new Promise(function (resolved, rejected) {
        fetch("http://api.talkbbokki.me/topics", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                res
                    .json()
                    .then((val) => {
                        resolved(val);
                    })
                    .catch((err) => {
                        rejected(err);
                    });
            })
            .catch((err) => {
                rejected(err);
            });
    });
}

function getTags() {
    return new Promise(function (resolved, rejected) {
        fetch("http://api.talkbbokki.me/api/tags", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                res
                    .json()
                    .then((val) => {
                        resolved(val);
                    })
                    .catch((err) => {
                        rejected(err);
                    });
            })
            .catch((err) => {
                rejected(err);
            });
    });
}

module.exports = router;
