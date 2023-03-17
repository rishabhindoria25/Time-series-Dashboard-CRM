// const express = require('express');
// const config    = require('./dbConfig'),
//       sql       = require('mssql');

    
//       const app= express();

//       app.use(express.json())

 
// // async function getRecord(){
// //         try{
// //            let pool =await sql.connect(config);
// //         //    let Record =pool.request().query('Select * from Org');
// //            let Record =pool.request().query('Select * from Org');
        
// //            return (await Record).recordset;
// //         //    Res.send(JSON.stringify(results));
    
// //         } 
// //         catch(error){
// //         console.log(error);
// //         }
// //     }
  


// // async function delOrg(Oid){
// //         try{
// //            let pool =await sql.connect(config);
// //            let Record =pool.request().query('Delete from Org where Oid ='+Oid);
// //            return (await Record).recordset;
// //         //    Res.send(JSON.stringify(results));

    
// //         } 
// //         catch(error){
// //         console.log(error);
// //         }
// //     }
// //     async function delUser(Oid){
// //         try{
// //            let pool =await sql.connect(config);
// //            let Record =pool.request().query('Delete from Users where Oid ='+Oid);
// //            return (await Record).recordset;
// //         //    Res.send(JSON.stringify(results));

    
// //         } 
// //         catch(error){
// //         console.log(error);
// //         }
// //     }   
//     async function getUserinfo(id){
//       try{
//          let pool =await sql.connect(config);
//       //    let Record =pool.request().query('Select * from Org');
//          let Record =pool.request().query('Select * from Users where Uid='+id);
      
//          return (await Record).recordset;
//       //    Res.send(JSON.stringify(results));
//       } 
//       catch(error){
//       console.log(error);
//       }
//    }
// async function getDash(Id){
//       try{
//          let pool =await sql.connect(config);
//       //    let Record =pool.request().query('Select * from Org');
//          let Record =pool.request().query('Select * from Dashboard where Oid='+Id);
//          console.log((await Record).recordset)
//          return (await Record).recordset;
//          // Res.send(JSON.stringify(results));
       
//       } 
//       catch(error){
//       console.log(error);
//       }
//   }
//   async function deleteChart(Cid,ChartName){
//    console.log("deleteChart")
//    console.log(Cid)
//    console.log(ChartName)

//    // ChartName:request.params.ChartName,
//    // Cid:request.params.Cid
//    console.log("Chartr")
//    try{
//       let pool =await sql.connect(config);
//       let Record =pool.request().query('Delete from '+ChartName+'  where Cid ='+Cid);
//       console.log("Deleted")

//       return (await Record).recordset;
//    //    Res.send(JSON.stringify(results));

//    } 
//    catch(error){
//    console.log(error);
//    }
// }   
// // async function getLChart(){
// //    try{
// //       let pool =await sql.connect(config);
// //    //    let Record =pool.request().query('Select * from Org');
// //       let Record =pool.request().query('Select * from LChart');
   
// //       return (await Record).recordset;
// //    //    Res.send(JSON.stringify(results));

// //    } 
// //    catch(error){
// //    console.log(error);
// //    }
// // }
// // async function getBChart(){
// //    try{
// //       let pool =await sql.connect(config);
// //    //    let Record =pool.request().query('Select * from Org');
// //       let Record =pool.request().query('Select * from BChart');
   
// //       return (await Record).recordset;
// //    //    Res.send(JSON.stringify(results));

// //    } 
// //    catch(error){
// //    console.log(error);
// //    }
// // }
// // async function getPChart(){
// //    try{
// //       let pool =await sql.connect(config);
// //    //    let Record =pool.request().query('Select * from Org');
// //       let Record =pool.request().query('Select * from PChart');
   
// //       return (await Record).recordset;
// //    //    Res.send(JSON.stringify(results));

// //    } 
// //    catch(error){
// //    console.log(error);
// //    }
// // }
// // async function addOrg(){
// //     try{
// //         let pool =await sql.connect(config);
// //          let Record =pool.request().query('INSERT INTO Org (Oid, Oname, Ochild) VALUES (104, \'STU\', \'WTF\');');
// //         // let Record =pool.request().query('INSERT INTO Org (Oid, Oname, Ochild) VALUES (104, \'STU\', \'WTF\');');
// //         return (await Record).recordset;
// //         //    Res.send(JSON.stringify(results));
    
// //     } 
// //     catch(error){
// //         console.log(error);
// //     }
// // }
// async function addOrg(){
       
//     // const Oid=request.body.Oid;
//     // const Oname=request.body.Oname;
//     // const Address=request.body.Address;
//     // const Contact=request.body.Contact;
//     try{
        
