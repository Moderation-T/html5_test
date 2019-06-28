const http=require('http');
const fs=require('fs');

http.createServer(function (req, res){
  if(req.url=='/upload_base64'){
    let arr=[];
    req.on('data', data=>{
      arr.push(data);
    });
    req.on('end', ()=>{
      let buffer=Buffer.concat(arr);
      let filename=Math.random()+'.png';

      let buff=new Buffer(decodeURIComponent(buffer.toString().replace(/^col=/, '')).replace(/^data:[^,]+;base64,/, ''), 'base64');

      res.setHeader('Content-Disposition', 'attachment; filename=download.png');
      res.end(buff);
    });
  }else{
    fs.readFile(`www${req.url}`, (err, data)=>{
      if(err){
        res.write('404');
      }else{
        res.write(data);
      }
      res.end();
    });
  }
}).listen(8080);
