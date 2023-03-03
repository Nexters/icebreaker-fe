var express = require('express');
var fetch = require("node-fetch");
var router = express.Router();
const axios = require('axios');

/* GET users listing. */

router.post('/update-topics', function (req, res) {
    let body = req.body;
    if (typeof body === "undefined") {
        res.send("Err")
    }
    if (typeof body.id === "undefined") {
        res.send("Err")
    }
    if (typeof body.name === "undefined") {
        res.send("Err")
    }
    axios({
        method: "patch",
        url: "http://api.talkbbokki.me/topics/" + body.id,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            "id": body.id,
            "name": body.name,
            "tag": body.tag,
            "category": body.category
        }
    }).then(val => {
        res.send(val)
    }).catch(err => {
        res.send(err)
    })
})

router.post('/delete-topics', function (req, res) {
    let body = req.body;
    if (typeof body === "undefined") {
        res.send("Err")
    }
    if (typeof body.id === "undefined") {
        res.send("Err")
    }
    axios({
        method: "delete",
        url: "http://api.talkbbokki.me/topics/" + body.id,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            "id": body.id,
        }
    }).then(val => {
        res.send(val)
    }).catch(err => {
        res.send(err)
    })
})

router.post('/add-topics', function (req, res) {
    let body = req.body;
    if (typeof body === "undefined") {
        res.send("Err")
    }
    if (typeof body.name === "undefined") {
        res.send("Err")
    }
    if (typeof body.tag === "undefined") {
        res.send("Err")
    }
    if (typeof body.category === "undefined") {
        res.send("Err")
    }
    axios({
        method: "post",
        url: "http://api.talkbbokki.me/topics",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            "name": body.name,
            "tag": body.tag,
            "category": body.category,
            "viewCount": 0,
            "createAt": new Date().toISOString(),
            "exposedAt": new Date().toISOString(),
        }
    }).then(val => {
        res.send(val)
    }).catch(err => {
        res.send(err)
    })
})

router.post('/add-talkorder', function (req, res) {
    let body = req.body;
    if (typeof body === "undefined") {
        res.send("Err")
    }
    if (typeof body.rule === "undefined") {
        res.send("Err")
    }
    axios({
        method: "post",
        url: "http://api.talkbbokki.me/talkOrders",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            "rule": body.rule,
        }
    }).then(val => {
        res.send(val)
    }).catch(err => {
        res.send(err)
    })
})

router.post('/delete-talkorder', function (req, res) {
    let body = req.body;
    if (typeof body === "undefined") {
        res.send("Err")
    }
    if (typeof body.id === "undefined") {
        res.send("Err")
    }
    axios({
        method: "delete",
        url: "http://api.talkbbokki.me/talkOrders/" + body.id,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            "id": body.id,
        }
    }).then(val => {
        res.send(val)
    }).catch(err => {
        res.send(err)
    })
})


router.post('/update-talkorder', function (req, res) {
    let body = req.body;
    if (typeof body === "undefined") {
        res.send("Err")
    }
    if (typeof body.id === "undefined") {
        res.send("Err")
    }
    if (typeof body.rule === "undefined") {
        res.send("Err")
    }
    axios({
        method: "patch",
        url: "http://api.talkbbokki.me/talkOrders/" + body.id,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            "id": body.id,
            "rule": body.rule,
        }
    }).then(val => {
        res.send(val)
    }).catch(err => {
        res.send(err)
    })
})


module.exports = router;
