// // router.get('/viewclient/:Code', clients.viewclient);
const express = require("express"),
  bodyParser = require("body-parser"),
  sql = require("mssql"),
  cors = require("cors"),
  config = require("./dbConfig"),
  bcrypt = require("bcrypt"),
  saltRounds = 10,
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  // router = express.Router(),
  jwt = require("jsonwebtoken"),
  app = express();
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use("/api", router);
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // expires:86400,
      expires:60,
      httpOnly: true,
    },
  })
);
app.use(cookieParser());

// router.use((_request, _response, next) => {
//   console.log("middle");
//   next();
// });

app.use((_request, _response, next) => {
  console.log("middle");
  next();
});
// const verifyToken = (req, res, next) => {
//   const token =
//     req.body.token || req.query.token || req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, config.TOKEN_KEY);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };
function verifyJWT(req, res, next) {
  console.log("Verification.....................................Verification");
  const token = req.headers["x-access-token"];
  console.log("Token", token);
  if (token !== "null") {
    jwt.verify(token, "jwtSecret", (err, valid) => {
      if (err) {
        console.log("Error occured");
        res.status(401).json({
          auth: false,
        });
        // res
        //   .status(401)
        //   .send({ msg: "Not a valid token, authorization denied" });
      } else {
        console.log(valid)
        next();
      }
    });
  } else {
    console.log("no token");
    res.status(403).json({
      auth: false,
    });
    // res.status(403).send({ msg: "No token, authorization denied" });
  }
}
app.get("/value", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt(token) {
  //   return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  // }
  // const id = parseJwt(token).id;
  // //  console.log("id from Dash");
  // console.log(id);
  // id=4
  // console.log(req.body);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = 'Select * from Org'
    // querysql = "Select * from Users Where Uid=" + id;
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log("recordset.recorset");
      res.send(recordset.recordset);
    });
  });
});
app.get("/AdminList", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // id=4
  console.log(req.body);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "SELECT * FROM Users WHERE Role = 'Admin'";
    // querysql = ''SELECT * FROM Users WHERE Role = \'Admin\' Where Uid=' + id
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log("recordset.recorset");
      res.send(recordset.recordset);
    });
  });
});
app.get("/DistList", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // id=4
  console.log(req.body);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "SELECT * FROM Users WHERE Role = 'Distributor'";
    // querysql = 'SELECT * FROM Users WHERE Role = \'Distributor\' Where Uid=' + id
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log("recordset.recorset");
      res.send(recordset.recordset);
    });
  });
});
app.get("/CustList", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // id=4
  console.log(req.body);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "SELECT * FROM Users WHERE Role = 'Customer'";
    // querysql = 'SELECT * FROM Users WHERE Role = \'Customer\' Where Uid=' + id
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log("recordset.recorset");
      res.send(recordset.recordset);
    });
  });
});
app.get("/AccOrg", (req, res) => {
  var Uoid = [];
  //  var Uoid1 = [];
  //  var Arr=[];
  const token = req.headers["x-access-token"];
  console.log("token from Dash");
  console.log(token);
  function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  const id = parseJwt(token).id;
  console.log("id from Dash ACCOrg");
  console.log(id);
  // id=4
  console.log(req.body);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "Select * from Users Where Uid=" + id;
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log("recordset.recorset");
      // console.log(JSON.stringify(recordset.recordset))
      // send records as a response
      // res.send(recordset.recordset);
      // setValue1(recordset)
      setValue(recordset);
    });
  });

  function setValue(value) {
    Uoid = value;
    const Record = Uoid.recordset;
    var Oid = Record[0].Oid;
    console.log("Oid");
    console.log(Oid);

    sql.connect(config, function (err) {
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
      querysql =
        "WITH child AS ( SELECT Child FROM RevOrgRel WHERE Parent = " +
        Oid +
        "), tree AS ( SELECT x.Parent, x.Child FROM RevOrgRel x INNER JOIN child ON x.Child = child.Child UNION ALL SELECT y.Parent, y.Child FROM RevOrgRel y INNER JOIN tree t ON y.Parent = t.Child ) SELECT (Select Oname from Org where Oid=Parent) As Parent, (Select Oname from Org where Oid=Child) As Child FROM tree UNION Select NULL As Parent, (Select Oname from Org where Oid= " +
        Oid +
        ") As Child from RevOrgRel";

      // querysql = 'SELECT (Select Oname from Org where Oid=Parent) As Parent,(Select Oname from Org where Oid=Child) As Child From RevOrgRel'
      // querysql = 'SELECT (Select Oname from Org where Oid=Parent) As Parent,(Select Oname from Org where Oid=Child) As Child From RevOrgRel WHERE Role = \'Customer\' Where Uid=' + id
      console.log(querysql);
      // query to the database and get the records
      request.query(querysql, function (err, recordset) {
        if (err) console.log(err);
        console.log("FLAT recordset.recorset");
        console.log(recordset.recordset);
        res.send(recordset.recordset);
        // res.send(recordset.recordset.splice(0, 0, "{ Parent: null, Child: '"+Arr+"' }"));
      });
    });
  }
  // function setValue1(value1) {
  //   Uoid1 = value1;
  //   const Record1=Uoid1.recordset;
  //  var Oid1=Record1[0].Oid
  //  console.log("Oid")
  //  console.log(Oid1)
  //  sql.connect(config, function (err) {

  //     if (err) console.log(err);

  //     // create Request object
  //     var request = new sql.Request();
  //     querysql = 'Select Oname from Org Where Oid=' + Oid1
  //     console.log(querysql)
  //     // query to the database and get the records
  //     request.query(querysql,
  //       function (err, recordset) {

  //       if (err) console.log(err)
  //       console.log("recordset.recorset second")
  //       // console.log(JSON.stringify(recordset.recordset))
  //       // send records as a response
  //       Arr=recordset.recordset[0].Oname
  //       console.log(recordset.recordset[0].Oname)
  //       console.log(Arr)
  //   // .splice(0, 0, "{ Parent: null, Child: '"+Arr+"' }")
  //     // console.log(Value)
  //       // res.send(recordset.recordset);
  //       // setValue1(recordset);

  //     });
  //   });

  // }
  // console.log(req.params)
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // id=4
  // console.log(req.body)
});
app.delete("/DeleteChart/:Cid/:ChartName", (req, _res) => {
  const Cid = req.params.Cid,
    ChartName = req.params.ChartName;
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // id=4
  console.log("req.body");
  console.log(req.params);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "Delete from " + ChartName + " where Cid =" + Cid;
    // querysql = 'SELECT (Select Oname from Org where Oid=Parent) As Parent,(Select Oname from Org where Oid=Child) As Child From RevOrgRel WHERE Role = \'Customer\' Where Uid=' + id
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log("recordset.recorset" + recordset);
      // res.send(recordset.recordset);
    });
  });
});
app.delete("/dashboardDel/:Did", (req, _res) => {
  const Did = req.params.Did;
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // id=4
  console.log(req.params);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "Delete from Dashboard where Did =" + Did;
    // querysql = 'SELECT (Select Oname from Org where Oid=Parent) As Parent,(Select Oname from Org where Oid=Child) As Child From RevOrgRel WHERE Role = \'Customer\' Where Uid=' + id
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log("recordset.recorset" + recordset);
      // res.send(recordset.recordset);
    });
  });
});
app.delete("/orgDel/:Oid", (req, _res) => {
  const Oid = req.params.Oid;
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // id=4
  console.log("req.body");
  console.log(req.params);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "Delete from Org where Oid =" + Oid;
    // querysql = 'SELECT (Select Oname from Org where Oid=Parent) As Parent,(Select Oname from Org where Oid=Child) As Child From RevOrgRel WHERE Role = \'Customer\' Where Uid=' + id
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log("recordset.recorset" + recordset);
      // res.send(recordset.recordset);
    });
  });
});
app.delete("/userDel/:Oid", (req, _res) => {
  const Oid = req.params.Oid;
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // id=4
  console.log("req.body");
  console.log(req.params);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "Delete from Users where Oid =" + Oid;
    // querysql = 'SELECT (Select Oname from Org where Oid=Parent) As Parent,(Select Oname from Org where Oid=Child) As Child From RevOrgRel WHERE Role = \'Customer\' Where Uid=' + id
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log("recordset.recorset" + recordset);
      // res.send(recordset.recordset);
    });
  });
});
app.get("/Dashorg", (req, res) => {
  var OId = [];
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash");
  // console.log(token);
  // function parseJwt(token) {
  //   return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  // }
  // const id = parseJwt(token).id;
  // console.log("Parsejwt from Dash ",parseJwt(token));
  // console.log(id);

  // Id=4
   id=108
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
     "WITH child AS ( SELECT Child FROM RevOrgRel WHERE Parent =108), tree AS ( SELECT x.Parent, x.Child FROM RevOrgRel x INNER JOIN child ON x.Child = child.Child UNION ALL SELECT y.Parent, y.Child FROM RevOrgRel y INNER JOIN tree t ON y.Parent = t.Child )SELECT (Select child) As Child FROM tree",
      // "Select Oid from Users where Uid=" + id,
      function (err, recordset) {
        if (err) console.log(err);
        console.log("recordset from revorg child");
        console.log(recordset);
        setValue(recordset);
      }
    );
  });
  function setValue(value) {
    console.log("values",value.recordset)
    val=JSON.stringify(value.recordset)
    var num = val.replace(/\D/g,'');
    var notarray = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     const split_string = notarray.split(" ");
// console.log(typeof(split_string))
    // var array = JSON.parse("[" + notarray + "]");
    // console.log("helloi",typeof(array))
    // const entries = Object.values(notarray);
    // console.log("helloi",entries)


    sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      querysql = "Select * from Dashboard INNER JOIN Org ON Dashboard.Oid=Org.Oid WHERE Dashboard.Oid IN ("+[notarray]+")"
     
      // querysql = "Select * from Dashboard"
      console.log(querysql);
      request.query(querysql, function (err, recordset) {
        if (err) console.log(err);
        // res.send(JSON.stringify(recordset));
        console.log("response of whole query from Organization");
        console.log(JSON.stringify(recordset.recordset));
        res.send(recordset.recordset);
      });
    });
  }
  // }
});
app.get("/prdall", (req, res) => {
  var OId = [];
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash");
  // console.log(token);
  // function parseJwt(token) {
  //   return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  // }
  // const id = parseJwt(token).id;
  // console.log("Parsejwt from Dash ",parseJwt(token));
  // console.log(id);

  // Id=4
   id=108
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
     "WITH child AS ( SELECT Child FROM RevOrgRel WHERE Parent =108), tree AS ( SELECT x.Parent, x.Child FROM RevOrgRel x INNER JOIN child ON x.Child = child.Child UNION ALL SELECT y.Parent, y.Child FROM RevOrgRel y INNER JOIN tree t ON y.Parent = t.Child )SELECT (Select child) As Child FROM tree",
      // "Select Oid from Users where Uid=" + id,
      function (err, recordset) {
        if (err) console.log(err);
        console.log("recordset from revorg child");
        console.log(recordset);
        setValue(recordset);
      }
    );
  });
  function setValue(value) {
    console.log("values",value.recordset)
    val=JSON.stringify(value.recordset)
    var num = val.replace(/\D/g,'');
    var notarray = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     const split_string = notarray.split(" ");
// console.log(typeof(split_string)) 
    // var array = JSON.parse("[" + notarray + "]");
    // console.log("helloi",typeof(array))
    // const entries = Object.values(notarray);
    // console.log("helloi",entries)
    sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      querysql = "Select Oname from Dashboard INNER JOIN Org ON Dashboard.Oid=Org.Oid WHERE Dashboard.Oid IN ("+[notarray]+") GROUP BY Oname"
     
      // querysql = "Select * from Dashboard"
      console.log(querysql);
      request.query(querysql, function (err, recordset) {
        if (err) console.log(err);
        // res.send(JSON.stringify(recordset));
        console.log("response of whole query from Organization");
        console.log(JSON.stringify(recordset.recordset));
        res.send(recordset.recordset);
      });
    });
  }
  // }
});

