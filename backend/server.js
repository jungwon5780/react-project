const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'reactui_user',
//   password: '1234',
//   database: 'reactui_db',
// });

// const db = mysql.createConnection({
//   host: 'nozomi.proxy.rlwy.net',
//   user: 'root',
//   password: 'ZiDACevkGUVbIwdUZtwVswdRLkmNALAn',
//   database: 'railway',
//   ssl: { rejectUnauthorized: false }, // ✅ Railway SSL 해결!
// });

const db = mysql.createConnection({
  host: 'nozomi.proxy.rlwy.net',  // Railway에서 제공한 host
  port: 10904,                       // 포트 확인 (기본 3306)
  user: 'root',                     // 유저명
  password: 'ZiDACevkGUVbIwdUZtwVswdRLkmNALAn',             // 비밀번호
  database: 'railway' ,         // DB 이름
  // ssl: { rejectUnauthorized: false }, // ✅ Railway SSL 해결!
});

qms_user

user: 'reactui_user',

bjw_new_table

인호 - cih
미정 - kmj
대엽 - jdy
상준 - ksj
정원 - bjw
채원 - one
진령 - kjr
동식 - kds
승진 - bsj
서영 - eee


db.connect();


app.post('/api/survey', (req, res) => {
  const {
    name, email, nickname, experience, languages, skill_level,
    goal, interest, study_style, question_style, self_keyword, request
  } = req.body;

  const sql = `
    INSERT INTO survey_responses
    (name, email, nickname, experience, languages, skill_level, goal, interest, study_style, question_style, self_keyword, request)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, email, nickname, experience, languages, skill_level, goal, interest, study_style, question_style, self_keyword, request],
    (err, result) => {
      if (err) return res.status(500).send("DB 저장 실패");
      res.send("응답 저장 완료!");
    });
});


// 회원가입
app.post('/api/register', async (req, res) => {
    console.log("회원가입");
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  console.log(hashed,":hashed");
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hashed], (err, result) => {
    if (err) return res.status(500).send("이미 가입된 이메일입니다.");
    res.send("회원가입 성공!");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
