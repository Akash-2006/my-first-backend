const http=require('http');
const fs=require('fs');
const url=require('url');
let data=fs.readFileSync(`${__dirname}/overview.html`,'utf-8')
const template=fs.readFileSync(`${__dirname}/template.html`,'utf-8')
const product=fs.readFileSync(`${__dirname}/product.html`,'utf-8')
const datajson=fs.readFileSync(`${__dirname}/data.json`,'utf-8')
const dataobj=JSON.parse(datajson)
function replacetemplate(databy,template){
  let output=template
output=output.replace(/{%productImage%}/g,databy.image)
output=output.replace(/{%productName%}/g,databy.productName)
output=output.replace(/{%price%}/g,databy.price)
output=output.replace(/{%productquantity%}/g,databy.quantity)
output=output.replace(/{%location%}/g,databy.from)
output=output.replace(/{%id%}/g,databy.id)
output=output.replace(/{%vitims%}/g,databy.nutrients)
output=output.replace(/{%produtdesc%}/g,databy.description)
if(!databy.organic){
  
  output=output.replace(/{%oraginc%}/g,'not-organic')
 
}

return output
}
const server=http.createServer((req,res)=>{
 const  {query,pathname}=url.parse(req.url,true)

if(req.url==='/' || req.url==='/overview.html'){
  
  const output=dataobj.map(data=>replacetemplate(data,template)).join("")
  const tell=data.replace('{%producttemplate%}',output)
  res.writeHead('200',{'Content-type':'text/html'})
  res.end(tell)
}
else if(pathname==='/product'){


const temp=dataobj[query.id]
const output=replacetemplate(temp,product)
res.writeHead('200',{'Content-type':'text/html'})
res.end(output)
}
else{
  res.end("page not found")
}
})

server.listen('8000','127.0.0.1',()=>{
  console.log("is running...")
})