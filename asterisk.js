const ami = new require('asterisk-manager')('5038','127.0.0.1','sencom','31994', true);

ami.keepConnected();

const {once} = require('events')


const extes=[]
function add(ob){
  extes.push(ob)
}

function accion(scr,dst,type){
    ami.action({
        'action':'originate',
        'channel':scr,
        'context':'app-chanspy',
        'exten':555,
        'priority':1,
        'callerid' : 'Chanspy <555>',
        'variable':{
            'dst': `${dst}`,
            'type': type
            
          }
        
      }, function(err, res) {});

}

function getstate(ext){
    return new Promise((resolve, reject) => {
        ami.action({
            'action':'ExtensionState',
            'context':'from-internal',
            'exten':ext,
            'actionid':2223
          }, function(err, res) {
            resolve(res);
          });

    })
  

}


ami.on('coreshowchannel', function(evt) {
  add(evt)
});


async function getcurrentstatus(){


  await ami.action({
    'action':'CoreShowChannels',
    'actionid':2223
  }, function(err, res) {
  
  });

await once(ami, 'coreshowchannelscomplete');
let extensiones = [...extes]
extes.length=0
return extensiones; 
}

module.exports = {ami,accion,getstate,getcurrentstatus}