app.get("/Dash", (req, res) => {
  var Id = [];
  const token = req.headers["x-access-token"];
  console.log("token from Dash");
  console.log(token);
  function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  const id = parseJwt(token).id;
  console.log("Parsejwt from Dash ",parseJwt(token));
  console.log(id)
  // Id=4
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
      "Select * from Users where Uid=" + id,
      function (err, recordset) {
        if (err) console.log(err);
        console.log("recordset");
        console.log(recordset);
        setValue(recordset);
      }
    );
  });
  function setValue(value) {
    Id = value;
    const Record = Id.recordset;
    var Oid = Record[0].Oid; 
    sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      querysql = "Select * from Dashboard where Oid=" + Oid;
      console.log(querysql);
      request.query(querysql, function (err, recordset) {
        if (err) console.log(err);
        // res.send(JSON.stringify(recordset));
        console.log("response of whole query");
        console.log(JSON.stringify(recordset.recordset));
        res.send(recordset.recordset);
      });
    });
  }
});

app.post("/DashName", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("parsed jwt",parseJwt(token))

  //  console.log("id from Dash");
  //  console.log(id);
  console.log("Did from dashboard",req.body);
  // console.log("DashName");
  const Did = req.body.Did;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "Select * from Dashboard Where Did=" + Did;
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log(recordset);
      // send records as a response
      res.send(recordset);
    });
  });
});
app.get("/UsersRole", (req, res) => {
  const token = req.headers["x-access-token"];
  console.log("token from Dash");
  console.log(token);
  function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  const id = parseJwt(token).id;
  console.log("id from Dash");
  console.log(id);
  // id=4
  console.log(req.body);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "Select * from Users Where Uid=" + id;
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log("recordset.recorset");
      console.log(JSON.stringify(recordset.recordset));
      // send records as a response
      res.send(recordset.recordset);
    });
  });
});
app.post("/orgAdd", (req, res) => {
  console.log(req.body);
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // console.log("In APP.POST")
  const Oid = req.body.Oid;
  const Oname = req.body.Oname;
  const Address = req.body.Address;
  // const Child = req.body.Child;
  const Contact = req.body.Contact;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      "INSERT INTO Org (Oid, Oname, Address,Contact) VALUES (" +
        Oid +
        ",'" +
        Oname +
        "','" +
        Address +
        "','" +
        Contact +
        "'" +
        ")",
      function (err, recordset) {
        if (err) console.log(err);

        // send records as a response
        res.send(recordset);
      }
    );
  });
});
app.post("/ChartLine", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log(":::CHART FORM");
  console.log(req.body);
  const Did = req.body.Did;

  const LCname = req.body.LCname;

  const Dn = req.body.Dn;
  const Keys = req.body.Keys;
  const StartTime = req.body.StartTime;
  const EndTime = req.body.EndTime;
  const Yaxis = req.body.Yaxis;
  const Label = req.body.Label;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    // request.query('INSERT INTO Charts(Cname,Labels,Yaxis,Label,Type) VALUES  (\'' + Cname + '\',\'' + Labels + '\',\'' + Yaxis + '\',\'' + Label + '\',\'' + Type + '\'' + ')', function (err, recordset) {
    request.query(
      "INSERT INTO LChart(Did,LCname,Dn,Keys,StartTime,EndTime,Yaxis,Label) VALUES  ('" +
        Did +
        "','" +
        LCname +
        "','" +
        Dn +
        "','" +
        Keys +
        "','" +
        StartTime +
        "','" +
        EndTime +
        "','" +
        Yaxis +
        "','" +
        Label +
        "'" +
        ")",
      function (err, recordset) {
        if (err) console.log(err);
        console.log(recordset);
        // send records as a response
        res.send(recordset);
      }
    );
  });
});
app.post("/ChartBar", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log(":::CHART FORM");
  console.log(req.body);
  const Did = req.body.Did;

  const BCname = req.body.BCname;

  const Dn = req.body.Dn;
  const Keys = req.body.Keys;
  const StartTime = req.body.StartTime;
  const EndTime = req.body.EndTime;
  const Yaxis = req.body.Yaxis;
  const Label = req.body.Label;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    // request.query('INSERT INTO Charts(Cname,Labels,Yaxis,Label,Type) VALUES  (\'' + Cname + '\',\'' + Labels + '\',\'' + Yaxis + '\',\'' + Label + '\',\'' + Type + '\'' + ')', function (err, recordset) {
    request.query(
      "INSERT INTO BChart(Did,BCname,Dn,Keys,StartTime,EndTime,Yaxis,Label) VALUES  ('" +
        Did +
        "','" +
        BCname +
        "','" +
        Dn +
        "','" +
        Keys +
        "','" +
        StartTime +
        "','" +
        EndTime +
        "','" +
        Yaxis +
        "','" +
        Label +
        "'" +
        ")",
      function (err, recordset) {
        if (err) console.log(err);
        console.log(recordset);
        // send records as a response
        res.send(recordset);
      }
    );
  });
});
app.post("/ChartPie", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log(":::CHART FORM");
  console.log(req.body);
  const Did = req.body.Did;

  const LCname = req.body.LCname;

  const Dn = req.body.Dn;
  const Keys = req.body.Keys;
  const StartTime = req.body.StartTime;
  const EndTime = req.body.EndTime;
  const Yaxis = req.body.Yaxis;
  const Label = req.body.Label;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    // request.query('INSERT INTO Charts(Cname,Labels,Yaxis,Label,Type) VALUES  (\'' + Cname + '\',\'' + Labels + '\',\'' + Yaxis + '\',\'' + Label + '\',\'' + Type + '\'' + ')', function (err, recordset) {
    request.query(
      "INSERT INTO PChart(Did,LCname,Dn,Keys,StartTime,EndTime,Yaxis,Label) VALUES  ('" +
        Did +
        "','" +
        LCname +
        "','" +
        Dn +
        "','" +
        Keys +
        "','" +
        StartTime +
        "','" +
        EndTime +
        "','" +
        Yaxis +
        "','" +
        Label +
        "'" +
        ")",
      function (err, recordset) {
        if (err) console.log(err);
        console.log(recordset);
        // send records as a response
        res.send(recordset);
      }
    );
  });
});
app.post("/ChartArea", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log(":::CHART FORM");
  console.log(req.body);
  const Did = req.body.Did;

  const LCname = req.body.LCname;

  const Dn = req.body.Dn;
  const Keys = req.body.Keys;
  const StartTime = req.body.StartTime;
  const EndTime = req.body.EndTime;
  const Yaxis = req.body.Yaxis;
  const Label = req.body.Label;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    // request.query('INSERT INTO Charts(Cname,Labels,Yaxis,Label,Type) VALUES  (\'' + Cname + '\',\'' + Labels + '\',\'' + Yaxis + '\',\'' + Label + '\',\'' + Type + '\'' + ')', function (err, recordset) {
    request.query(
      "INSERT INTO AChart(Did,LCname,Dn,Keys,StartTime,EndTime,Yaxis,Label) VALUES  ('" +
        Did +
        "','" +
        LCname +
        "','" +
        Dn +
        "','" +
        Keys +
        "','" +
        StartTime +
        "','" +
        EndTime +
        "','" +
        Yaxis +
        "','" +
        Label +
        "'" +
        ")",
      function (err, recordset) {
        if (err) console.log(err);
        console.log(recordset);
        // send records as a response
        res.send(recordset);
      }
    );
  });
});
// var RECORD;

