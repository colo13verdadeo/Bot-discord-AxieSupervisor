//Necesario
//Sacar dias Requisito
const moment = require('./obtener_tiempo.js');
//const { channel } = require('diagnostics_channel');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { scheduleJob } = require('node-schedule');
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});
//constantes de puppeteer.
const puppeteer = require('puppeteer');
//constantes de Coingreko.
var getJSON = require('get-json');
const { json } = require('stream/consumers');
//Temporizador
 const schedule = require('node-schedule');
const { count } = require('console');
//Servidores
const grupoAct = "884484879344099388";
const everyoneid = "884484879344099388"

//Canales
const chanel = "884484879344099392";

//Extras
auxerro = 0;
cola = 0;
const skip = true;

//funciones
function tamaño(jsonData, interaction){
    if(jsonData.length != 40){
        aux=true
        interaction.reply({
            content: `No es una direccion ronin correcta!.`, ephemeral: true,
        })
        return aux;
    }
}
function creararchi(jsonData, interaction, usuariofil=0){
    fs.writeFileSync(`./usuarios/${interaction.user.tag}`, jsonData, function(err, result){
        if(err) console.log('error', err)
    })
    if(usuariofil===0){
    interaction.reply({
        content: `Se a creado tu lista con el ronin insertado`, ephemeral: true,
    })}
    return
}
async function encontrar(jsonData, interaction, usuariofil, tem=true){
    var paszc = 0;
    if(tem===true){
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(`./usuarios/${interaction.user.tag}`)
      });}
      else{    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(`./claves/codigos`)
      });}
      lineReader.on('line', async function (line) {
        if(jsonData === line){
            paszc++
            console.log('------------')
            if(tem===true){
            fs.readFile(`./usuarios/${interaction.user.tag}`, {encoding: 'utf-8'}, function(err, data) {
                if (err) throw error;
            
                let dataArray = data.split('\n'); // convert file data in an array
                const searchKeyword = jsonData; // we are looking for a line, contains, key word 'string' in the file
                let lastIndex = -1; // let say, we have not found the keyword
                for (let index=0; index<dataArray.length; index++) {
                    if (dataArray[index].includes(searchKeyword)) { // check if a line contains the 'string' keyword
                        lastIndex = index; // found a line includes a 'string' keyword
                        break; 
                    }
                }
            
                dataArray.splice(lastIndex, 1);
                const updatedData = dataArray.join('\n');
                if(tem===true){
                fs.writeFile(`./usuarios/${interaction.user.tag}`, updatedData, (err) => {
                    if (err) throw err;
                    console.log ('Se actualizo las claves, lo canjeo: '+interaction.user.tag);
                    if(tem===true){
                    interaction.reply({
                        content: `Se actualizo tu lista @${interaction.user.tag}`, ephemeral: true,
                    })
                }})}else{
                    fs.writeFile(`./claves/codigos`, updatedData, (err) => {
                        if (err) throw err;
                        console.log ('Se actualizo las claves, lo canjeo: '+interaction.user.tag);
                        if(tem===true){
                        interaction.reply({
                            content: `Se actualizo tu lista ${interaction.user.tag}`, ephemeral: true,
                        })
                    }})
                }
            
            })}
            else{
                fs.readFile(`./claves/codigos`, {encoding: 'utf-8'}, function(err, data) {
                    if (err) throw error;
                
                    let dataArray = data.split('\n'); // convert file data in an array
                    const searchKeyword = jsonData; // we are looking for a line, contains, key word 'string' in the file
                    let lastIndex = -1; // let say, we have not found the keyword
                    for (let index=0; index<dataArray.length; index++) {
                        if (dataArray[index].includes(searchKeyword)) { // check if a line contains the 'string' keyword
                            lastIndex = index; // found a line includes a 'string' keyword
                            break; 
                        }
                    }
                
                    dataArray.splice(lastIndex, 1);
                    const updatedData = dataArray.join('\n');
                    if(tem===true){
                    fs.writeFile(`./usuarios/${interaction.user.tag}`, updatedData, (err) => {
                        if (err) throw err;
                        console.log ('Se actualizo las claves, lo canjeo: '+usuariofil);
                        if(tem===true){
                        interaction.reply({
                            content: `Se actualizo tu lista ${usuariofil}`, ephemeral: true,
                        })
                    }})}else{
                        fs.writeFile(`./claves/codigos`, updatedData, (err) => {
                            if (err) throw err;
                            console.log ('Se actualizo las claves, lo canjeo: '+usuariofil);
                            if(tem===true){
                            interaction.reply({
                                content: `Se actualizo tu lista ${usuariofil}`, ephemeral: true,
                            })
                        }})
                    }
                
                })
            }
            return true
        }
        
      });
      await sleep(200);
      try{
      if(paszc ===0)
      interaction.reply({
        content: `No se encontro la direccion en tu lista ${usuariofil}`, ephemeral: true,
    })
} catch{
    console.log('Fue testeado')
}
      return false;
}

