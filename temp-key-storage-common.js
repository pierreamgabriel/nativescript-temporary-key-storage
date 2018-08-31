let Sqlite = require("nativescript-sqlcipher");
let CryptoJS = require("crypto-js");

function keyStorage(key, length) {

let randomKey = {key: CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex)};
let setLength = length;    

 if (Sqlite.exists("temp_storage")) {
    Sqlite.deleteDatabase("temp_storage");
    }

   new Sqlite("temp_storage", randomKey).then(db =>{
      db.execSQL('CREATE TABLE IF NOT EXISTS key (id INTEGER PRIMARY KEY AUTOINCREMENT, main_key TEXT)');
      db.execSQL("INSERT INTO key (main_key) VALUES (?)", [key]).then(id => {
        reKey(randomKey, setLength);  
      });});  

}

function reKey(arg, length) {
    global.tempKey = arg;  
    let setLength = length;
    
     setTimeout(function(){
    let random = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);  
    let rekeyDb = {key: random};        
      new Sqlite("temp_storage", tempKey).then(db =>{           
      db.execSQL("PRAGMA rekey = '" + random + "';");
          console.log("ok");
      }).then(function() {reKey(rekeyDb, setLength);});     
    }, length);
   
    }
    
    function processDb(){

     let mainKey = "";    
    this.getKey = function(){  
    new Sqlite("temp_storage", tempKey).then(db =>{    
     db.all("SELECT * FROM key").then(rows => {
            for(var row in rows) {
                mainKey = rows[row][1]; 
            }
        });
    });  
    }
     this.returnKey = function() {
         return mainKey;
     }    
    
    this.deleteDb = function() {
    Sqlite.deleteDatabase("temp_storage");
    }
    }

exports.keyStorage = keyStorage;
exports.processDb = processDb;
    