app.post("/Globaltime", (req, _res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  var someVar = [];
  const starttime = req.body.StartTime;
  const endtime = req.body.EndTime;
  const Did = req.body.Did;
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
      "Select LChart, BChart, PChart, DChart, AChart, BubbChart, PolAChart, MixChart, RadChart From Dashboard WHERE Did= " +
        Did,
      function (err, recordset) {
        if (err) console.log(err);
        console.log("recordset");
        console.log(recordset);
        setValue(recordset);
      }
    );
  });
  function setValue(value) {
    someVar = value;
    const Record = someVar.recordset;
    const Result = Record[0];
    Object.keys(Result).forEach((key) => {
      if (Result[key] === null) {
        delete Result[key];
      }
    });
    for (const key in Result) {
      console.log("::::::::::;");
      const KEY = `${key}`;
      //  const chartname=`${key}`;
      //  const cid=`${Result[key]}`;
      const VALUE = `${Result[key]}`;
      const vallist = VALUE.split(",");
      console.log("vallist");
      console.log(vallist);
      console.log(typeof vallist);
      for (const val in vallist) {
        console.log("\nkey");
        // console.log(key)
        console.log(KEY);
        console.log("\nval");
        console.log(vallist[val]);
        // var KEY = chartname.split(',');
        //  var VALUE = cid.split(',');
        //  console.log(KEY)
        //  console.log(VALUE)
        //  for (let i = 0; i < KEY.length; i++) {
        //   console.log("KEY")
        //   // console.log(KEY[i])
        //   for (let j = 0; j < VALUE.length; j++) {
        //   console.log("VALUE")
        //  console.log(VALUE[j])
        sql.connect(config, function (err) {
          if (err) console.log(err);
          var request = new sql.Request();
          querysql =
            "UPDATE " +
            KEY +
            " SET StartTime ='" +
            starttime +
            "',EndTime ='" +
            endtime +
            "' WHERE Cid ='" +
            vallist[val] +
            "'";
          console.log(querysql);
          request.query(querysql, function (err, recordset) {
            if (err) console.log(err);
            // res.send(JSON.stringify(recordset));
            console.log("response of whole query");
            console.log(JSON.stringify(recordset));
          });
        });
      }
    }
  }
});
app.post("/IndLinetime", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // var someVar = [];
  const starttime = req.body.StartTime;
  const endtime = req.body.EndTime;
  const Cid = req.body.Cid;
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    querysql =
      "UPDATE LChart SET StartTime ='" +
      starttime +
      "',EndTime ='" +
      endtime +
      "' WHERE Cid ='" +
      Cid +
      "'";
    console.log(querysql);
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      res.send(JSON.stringify(recordset));
    });
  });
});
app.post(
  "/IndBartime",
  (req, res) => {
    // const token = req.headers["x-access-token"];
    // console.log("token from Dash")
    // console.log(token)
    // function parseJwt (token) {
    //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    // }
    //  const id=(parseJwt(token).id)
    //  console.log("id from Dash");
    //  console.log(id);
    // var someVar = [];
    const starttime = req.body.StartTime;
    const endtime = req.body.EndTime;
    const Cid = req.body.Cid;
    //   sql.connect(config, function (err) {
    //     if (err) console.log(err);
    //     var request = new sql.Request();
    //     request.query('Select LChart, BChart, PChart, DChart, AChart, BubbChart, PolAChart, MixChart, RadChart From Dashboard WHERE Did= '+ Did  ,
    //  function (err, recordset) {
    //      if (err) console.log(err)
    //      console.log("recordset");
    //      console.log(recordset);
    //      setValue(recordset);
    //     });
    //   });
    // function setValue(value) {
    //   someVar = value;
    //   const Record=someVar.recordset;
    //    Result=Record[0]
    //    Object.keys(Result).forEach(key => {
    //    if (Result[key] === null) {
    //     delete Result[key];
    //    }

    //   });
    //   console.log("Result from one to another");
    //   console.log(Result);

    // for ()

    // for (const key in Result) {
    //   console.log("::::::::::;")
    //   const KEY=`${key}`;
    // //  const chartname=`${key}`;
    // //  const cid=`${Result[key]}`;
    //   const VALUE=`${Result[key]}`;
    //   const vallist = VALUE.split(',');
    //   console.log("vallist")
    //   console.log(vallist)
    //   console.log(typeof(vallist))
    //   for (const val in vallist){
    //     console.log('\nkey')
    //     // console.log(key)
    //     console.log(KEY)
    //     console.log('\nval')
    //     console.log(vallist[val])
    // var KEY = chartname.split(',');
    //  var VALUE = cid.split(',');
    //  console.log(KEY)
    //  console.log(VALUE)
    //  for (let i = 0; i < KEY.length; i++) {
    //   console.log("KEY")
    //   // console.log(KEY[i])
    //   for (let j = 0; j < VALUE.length; j++) {
    //   console.log("VALUE")
    //  console.log(VALUE[j])
    sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      querysql =
        "UPDATE BChart SET StartTime ='" +
        starttime +
        "',EndTime ='" +
        endtime +
        "' WHERE Cid ='" +
        Cid +
        "'";
      console.log(querysql);
      request.query(querysql, function (err, recordset) {
        if (err) console.log(err);
        res.send(JSON.stringify(recordset));
        // console.log("response of whole query");
        // console.log(JSON.stringify(recordset));
      });
    });
    // }
    // }
  }
  // }
);
app.post("/IndPietime", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // var someVar = [];
  const starttime = req.body.StartTime;
  const endtime = req.body.EndTime;
  const Cid = req.body.Cid;
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    querysql =
      "UPDATE PChart SET StartTime ='" +
      starttime +
      "',EndTime ='" +
      endtime +
      "' WHERE Cid ='" +
      Cid +
      "'";
    console.log(querysql);
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      res.send(JSON.stringify(recordset));
    });
  });
});
app.post("/IndAreatime", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // var someVar = [];
  const starttime = req.body.StartTime;
  const endtime = req.body.EndTime;
  const Cid = req.body.Cid;
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    querysql =
      "UPDATE AChart SET StartTime ='" +
      starttime +
      "',EndTime ='" +
      endtime +
      "' WHERE Cid ='" +
      Cid +
      "'";
    console.log(querysql);
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      res.send(JSON.stringify(recordset));
    });
  });
});
// }
// })
app.post("/LChart", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);

  console.log(req.body);
  console.log("LCHART");
  const Did = req.body.Did;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "Select * from LChart Where Did=" + Did;
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log(recordset);
      // send records as a response
      res.send(recordset);
    });
  });
});
app.post("/BChart", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log(req.body);
  console.log("LCHART");
  const Did = req.body.Did;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "Select * from BChart Where Did=" + Did;
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log(recordset);
      // send records as a response
      res.send(recordset);
    });
  });
});
app.post("/PChart", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log(req.body);
  console.log("LCHART");
  const Did = req.body.Did;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "Select * from PChart Where Did=" + Did;
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log(recordset);
      // send records as a response
      res.send(recordset);
    });
  });
});
app.post("/AChart", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log(req.body);
  console.log("LCHART");
  const Did = req.body.Did;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    querysql = "Select * from AChart Where Did=" + Did;
    console.log(querysql);
    // query to the database and get the records
    request.query(querysql, function (err, recordset) {
      if (err) console.log(err);
      console.log(recordset);
      // send records as a response
      res.send(recordset);
    });
  });
});
app.post("/userAdd", (req, res) => {
  const token = req.headers["x-access-token"];
  console.log("token from Dash");
  console.log(token);
  function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  const id = parseJwt(token).id;
  console.log("id from Dash");
  console.log(id);
  console.log("In APP.POST");
  const Uid = req.body.Uid;
  const Fname = req.body.Fname;
  const Lname = req.body.Lname;
  const Email = req.body.Email;
  const Oid = req.body.Oid;
  console.log(Fname);
  console.log(Lname);
  console.log(Email);
  console.log(Oid);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      "INSERT INTO Users (Uid,First_name,Last_name,Email,Oid) VALUES (" +
        Uid +
        ",'" +
        Fname +
        "','" +
        Lname +
        "','" +
        Email +
        "','" +
        Oid +
        "'" +
        ")",
      function (err, recordset) {
        // request.query('INSERT INTO Org (Oid, Oname, Address,Contact) VALUES ('+Oid+',\''+Oname+'\',\''+Address+'\',\''+Contact+'\''+')', function (err, recordset) {

        if (err) console.log(err);

        // send records as a response
        res.send(recordset);
      }
    );
  });
});
app.put("/dashboardUpdate", (req, _res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log("DNAME Update");
  console.log(req.body);
  const Did = req.body.Did;
  const Dname = req.body.Dname;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      "UPDATE Dashboard SET Dname ='" + Dname + "' WHERE Did = " + Did,

      function (err, _recordset) {
        if (err) console.log(err);
        // send records as a response
        // res.send(recordset);
      }
    );
  });
});
app.put("/update", (req, _res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // console.log("In APP.Update")
  console.log(req.body);
  const Oid = req.body.Oid;
  const Oname = req.body.Oname;
  const Address = req.body.Address;
  const Child = req.body.Child;
  const Contact = req.body.Contact;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      "UPDATE Org SET Oname ='" +
        Oname +
        "',Address ='" +
        Address +
        "',Contact ='" +
        Contact +
        "' WHERE Oid ='" +
        Oid +
        "'",

      function (err, _recordset) {
        if (err) console.log(err);
        // send records as a response
        // res.send(recordset);
      }
    );
  });
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    if (Child) {
      request.query(
        "INSERT INTO RevOrgRel(Parent, Child) VALUES (" +
          Oid +
          ",'" +
          Child +
          "'" +
          ")",
        function (err, _recordset) {
          if (err) console.log(err);
          // console.log(error)
          // send records as a response
          // res.send(recordset);
        }
      );
    }
  });
});