function obtener_acceso(interaction, usuariofil){
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('permitir_acceso')
      });
      acceso = true;
      lineReader.on('line', async function (line) {
        if(usuariofil === line){
            
            acceso = false;
            return acceso
        }
        
      });
      return acceso
}
async function obtener_accesofecha(interaction, usuariofil){
    let date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
if(month < 10){
    fechainicio = new Date(`${year}-0${month}-${day}`).getTime();
  }else{
    fechainicio = new Date(`${year}${month}-${day}`).getTime();
  }
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('permitir_accesodias')
  });
saldia = true;
  lineReader.on('line', async function (line) {
    if(usuariofil === JSON.parse(line).nombre){
        fechafin = JSON.parse(line).hora;
        var diff = (fechafin - fechainicio);
        if(diff >= 0){            console.log('Entro en false')
        saldia = false;
            return saldia

        }else{console.log('Entro en true')}
        
    }
  });
  await sleep(170)
  return saldia
}
function obtener_diferenciadias(response,interaction, usuariofil){
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if(month < 10){
        fechafin = new Date(`${year}-0${month}-${day}`).getTime();
      }else{
        fechafin = new Date(`${year}${month}-${day}`).getTime();
      }
      try{fechainicio = response.walletData.claim_timestamp*1000}catch{
        fechainicio = response.claim_timestamp*1000
      } 
      var diff = (fechafin - fechainicio)/(1000 * 60 * 60 *24);
      return diff;

}

