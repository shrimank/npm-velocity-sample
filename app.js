var velocity = require("velocity.java");
const fs = require('fs');
const shell = require('shelljs');

var component = {
  imageName:"outward-ct-service",
  environments :[
      {key:"FOO",value:"BAR"}
  ],
  portIn:"1234",
  portOut:"1234",
  volumes:[
        {out:"/data/out",in:"/data/in"},
        {out:"/data/part/out",in:"/data/part/in"}
  ],


}
velocity.renderOnce("demo.vm", {component}, "./", function(err, data) {
    if (err) {
        console.error(err);
        return;
    }
    // fs.writeFileSync('docker-compose.yml',data.toString(),(err)=>{
    //   console.log(err);
    // })
    console.log(data.toString());
    if (shell.exec('docker-compose up').code !== 0) {
        shell.echo('Error: Git commit failed')
        shell.exit(1);
      }
      else{
        console.log("compose starting...");
      }
});