app.put("/updateUser", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log("In APP.UpdateUser");
  console.log(req.body);
  const Uid = req.body.Uid;
  const First_name = req.body.First_name;
  const Last_name = req.body.Last_name;
  const Email = req.body.Email;
  const Oid = req.body.Oid;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    console.log("update user query working");
    request.query(
      "UPDATE Users SET First_name ='" +
        First_name +
        "',Last_name ='" +
        Last_name +
        "',Email ='" +
        Email +
        "',Oid =" +
        Oid +
        " WHERE Uid =" +
        Uid,

      function (err, recordset) {
        if (err) console.log(err);
        // send records as a response
        res.send(recordset);
        console.log(recordset);
      }
    );
  });
});
app.put("/updateAdmin", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log("In APP.UpdateUser");
  console.log(req.body);
  const Uid = req.body.Uid;
  const First_name = req.body.First_name;
  const Last_name = req.body.Last_name;
  const Email = req.body.Email;
  const Oid = req.body.Oid;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    console.log("update user query working");
    request.query(
      "UPDATE Users SET First_name ='" +
        First_name +
        "',Last_name ='" +
        Last_name +
        "',Email ='" +
        Email +
        "',Oid =" +
        Oid +
        " WHERE Uid =" +
        Uid,

      function (err, recordset) {
        if (err) console.log(err);
        // send records as a response
        res.send(recordset);
        console.log(recordset);
      }
    );
  });
});
app.put("/updateDist", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log("In APP.UpdateUser");
  console.log(req.body);
  const Uid = req.body.Uid;
  const First_name = req.body.First_name;
  const Last_name = req.body.Last_name;
  const Email = req.body.Email;
  const Oid = req.body.Oid;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    console.log("update user query working");
    request.query(
      "UPDATE Users SET First_name ='" +
        First_name +
        "',Last_name ='" +
        Last_name +
        "',Email ='" +
        Email +
        "',Oid =" +
        Oid +
        " WHERE Uid =" +
        Uid,

      function (err, recordset) {
        if (err) console.log(err);
        // send records as a response
        res.send(recordset);
        console.log(recordset);
      }
    );
  });
});
app.put("/updateCust", (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  console.log("In APP.UpdateUser");
  console.log(req.body);
  const Uid = req.body.Uid;
  const First_name = req.body.First_name;
  const Last_name = req.body.Last_name;
  const Email = req.body.Email;
  const Oid = req.body.Oid;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    console.log("update user query working");
    request.query(
      "UPDATE Users SET First_name ='" +
        First_name +
        "',Last_name ='" +
        Last_name +
        "',Email ='" +
        Email +
        "',Oid =" +
        Oid +
        " WHERE Uid =" +
        Uid,

      function (err, recordset) {
        if (err) console.log(err);
        // send records as a response
        res.send(recordset);
        console.log(recordset);
      }
    );
  });
});

