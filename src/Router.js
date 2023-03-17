const config    = require('./dbConfig'),
      sql       = require('mssql')

      async function getRecord(){
        try{
           let pool =await sql.connect(config);
           let Record =pool.request().query('Select * from Organization');
           return (await Record).recordset;
        }
        catch(error){
        console.log(error);
        }
    }

// exports.viewclient = function(req, res) {
//     var Code = req.query.Code;
//       console.log(req.params);
  
//       connection.query('SELECT Code, Prenom, Nom, FAX, Telephone, Email, Adresse1, Adresse2  FROM clients  WHERE Code = ?',[req.params.Code],  function(error, results, fields) {
//           if (error) throw error;
//           res.send(JSON.stringify(results));
//   console.log(results);
//       });
  
//   }
module.exports={
    getRecord:getRecord
}