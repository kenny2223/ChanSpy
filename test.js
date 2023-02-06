const {ami}= require('./asterisk')

const { once} = require('events')


const extes=[]




function add(ob){
extes.push(ob)
}

ami.on('coreshowchannel', function(evt) {
  add(evt)
});




async function getstatus(){
  
     ami.action({
            'action':'CoreShowChannels',
            'actionid':2223
          }, function(err, res) {
          
          });

          await once(ami, 'coreshowchannelscomplete');
          
          let f=extes.filter(e => e.calleridnum== '1000')
          console.log(f);
}

async function test(){

  const test=await ;
  console.log(test);
}

test();




