
const {credenciales} = require('../tools/credenciales')

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user: credenciales['AMPDBUSER'], 
     password: credenciales['AMPDBPASS'],
     database : credenciales['AMPDBNAME'],
     dateStrings: true
     
});


async function getusers(){
    let  conn;
    try{
   conn = await pool.getConnection();
    return  await conn.query("SELECT user,description,dial from devices ORDER BY id;");
    
  } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  
}

module.exports = {getusers}