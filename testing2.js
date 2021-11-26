fs = require('fs');
const moment = require('./obtener_tiempo.js');
aux = moment((Date.now()+2591807000))

let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let mothmeta = date.getMonth() + 2
let year = date.getFullYear()

if(month < 10){
  console.log(`${day}-0${month}-${year}`)
}else{
  console.log(`${day}-${month}-${year}`)
}
fechainicio = new Date(`${year}-0${month}-${day}`).getTime();
fechafin = new Date(`${year}-0${mothmeta}-${day}`).getTime();
var diff = (fechafin - fechainicio);
console.log(Math.floor(diff/(1000 * 60 * 60 *24)),'==========')
aux3 = 'carlos';
aux2= {
  "name": aux3,
  "hora": fechafin 
}
aux2 = JSON.stringify(aux2)
console.log('Testt')
fs.appendFile('./permitir_accesodias', aux2, function (err) { console.log('Casi');
  if (err) {
    // append failed
  } else {
    console.log(aux2)
    aux2=JSON.parse(aux2)
    console.log(aux2.hora, '.-.-.-.-.-..-.-')
  }
})
  var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('permitir_accesodias')
    });
    acceso = true;
    lineReader.on('line', async function (line) {
      if(JSON.parse(line).name === 'carlos'){
        var hoy = new Date(); var fecha1 = moment(hoy);
        a=0
        fechafin = JSON.parse(line).hora
        if(fechafin >= fechainicio){
          console.log('Autorizado')
        }
          console.log(diff)
          
          console.log(a, 'Dias que lleva')
        }
      
    });