app.post("/DashAdd", verifyJWT, (req, res) => {
  // const token = req.headers["x-access-token"];
  // console.log("token from Dash")
  // console.log(token)
  // function parseJwt (token) {
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  // }
  //  const id=(parseJwt(token).id)
  //  console.log("id from Dash");
  //  console.log(id);
  // console.log("In APP.POST")
  console.log(req.body);
  const DashName = req.body.Dname;
  const Did = req.body.Did;
  const Uid = req.body.Uid;
  const Oid = req.body.Oid;
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      "INSERT INTO Dashboard (Did, Dname,Uid,Oid) VALUES (" +
        Did +
        ",'" +
        DashName +
        "','" +
        Uid +
        "','" +
        Oid +
        "'" +
        ")",
      function (err, recordset) {
        if (err) console.log(err);

        // send records as a response
        res.send(recordset);
      }
    );
  });
});
app.get("/UsersList", verifyJWT, (req, res) => {
  const token = req.headers["x-access-token"];
  console.log("token from Dash");
  console.log(token);
  function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  const id = parseJwt(token).id;
  console.log("id from Dash");
  console.log(id);
  // console.log("In APP.Get")
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("Select * from Users", function (err, recordsets) {
      // console.log("Users:::::::::::"+recordsets)
      console.log(recordsets.recordset);
      // response.json(result);

      if (err) console.log(err);

      // send records as a response
      res.send(recordsets.recordset);
    });
  });
});
app.get("/Chart", (req, res) => {
  const token = req.headers["x-access-token"];
  console.log("token from Dash");
  console.log(token);
  function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  const id = parseJwt(token).id;
  console.log("id from Dash");
  console.log(id);
  // console.log("In APP.Get")
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("Select * from Charts", function (err, recordsets) {
      // console.log("Users:::::::::::"+recordsets)
      console.log(recordsets.recordset);
      // response.json(result);

      if (err) console.log(err);

      // send records as a response
      res.send(recordsets.recordset);
    });
  });
});