function say(message) {//client.channels.cache.get("juegos");
switch(message.content){
    case '!slp': sayelslp(message);  break;
    case '!pvu': sayelPVU(message);  break;
    case '!axs': sayelAXS(message); break;
    case '!cyt': sayelCYT(message); break;
    case '!ccw': message.channel.send("En desarrollo, aun no esta la moneda!! (CCW)"); setTimeout(() => message.delete(), 10000); break;
    case '!eth': sayelETH(message); break;
    default: break;
}}
async function esperar(){
    await sleep(1000*1);
}
//Funcion testandolo
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function sayelAXS(message){
    getJSON('https://api.coingecko.com/api/v3/simple/price?ids=axie-infinity&vs_currencies=usd', function(error, response){
        var numb = response['axie-infinity'].usd;
    numb = numb.toFixed(2);
    esperar();
//        message.guild.channels.cache.get(chanel).send("PVU a "+"$"+numb);
const exampleEmbed = new MessageEmbed()
.setColor('#0099ff')
.setTitle('AXS')
.setURL('https://www.coingecko.com/es/monedas/axie-infinity')
.setAuthor('Axie Infinity (AXS)', 'https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png?1604471082', 'https://www.coingecko.com/es/monedas/axie-infinity')
.setDescription("$"+numb+"   (DOLARES/USD)")
.setThumbnail('https://es.crypto-economy.com/wp-content/uploads/sites/2/2021/07/axies-logo.jpg')/*
.addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
)*//*
.addField('Titulo', 'Descripcion', true)*//*
.setImage('https://es.crypto-economy.com/wp-content/uploads/sites/2/2021/07/axies-logo.jpg')*/
.setTimestamp()
.setFooter('Actualizado hace ', 'https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png?1604471082');

message.channel.send({ embeds: [exampleEmbed] });


})
}
function sayelslp(message){
        getJSON('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=usd', function(error, response){
            var numb = response['smooth-love-potion'].usd;
        numb = numb.toFixed(3);
        esperar();
//        message.guild.channels.cache.get(chanel).send("PVU a "+"$"+numb);
const exampleEmbed = new MessageEmbed()
	.setColor('#ea899a')
	.setTitle('SLP')
	.setURL('https://www.coingecko.com/es/monedas/smooth-love-potion')
	.setAuthor('Smooth Love Potion (SLP)', 'https://assets.coingecko.com/coins/images/10366/small/SLP.png?1578640057', 'https://discord.js.org')
	.setDescription("$"+numb+"   (DOLARES/USD)")
	.setThumbnail('https://cryptoshitcompra.com/wp-content/uploads/2021/07/slp-850x550.png')/*
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)*/
	/*.addField('Titulo', 'Descripcion', true)*//*
	.setImage('https://cryptoshitcompra.com/wp-content/uploads/2021/07/slp-850x550.png')*/
	.setTimestamp()
	.setFooter('Actualizado hace ', 'https://assets.coingecko.com/coins/images/10366/small/SLP.png?1578640057');

message.channel.send({ embeds: [exampleEmbed] });
    
    
    })

}
function sayelPVU(message){
    getJSON('https://api.coingecko.com/api/v3/simple/price?ids=plant-vs-undead-token&vs_currencies=usd', function(error, response){
        var numb = response['plant-vs-undead-token'].usd;
    numb = numb.toFixed(4);
    esperar();
//        message.guild.channels.cache.get(chanel).send("PVU a "+"$"+numb);
const exampleEmbed = new MessageEmbed()
.setColor('#2d572c')
.setTitle('PVU')
.setURL('https://www.coingecko.com/es/monedas/axie-infinity')
.setAuthor('Plant vs Undead Token (PVU)', 'https://assets.coingecko.com/coins/images/17461/small/token-200x200.png?1627883446', 'https://www.coingecko.com/es/monedas/plant-vs-undead-token')
.setDescription("$"+numb+"   (DOLARES/USD)")
.setThumbnail('https://www.mmoingame.com/wp-content/uploads/2021/07/Plant-vs-Undead.jpg')/*
.addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
)*//*
.addField('Titulo', 'Descripcion', true)*//*
.setImage('https://www.mmoingame.com/wp-content/uploads/2021/07/Plant-vs-Undead.jpg')*/
.setTimestamp()
.setFooter('Actualizado hace ', 'https://assets.coingecko.com/coins/images/17461/small/token-200x200.png?1627883446');

message.channel.send({ embeds: [exampleEmbed] });


})
}
function sayelCYT(message){
    getJSON('https://api.coingecko.com/api/v3/simple/price?ids=coinary-token&vs_currencies=usd', function(error, response){
        var numb = response['coinary-token'].usd;
    numb = numb.toFixed(4);
    esperar();
//        message.guild.channels.cache.get(chanel).send("PVU a "+"$"+numb);
const exampleEmbed = new MessageEmbed()
.setColor('#6F2B3D')
.setTitle('CYT')
.setURL('https://www.coingecko.com/es/monedas/coinary-token')
.setAuthor('Coinary Token (CYT)', 'https://assets.coingecko.com/coins/images/17622/small/CYT-LOGO-1.png?1628669366', 'https://www.coingecko.com/es/monedas/coinary-token')
.setDescription("$"+numb+"   (DOLARES/USD)")
.setThumbnail('https://dragonary.com/wp-content/uploads/CoversSocialGoogle.jpg')/*
.addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
)*//*
.addField('Titulo', 'Descripcion', true)/**//*
.setImage('https://dragonary.com/wp-content/uploads/CoversSocialGoogle.jpg')*/
.setTimestamp()
.setFooter('Actualizado hace ', 'https://assets.coingecko.com/coins/images/17622/small/CYT-LOGO-1.png?1628669366');

message.channel.send({ embeds: [exampleEmbed] });


})
}
function sayelETH(message){
    getJSON('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', function(error, response){
        var numb = response['ethereum'].usd;
    numb = numb.toFixed(2);
    esperar();
//        message.guild.channels.cache.get(chanel).send("PVU a "+"$"+numb);
const exampleEmbed = new MessageEmbed()
.setColor('#7F7F7F')
.setTitle('ETH')
.setURL('https://www.coingecko.com/es/monedas/ethereum')
.setAuthor('Ethereum (ETH)', 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880', 'https://www.coingecko.com/es/monedas/ethereum')
.setDescription("$"+numb+"   (DOLARES/USD)")
.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png')/*
.addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
)*//*
.addField('Titulo', 'Descripcion', true)*//*
.setImage('https://enqueinvertir.com/wp-content/uploads/2021/06/La-magia-de-ETH-en-cinco-anos-de-miles-a-millones-de-dolares.jpg')*/
.setTimestamp()
.setFooter('Actualizado hace ', 'https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png');

message.channel.send({ embeds: [exampleEmbed] });


})
}

