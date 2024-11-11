const express=require("express");
const WebSocket=require("ws").Server;
const port=process.env.PORT||80;
const server=express().listen(port,()=>{
    console.log("listening at "+port+".");
});
const wss=new WebSocket({server});
let turnout=0;
wss.on("connection",ws=>{
    turnout++;
    wss.clients.forEach(function each(client){
        client.send(JSON.stringify({"type":"num","name":"none","content":turnout}));
    });
    ws.on("close",()=>{
        turnout--;
        wss.clients.forEach(function each(client){
            client.send(JSON.stringify({"type":"num","name":"none","content":turnout}));
        });
    });
    ws.on("message",data=>{
        data=data.toString();
        wss.clients.forEach(function each(client){
            client.send(data);
        });
    });
});