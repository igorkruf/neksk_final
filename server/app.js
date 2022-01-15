const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
// app.use(cors(
//      {
//          origin: '*',
//          methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'OPTIONS'],
//          allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type'],
//      }

// ));
//app.use(mongoose);
app.options("*", cors());

//Схемы документов
const Users = require("./Mongoose/Users/users");

// //Настройка хранилища файлов

const bodyParser = require("body-parser");
const User = require("./Mongoose/Users/users");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//задаём token_key
const TOKEN_KEY = "neksk";
//Если в запросе есть заголовок: authorization
// app.use((req, res, next) => {
//   if (req.headers.authorization) {
//     jwt.verify(
//       req.headers.authorization.split(' ')[1],
//       TOKEN_KEY,
//       (err, payload) => {
//         if (err) next()
//         else if (payload) {
//           for (let user of users) {
//             if (user.id === payload.id) {
//               req.user = user
//               next()
//             }
//           }

//           if (!req.user) next()
//         }
//       }
//     )
//   }

//   next()
// })

////////////////Получить список пользователей

app.get("/users", (req, res) => {
  let tel = req.query["tel"];
  console.log(tel);
  //res.send(req.body.tel);
  // res.set("Access-Control-Allow-Origin", "*");
  //  res.set("Access-Control-Allow-Credentials: true", true);

  // подключение
  mongoose.connect("mongodb://neksk:Pervil-9@localhost:27017/neksk", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  Users.find({ telUser: tel }, function (err, users) {
    if (err) return console.error(err);
    //     console.log('hhhhhh')
    console.log(users);

    res.send(users);
    mongoose.disconnect(); // отключение от базы данных
  });
});

//
////////////////Получить список пользователей c id взятым из токена клиента

app.get("/check_token", (req, res) => {
  // let auth_header = req.headers.authorization;
  // console.log(auth_header);
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      TOKEN_KEY,
      (err, payload) => {
        if (err) {
          console.log("Ошибка при проверке токена");
          res.send("del_token");
        } else if (payload) {
          // подключение
          mongoose.connect("mongodb://neksk:Pervil-9@localhost:27017/neksk", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
          });

          Users.findById(payload.id, function (err, user) {
            if (err) return console.error(err);
            //     console.log('hhhhhh')
            //console.log(users);

            res.send(user);
            mongoose.disconnect(); // отключение от базы данных
          });
        }
      }
    );
  }

  //res.send(req.body.tel);
  // res.set("Access-Control-Allow-Origin", "*");
  //  res.set("Access-Control-Allow-Credentials: true", true);
  //   // подключение
  //   mongoose.connect("mongodb://neksk:Pervil-9@localhost:27017/neksk", {
  //     useUnifiedTopology: true,
  //     useNewUrlParser: true,
  //   });
  //   Users.find({ telUser: tel }, function (err, users) {
  //     if (err) return console.error(err);
  //     //     console.log('hhhhhh')
  //     console.log(users);
  //     res.send(users);
  //     mongoose.disconnect(); // отключение от базы данных
  //   });
});

//Добавление пользователя на сайт
app.post("/adduser", (req, res) => {
  console.log(req.body.tel);
  //res.send(req.body.tel);
  // res.set("Access-Control-Allow-Origin", 080);
  //  res.set("Access-Control-Allow-Credentials: true", true);

  //  // подключение
  mongoose.connect("mongodb://neksk:Pervil-9@localhost:27017/neksk", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const adduser = new Users({
    telUser: req.body.tel,
    nameUser: req.body.imya,
    familiyaUser: req.body.familiya,
  });
  adduser.save(function (err) {
    // Users.find({telUser:telUser}, function (error, user) {
    //     if (error) return console.error(error);
    //     //console.log(services);
    //     res.send(user);
    //     mongoose.disconnect();  // отключение от базы данных
    // });

    if (err) {
      return res
        .status(404)
        .json({ message: "Ошибка при добавлении пользователя в базу" });
    } else {
      console.log("Сохранен объект", adduser);
      return res.status(200).json({
        adduser,
        token: jwt.sign({ id: adduser._id }, TOKEN_KEY),
      });
      mongoose.disconnect();
    }
  });
});

/////////////////////////////////////////

//

app.listen(3000);