{
  /*-------------------------------------------------- Jwt-------------------------------------------------------------  */
}
app.get("/getUserinfo/", (req, res) => {
  // console.log("In APP.Get")
  const token = req.headers["x-access-token"];
  //  var decoded = jwt_decode(token);
  function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  //  console.log("decoded")
  var id = parseJwt(token).id;
  console.log(id);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      "Select * from Users where Uid=" + id,
      function (err, recordsets) {
        // console.log("Users:::::::::::"+recordsets)
        console.log(recordsets.recordset);
        // response.json(result);

        if (err) console.log(err);

        // send records as a response
        res.send(recordsets.recordset);
      }
    );
  });
});

//   else {
//     jwt.verify(token, "jwtSecret", (err, decoded) => {
//       if (err) {
//         // res.send("U failed to authenticate");
//         res.send(false);

//         // res.json({
//         //   auth: false,
//         //   message: "U failed to authenticate"
//         // });
//       } else {
//         req.userId = decoded.id;
//         next();
//       }
//     });
//   }
// // }
// };
app.get("/isUserAuth", verifyJWT, (req, res) => {
  var Uoid = [];
  const token = req.headers["x-access-token"];
  console.log("Token", token);
  function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  var id = parseJwt(token).id;
  console.log(id);
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      "Select Role from Users where Uid=" + id,
      function (err, recordsets) {
        // console.log("Users:::::::::::"+recordsets)
        // console.log(recordsets.recordset);
        // response.json(result);

        if (err) console.log(err);
         setValue(recordsets)
        // send records as a response
        // res.send(recordsets.recordset);
        
      }
    );
  });
  function setValue(value) {
    Uoid = value;
    console.log(Uoid)
    const Record = Uoid.recordset;
    var Role = Record[0].Role;
    try {
      res.json({
        auth: true,
        Roles:Role
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
  
  console.log("***********ISUSERAUTH*********");
 
  // try {
  //   const user = await User.findById(req.user.id).select('-password');
  //   if (!user) throw Error('User does not exist');
  //   res.json(user);
  // } catch (e) {
  //   res.status(400).json({ msg: e.message });
  // }
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    sql.connect(config, function (err) {
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query(
        "INSERT INTO Users (Uid,First_name,Last_name,Email,Oid,Password) VALUES (51,'Test1','New1','" +
          username +
          "',109,'" +
          hash +
          "')",
        function (err, recordsets) {
          // console.log("Users:::::::::::"+recordsets)
          console.log(recordsets.recordset);
          // response.json(result);

          if (err) {
            console.log(err);
          }

          // send records as a response
          res.send(recordsets.recordset);
        }
      );
    });
  });
});

