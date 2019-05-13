const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const model = require('./model');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.all('/*', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!\n');
});

// let tests = [{
//         id: '1',
//         msg: 'alice'
//     },
//     {
//         id: '2',
//         msg: 'bek'
//     },
//     {
//         id: '1',
//         msg: 'chris'
//     }
// ]

// app.get('/tests', (req, res) => {
//     return res.json(tests);
// });

app.get('/tests/:id', (req, res) => {
    console.log(req.params.id); // 사용자가 입력한 :id 값이 출력됨. (주의: 단 문자열 형식임 )
    res.header("Access-Control-Allow-Origin", "*");

    let uid = req.params.id
    if (!uid) {
        return res.status(404).json({
            error: 'Unknown user'
        });
    }
    // return res.json(uid)

    model.Chat.findAll({
            // order: [['createAt', 'DESC']],
            where: {
                [model.Op.or]: [{fromUid: uid}, {toUid: uid}]
              }
            // $or: [
            //     {
            //         fromUid: uid
            //     },
            //     {
            //         toUid: uid
            //     }
            //   ]
        // }
    }).then(chat => {
    if (!chat) {
        return res.status(404).json({
            error: 'No chat'
        });
    }

    return res.json(chat);
});
});

//cors 해결을 위해
app.options('/tests', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send();
});


app.post('/tests', (req, res) => {
    // req.header("Access-Control-Allow-Origin", "*");
    // res.header('Access-Control-Allow-Origin', '*');
    const msg = req.body.msg || '';
    const fromUid = req.body.fromUid || '';
    const toUid = req.body.toUid || '';
    const name = req.body.name || '';
    if (!msg.length) {
        return res.status(400).json({
            error: 'Incorrenct name'
        });
    }
    console.log(fromUid + ' : ' + msg);
    
    model.Chat.create({
        fromUid: fromUid,
        toUid: toUid,
        name: name,
        msg: msg
    }).then((chat) => {
        res.status(201).json(chat)
    })
    //   return res.status(201).json(newMsg);

});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    model.sequelize.sync({
            force: false
        })
        .then(() => {
            console.log('Databases sync');
        });
});