async function reg(interaction, clave, usuariofil){
    let date = new Date()
    let day = date.getDate()
let month = date.getMonth() + 1
let mothmeta = date.getMonth() + 2
let year = date.getFullYear()
    var akk = false;
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(`./claves/codigos`)
      });
      lineReader.on('line', async function (line) {
        if(clave === line){
            akk=true;
            crearcanal(interaction, usuariofil);
            interaction.reply({
                content: `Su cuenta se registro sastifactoriamente`, ephemeral: true,
            })
            encontrar(clave, interaction, usuariofil, false)
            fs.appendFile('./permitir_acceso', `\r\n`+usuariofil, function (err) {
                if (err) {
                  // append failed
                } else {
                  // done
                }
              })
              
              if(month < 10){
                  try{
                    fechafin = new Date(`${year}-0${mothmeta}-${day}`).getTime();
                    aux2= {
                        "nombre": usuariofil,
                        "hora": fechafin 
                      }
                      aux2 = JSON.stringify(aux2)
                      fs.appendFile('./permitir_accesodias', `\r\n${aux2}`, function (err) {
  if (err) {
    // append failed
  }
})
                  }catch{console.log('Error al registrar fecha en month<10 usuario: ',usuariofil);}
              }else{
                try{
                    fechafin = new Date(`${year}${mothmeta}-${day}`).getTime();
                    aux2= {
                        "nombre": usuariofil,
                        "hora": fechafin 
                      }
                      aux2 = JSON.stringify(aux2)
                      fs.appendFile('./permitir_accesodias', aux2, function (err) { console.log('Casi');
  if (err) {
    // append failed
  }
})
                  }
                  catch{console.log('Error al registrar fecha en month>10 usuario: ',usuariofil);}
              }
        }
        
      });
      await sleep(700);
      if(akk===false){
        interaction.reply({
            content: `No se pudo registrar, si compraste una licencia abre un ticket!.`, ephemeral: true,
        })
      }


}
async function crearcanal(interaction, usuariofil){
    auxusufil = new String(interaction.user.tag)
    if(interaction.guild.channels.cache.find(c => c.name === auxusufil.replace('#', ''))===undefined){
        try{
        let roles = interaction.guild.roles
        interaction.guild.channels
        .create(interaction.user.tag,{
            type: 'text',
        })
        .then((channel)=>{
            const categoria = '888225903769976872'
            channel.setParent(categoria)
        })
        
        await sleep(1000);
        interaction.guild.channels.cache.find(c => c.name === auxusufil.replace('#', '')).permissionOverwrites.set([{
             id: interaction.user.id ,
             allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
             deny: ['ATTACH_FILES'] },
            {
                id: everyoneid,
                deny: [['VIEW_CHANNEL', 'SEND_MESSAGES'], 'ATTACH_FILES'] 
            }
            ])
    }catch{
        console.log('No se logro crear el canal de: ', usuariofil)
    }}
}
//Funcion bot automatico

async function clears(message){
    try{message.channel.messages.fetch( {limit: 90}).then(messages =>{
        message.channel.bulkDelete(messages, true);
    })}catch(error){
    }
}