app.post("/loginUser", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("body");
  console.log(req.body);
  // Simple validation
  // if (!username || !password) {
  //   return
  //   res.status(400).json({ msg: 'Please enter all fields' });
  // }
  // try{
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      "SELECT * FROM Users WHERE Email ='" + username + "'",
      function (err, recordsets) {
        if (err) {
          res.json({
            err: err,
          });
        } else if (recordsets.recordset.length > 0) {
          bcrypt.compare(
            password,
            recordsets.recordset[0].Password,
            (error, response) => {
              if (response) {
                const id = recordsets.recordset[0].Uid;
                const token = jwt.sign({ id }, "jwtSecret", {
                  expiresIn: 3000000000,
                });
                req.session.user = recordsets.recordset;
                console.log("recordsets.recordset from login");
                console.log(recordsets.recordset);
                if ((req.session.user = recordsets.recordset)) {
                  res.json({
                    auth: true,
                    token: token,
                    // result: recordsets.recordset
                    // result: recordsets.recordset
                  });
                } else {
                  res.json({ error });
                }
              } else {
                res.json({
                  auth: false,
                  message: "Wrong username/password combination!",
                });
              }
            }
          );
        } else {
          // res.json({
          //   auth: false,
          //   message: "User Doesn't Exist!",
          return res.status(400).json({ msg: "Please enter all fields" });
          // return res.status(400).json({
          // auth: false,
          // msg: "User Doesn't Exist!"
          // });
        }
      }
    );
  });

  // }catch(e){
  //   res.status(400).json({ msg: e.message });
  // }
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log("running on port: " + port);