//         let pool =await sql.connect(config);
//          let Record =pool.request().query('INSERT INTO Org (Oid, Oname, Address, Contact) VALUES (?,?,?,?)',[Oid,Oname,Address,Contact]);
//         // let Record =pool.request().query('INSERT INTO Org (Oid, Oname, Ochild) VALUES (104, \'STU\', \'WTF\');');
//         return (await Record).recordset;
//         //    Res.send(JSON.stringify(results));
    
//     } 
//     catch(error){
//         console.log(error);
//     }
// }
// // async function ListAll(){
// //     try{
// //        let pool =await sql.connect(config);
// //     //    let Record =pool.request().query('WITH Ancestor AS (SELECT Ochild AS p FROM Org WHERE Oname = \' Tata \' UNION ALL SELECT Ochild FROM Ancestor,Org WHERE Ancestor.p = Org.Oname ) SELECT * FROM Ancestor');
// //     let Record =pool.request().query('WITH Ancestor AS (SELECT Cid As p FROM Org inner join OrgRel on (Org.Oid = OrgRel.Oid) where Oname = \'Tataelexi \' UNION ALL SELECT Cid FROM Ancestor,Org inner join OrgRel on (Org.Oid = OrgRel.Oid) WHERE Ancestor.p = Org.Oid) SELECT Oname FROM Ancestor inner join Org on (Ancestor.p = Org.Oid)');
  
    
// //        return (await Record).recordset;
// //     //    Res.send(JSON.stringify(results));
        

// //     } 
// //     catch(error){
// //     console.log(error);
// //     }
// // }

// // async function AccessableOrg(){
// //     try{
// //        let pool =await sql.connect(config);
// //     //    let Record =pool.request().query('WITH tree AS (SELECT Parent,Child,0 AS level, CAST(Child AS varchar(50)) AS order_sequence FROM RevOrgRel WHERE Parent IS NULL UNION ALL SELECT parent.Parent,parent.Child,level + 1 AS level,CAST(CONCAT(order_sequence, \'_\',CAST(parent.Child AS VARCHAR (50))) AS VARCHAR(50)) AS order_sequence FROM RevOrgRel parent JOIN tree tv ON parent.Parent = tv.Child) SELECT CONCAT(RIGHT(\'------------\', level*3),Child) AS parent_child_tree FROM tree ORDER BY order_sequence');
// //     // let Record =pool.request().query('DECLARE @parent varchar(10) = 101;WITH cte AS(select null Oid, @parent Cid, 0 as level union SELECT  a.Oid, a.Cid , 1 as level FROM OrgRel a WHERE a.Oid = @parent UNION ALL SELECT a.Oid, a.Cid , c.level + 1 FROM OrgRel a JOIN cte c ON a.Oid = c.Cid) SELECT distinct cte.Oid, cte.Cid, (select Oname from Org where Oid = cte.Oid) p, (select Oname from Org where Oid = cte.Cid) c, level FROM cte inner join Org On (cte.Oid = Org.Oid) order by level, Oid');
// //        let Record =pool.request().query('SELECT (Select Oname from Org where Oid=Parent) As Parent,(Select Oname from Org where Oid=Child) As Child From RevOrgRel');
    
    
// //     let myString = JSON.stringify((await Record).recordset);
     
// //     console.log(myString)
// //     // Res.send(JSON.stringify(results));
// //        return (await Record).recordset;
// //     //    let myString = JSON.stringify(Record);
     
// //         // console.log(myString)

// //     } 
// //     catch(error){
// //     console.log(error);
// //     }
// // }
// // async function Admin(){
// //     try{
// //        let pool =await sql.connect(config);
// //     let Record =pool.request().query('SELECT * FROM Users WHERE Role = \'Admin\'')
// //        return (await Record).recordset;
// //     } 
// //     catch(error){
// //     console.log(error);
// //     }
// // }
// // async function Dist(){
// //     try{
// //        let pool =await sql.connect(config);
// //     let Record =pool.request().query('SELECT * FROM Users WHERE Role = \'Distributor\'')
// //        return (await Record).recordset;
// //     } 
// //     catch(error){
// //     console.log(error);
// //     }
// // }
// // async function Cust(){
// //     try{
// //        let pool =await sql.connect(config);
// //     let Record =pool.request().query('SELECT * FROM Users WHERE Role = \'Customer\'')
// //        return (await Record).recordset;
// //     } 
// //     catch(error){
// //     console.log(error);
// //     }
// // }

// module.exports={
//    //  getRecord,
//    //  delOrg,
//     addOrg,
//    //  ListAll,
//     getUserinfo,
//     getDash,
//    //  getLChart,
//    //  getBChart,
//    //  getPChart,
//    //  delUser,
//    //  AccessableOrg,
//    //  Admin,
//    //  Dist,
//    //  Cust,
//     deleteChart
// }