async function norm(message){
try{    message.channel.messages.fetch( {limit: 20}).then(messages =>{
    message.channel.bulkDelete(messages, true);
})}catch(error){
}

    cola--; 
    sayelslp(message);
    await sleep(100*6)
    sayelAXS(message);
    await sleep(100*6)
    sayelPVU(message);
    await sleep(100*6)
    sayelCYT(message);
    await sleep(100*6)
    sayelETH(message);
    await sleep(100*6)
//    message.guild.channels.cache.get(chanel).send("welcome in this channel!");
}
async function darslp(response){
    try{
        producbec = response.walletData.ingame_slp;
    }catch{
        producbec = response.ingame_slp;
    }
    return producbec
}
function dardias(response){
    try{
        producbec = response.walletData.ingame_slp;
        var timestamp = response.walletData.claim_timestamp*1000;
    }catch{
        producbec = response.ingame_slp;
        var timestamp = response.claim_timestamp*1000;
    }
var date = new Date(timestamp);

//fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
try{var timestamp2 = response.walletData.next_claim_timestamp*1000;
    var timestamp3 = response.walletData.lastupdate*1000;
    var date3 = new Date(timestamp3);
} catch{
//    console.log(response)
    var timestamp2 = response.next_claim_timestamp*1000;
    var timestamp3 = response.lastupdate*1000;
    var date3 = new Date(timestamp3);
}
var date2 = new Date(timestamp2);
var fecha2 = moment(date2);
var hoy = new Date();
var fecha1 = moment(hoy);
var a=0
for(i=fecha2.diff(fecha1, 'days'); i<14; i++){
a++
}
if(a>=30){
    console.error('Alerta de ERROR: ', a, ' ', fecha2, '-_-', fecha1)}
return a;
}
//Prirey
function prireycheck(response, line=0){
    try{
        producbec = response.walletData.ingame_slp;
        var timestamp = response.walletData.claim_timestamp*1000;
    }catch{
        producbec = response.ingame_slp;
        var timestamp = response.claim_timestamp*1000;
    }
var date = new Date(timestamp);

//fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
try{var timestamp2 = response.walletData.next_claim_timestamp*1000;
    var timestamp3 = response.walletData.lastupdate*1000;
    var date3 = new Date(timestamp3);
} catch{
//    console.log(response)
    var timestamp2 = response.next_claim_timestamp*1000;
    var timestamp3 = response.lastupdate*1000;
    var date3 = new Date(timestamp3);
}
var date2 = new Date(timestamp2);
var fecha2 = moment(date2);
var hoy = new Date();
var fecha1 = moment(hoy);
var a=0
if(line===0)auxpri2 = obtener_diferenciadias(response); else auxpri2 = obtener_diferenciadias(response, line)
if(auxpri2 >=32){
    contadorusuarioerror++
    try{
        listausuarioerror.push(line+'  ')
    }catch{
        console.log('Error en el push de lista erroneas')
    }
}
if(auxpri2===0){auxpri2 = 1}
if(producbec===undefined){producbec = 1}
console.log(auxpri2, producbec, '======')
auxpri = producbec/auxpri2
if(auxpri >=80){
    return false
}else{return true} 
}


async function prirey(response = 2, line=null, usuariofil){
    if(response === 2){
        if(line===''){return false}else
{        getJSON(`https://axiesworld.firebaseapp.com/updateSpecific?wallet=0x${line}`, function(error, response){
            if(response === 2){console.error('ACa erorr');} else{
                if(prireycheck(response, line) === false){return false} else{
                    contadorusuario++
                    if(contadorusuarioerror > auxerro){auxerro++}else{                    listausuario.push(line+'  ')
}

                    return true;
                
                }
            }
        })}
    }
    if(prireycheck(response, line) === false){console.log('=== FAlse'); return false} else{return true;}
}

//TESTEO
const provc = {
    total_slp: 735,
    last_claim_amount: 6308,
    claim_timestamp: 1631240128,
    next_claim_timestamp: 1632536128,
    ronin_slp: 0,
    ingame_slp: 735,
    lastupdate: 1631765345,
    adventureSLP: 0,
    pvpData: { elo: 1201, rank: 901417 },
    calendar: { todaySLP: 735, yesterdaySLP: 0, delta: 735, yesterdayDelta: 0 }
  }


//Variables
Contadorcolo = 0;
//Funcion PVU.
//Fin funcion PVU.

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });}

