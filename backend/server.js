// 필요한 모듈들을 가져오기
const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

// Express 서버 생성
const app = express();

// json 형태의 요청의 본문을 해석할 수 있도록 등록
app.use(bodyParser.json());

// 테이블 생성
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)

)`, (err, results, fields) => {
    console.log('results', results)
})

// DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get('/api/values', function(req, res) {
    // DB에서 모든 데이터 가져오기
    db.pool.query('SELECT * FROM lists;',
    (err, results, fields) => {
        if(err) 
            return res.status(500).send(err)
        else
            return res.json(results)
    })
});

// 클라이언트에서 입력한 값을 DB lists 테이블에 넣어주기
app.post('/api/value', function(req, res, next) {
    console.log('insert!!!')
    // DB에 값 넣어주기
    // body-parser 모듈을 통해 클라이언트의 body request를 쉽게 받아올 수 있음
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fields) => {
            if(err)
                return res.status(500).send(err)
            else
                return res.json({ success: true, value: req.body.value})
        })
});

app.listen(5000, () => {
    console.log("애플리케이션이 5000번 포트에서 시작되었습니다.")
});