//Arranque
client.on("ready", () => {
    console.log(`Estoy listo! ${client.user.tag}`);
    const guildsz = client.guilds.cache.get(grupoAct); 
    let commands
    if(guildsz){
commands = guildsz.commands;
    } else{
        client.application?.commands;
    }
    commands?.create({ 
    name: '0x', 
    description: 'Añade tu direccion roning que aparece en tu beca (NO TU WALLET RONING)',
    options: [
        {
            name: 'direccion_del_becado',
            description: 'Roning de la CUENTA BECA',
            required: true,
            type: 'STRING'
        }
    ]
    })
    commands?.create({ 
        name: 'aprirey', 
        description: 'Incerta la Clave Secreta',
        options: [
            {
                name: 'clave',
                description: 'Utilidad de Prirey',
                required: true,
                type: 'STRING'
            }
        ]
        })
        commands?.create({ 
            name: 'register', 
            description: 'Incerta la Clave otorgada',
            options: [
                {
                    name: 'clave',
                    description: 'Clave para registrar',
                    required: true,
                    type: 'STRING'
                }
            ]
            })
        commands?.create({ 
            name: 'check', 
            description: 'Checkear tus usuarios',
            })
    commands?.create({ 
    name: 'create', 
    description: 'Añadir direccion a controlar',
    options: [
        {
            name: 'direccion',
            description: 'Incertar direccion ronin del becado',
            required: true,
            type: 'STRING'
        }
    ]
    })
        commands?.create({ 
    name: 'add', 
    description: 'Añadir direccion a controlar',
    options: [
        {
            name: 'direccion',
            description: 'Incertar direccion ronin del becado',
            required: true,
            type: 'STRING'
        }
    ]
    })
        commands?.create({ 
    name: 'delete', 
    description: 'Incerta la direccion a borrar',
    options: [
        {
            name: 'direccion',
            description: 'Incertar direccion ronin a borrar',
            required: true,
            type: 'STRING'
        }
    ]
    })
 });
 //Temporizador (ADD-ON)
 // ADD-ON Temporizador
 /*
 schedule.scheduleJob('*//*2 * * * * *', ()  => {  console.log('stopped task'); 

})
*/

 //Eventos
 client.on("messageCreate", async (message, ssa) => {
     if(message.channel.id === chanel || '888257372328448080'){
   switch(message.content){
    
    case '!axs' || '!AXS': say(message); break;
    case '!pvu': say(message); break; 
    case '!ccw': say(message); break; 
    case '!slp': say(message);  break; 
    case '!PVU': say(message); break; 
    case '!CCW': say(message); break; 
    case '!SLP': say(message);  break; 
    case '!eth': say(message); break;
    case '!cyt' || '!CYT': say(message); break;
    case '!fixch': norm(message); break;
    case '!clearcol1sa': clears(message); break;
   default:   if(cola === 0){cola++; console.log(cola); await sleep(1000*60*60*6); norm(message);  /*setTimeout(() => message.delete(), 1000*3);*/break; } else{break;}//message.channel.send("There was an error while muting the member");
}}
 });
 
 client.on('interactionCreate', async interaction=>{
    if(!interaction.isCommand()){return};
    const { commandName, options } = interaction;
    if (commandName === '0x'){
        count(options.getString('direccion_del_becado'))
        direccionbec = options.getString('direccion_del_becado') || '11';
        if(direccionbec === 11){interaction.reply({content: 'La direccion es inexsistente', ephemeral: true})} else {
        getJSON(`https://axiesworld.firebaseapp.com/updateSpecific?wallet=0x${direccionbec}`, function(error, response){
            esperar();
        //Calcular horas
        try{var timestamp2 = response.walletData.next_claim_timestamp*1000;
            var timestamp3 = response.walletData.lastupdate*1000;
            var date3 = new Date(timestamp3);
        } catch{
            console.log(response)
            var timestamp2 = response.next_claim_timestamp*1000;
            var timestamp3 = response.lastupdate*1000;
            var date3 = new Date(timestamp3);

            console.log('---------- SEPARACION catch times --------------')
            console.log(timestamp2)
        }
        
        var date2 = new Date(timestamp2);
var hoy = new Date();
        var fecha1 = moment(hoy);
var fecha2 = moment(date2);
        var fecha3 = moment(date3);
        var horasexp = fecha1.diff(fecha3, 'minutes')/60
        horasexp = horasexp.toFixed(2)
        //Calcular dias
        try{
            producbec = response.walletData.ingame_slp;
            var timestamp = response.walletData.claim_timestamp*1000;
        }catch{
            producbec = response.ingame_slp;
            var timestamp = response.claim_timestamp*1000;
        }
var date = new Date(timestamp);

//fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();


var a=0
for(i=fecha2.diff(fecha1, 'days'); i<14; i++){
    a++
}
if(a===0)a=1
console.log(fecha2);
console.log(fecha1);
console.log(a);

try{
   MMR= response.walletData.pvpData.elo
        interaction.reply({
            content: `La wallet: ${direccionbec} tiene ${producbec} SLP por reclamar.
            Promedio de SLP al DIA ${producbec/a}
            MMR de ${MMR}
            Ultima actualizacion hace ${horasexp} horas
            `, 
            ephemeral: true,
        })} catch{
            console.log(producbec, '-', a, '-', horasexp, '-', MMR)
            interaction.reply({
                content: `Surgio un error, porfavor reportamelo! ERROR: possible cannot read property of undefined`, ephemeral: true,
            })
            console.log(response)
        }
        })}
        

    }
    if (commandName === 'register'){
        const usuariofil = interaction.user.id
        const clave = options.getString('clave')
        await sleep(100);
            reg(interaction,clave, usuariofil)

          await sleep(4000);
    }
    if (commandName === 'check'){
        const usuariofil = interaction.user.id
        acceso = obtener_acceso(interaction, usuariofil)
        acceso2 = obtener_accesofecha(interaction, usuariofil)
        acceso2.then(async (acceso2)=>{
            console.log( acceso2, 'hoal')
        auxusufil = new String(interaction.user.tag)
        await sleep(200)
        if(acceso || acceso2){
            console.log(acceso2, acceso)
            console.log('Acceso denegado a:' + interaction.user.tag)
            interaction.reply({
                content: `Tu cuenta no esta registrada o expiro!.
                Puedes contactar con algun admin.`, ephemeral: true,
            })
        }else{
            console.log('Acceso otorgado en check a:' + interaction.user.tag)
            if(fs.existsSync(`./usuarios/${interaction.user.tag}`)){}else{
                console.log('Creando archivo para: ' + interaction.user.id)
                jsonData = '';
                creararchi(jsonData, interaction, usuariofil);}
                await sleep(100)    
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(`./usuarios/${interaction.user.tag}`)
          });
          listausuario = new Object([' ']);
          listausuarioerror = new Object(['']);
          contadorusuario = 0;
          contadorusuarioerror = 0;
          lineReader.on('line', async function (line) {
            if(prirey(2,line, usuariofil) === true){
                
                contadorusuario++
            }
            
          });
          try{
            interaction.reply({
            content: `Se te respondera por tu canal en el servidor en unos instantes`, 
            ephemeral: true,
        })} catch{
                interaction.reply({
                    content: `Surgio un error, porfavor reportamelo! ERROR: No se2, reportamelo`, ephemeral: true,
                })
                console.log('...Separame...')
            }

          await sleep(4000);
          auxmention=interaction.user.id;
          try{
              if(contadorusuario!=0)          interaction.guild.channels.cache.find(c => c.name === auxusufil.replace('#', '')).send(`<@${auxmention}>Hay actualmente ${contadorusuario-contadorusuarioerror} becados con menos de la media, con ${contadorusuarioerror} errores de calculo. \r\n La lista con errores(si los hay): ${listausuarioerror}
              \r\n                        <La lista por debajo de la media>
${listausuario}`)
else{
    interaction.guild.channels.cache.find(c => c.name === auxusufil.replace('#', '')).send(`No hay becados por debajo de la media. Si consideras un error, porfavor reportarmelo`)

}
}
catch{ 
    console.log(contadorusuario,`Contador de ${usuariofil}`)
    interaction.guild.channels.cache.find(c => c.name === auxusufil.replace('#', '')).send('Ocurrio un error inesperado')
    }

          console.log(contadorusuario, 'Contadorusu');
            if(contadorusuario!=0){
                
        if(contadorusuario!=0){}
            else{
                try{
                    interaction.reply({
                        content: `No debiste llegar aca, reportamelo`, 
                        ephemeral: true,
                    })} catch{
                        console.log('Error en el catch')
                    }
            }}
    }
        })
}
    if (commandName === 'create'){
        let jsonData = options.getString('direccion')
        const usuariofil = interaction.user.id
        acceso = obtener_acceso(interaction, usuariofil)
        acceso2 = obtener_accesofecha(interaction, usuariofil)
        acceso2.then(async (acceso2)=>{
            console.log( acceso2, 'hoal')
        auxusufil = new String(interaction.user.tag)
        await sleep(200)
        if(acceso || acceso2){
            console.log(acceso2, acceso)
            console.log('Acceso denegado a:' + interaction.user.tag)
            interaction.reply({
                content: `Tu cuenta no esta registrada o expiro!.
                Puedes contactar con algun admin.`, ephemeral: true,
            })
        }else{
        var aux = false;
        console.log(aux,'-')
        var aux=tamaño(jsonData, interaction);
        try{
        if(fs.accessSync(`./usuarios/${interaction.user.tag}`)){}
        else{
       var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(`./usuarios/${interaction.user.tag}`)
          });
          lineReader.on('line', async function (line) {
            if(line === jsonData){
                aux=true;

            }
            
          });
        }
        await sleep(1000);
        if(aux){}else{
            const createfiles = fs.createWriteStream(`./usuarios/${interaction.user.tag}`, {
                flags: 'a'
            })
                createfiles.write(`\r\n${jsonData}`)
                interaction.reply({
                    content: `Se añadio este ronin a tu lista`, ephemeral: true,
                })
                }}
                catch{
                    if(aux){}else{
                        interaction.reply({

                            content: `Se añadio este ronin a tu lista`, ephemeral: true,
                        })
                    console.log('Creando archivo para: ' + interaction.user.id)
                    creararchi(jsonData, interaction, usuariofil);

}}
        if(aux === true){
        if(jsonData.length != 40){}else{
        interaction.reply({

            content: `Esta direccion esta repetida`, ephemeral: true,
        }) }
    }
Contadorcolo++
console.log('Cantidad de usos: ',Contadorcolo)}})
}
    if (commandName === 'add'){
        let jsonData = options.getString('direccion')
        const usuariofil = interaction.user.id
        acceso = obtener_acceso(interaction, usuariofil)
        acceso2 = obtener_accesofecha(interaction, usuariofil)
        acceso2.then(async (acceso2)=>{
            console.log( acceso2, 'hoal')
        auxusufil = new String(interaction.user.tag)
        await sleep(200)
        if(acceso || acceso2){
            console.log(acceso2, acceso)
            console.log('Acceso denegado a:' + interaction.user.tag)
            interaction.reply({
                content: `Tu cuenta no esta registrada o expiro!.
                Puedes contactar con algun admin.`, ephemeral: true,
            })
        }else{
        var aux = false;
        console.log(aux,'-')
        var aux=tamaño(jsonData, interaction);
        try{
        if(fs.accessSync(`./usuarios/${interaction.user.tag}`)){}
        else{
       var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(`./usuarios/${interaction.user.tag}`)
          });
          lineReader.on('line', async function (line) {
            if(line === jsonData){
                aux=true;

            }
            
          });
        }
        await sleep(1000);
        if(aux){}else{
            const createfiles = fs.createWriteStream(`./usuarios/${interaction.user.tag}`, {
                flags: 'a'
            })
                createfiles.write(`\r\n${jsonData}`)
                interaction.reply({
                    content: `Se añadio este ronin a tu lista`, ephemeral: true,
                })
                }}
                catch{
                    if(aux){}else{
                        interaction.reply({

                            content: `Se añadio este ronin a tu lista`, ephemeral: true,
                        })
                    console.log('Creando archivo para: ' + interaction.user.id)
                    creararchi(jsonData, interaction, usuariofil);

}}
        if(aux === true){
        if(jsonData.length != 40){}else{
        interaction.reply({

            content: `Esta direccion esta repetida`, ephemeral: true,
        }) }
    }
Contadorcolo++
console.log('Cantidad de usos: ',Contadorcolo)}})
}


 }) 
 
 client.login("ODg3ODc2MjI2NzY3ODAyMzY4.YUKhLA.2BI1GU-XXXXXXXXXXXXXXXXXXXXXX");