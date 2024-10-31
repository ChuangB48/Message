const socket=new WebSocket("ws://localhost:80");
const appellation=document.cookie.substring(5,document.cookie.length);
socket.onmessage=function(event){
    let type=event.data.toString();
    console.log(type);
    if(type[type.length-1]=="a"){
        document.getElementById("num").innerText=type.substring(0,type.length-1);
    }
    else if(type[type.length-1]=="b"){
        let line=type.substring(0,type.length-1);
        let sep=line.split("^$%&#!)*;'`~(>?<:@");
        let sentence=sep[0];
        let call=sep[1];
        document.getElementById("board").innerHTML+="<div class='personalzone'><br><br><span class='name'>"+call+"</span><br><div class='message'>"+sentence+"</div></div>";
    }
}
function send(){
    let type=document.getElementById("type");
    if(type.value.trim()!=""){
        let message=type.value+"^$%&#!)*;'`~(>?<:@"+appellation;
        socket.send(message);
        type.value="";
    }
}
window.addEventListener("keypress",function(press){
    if(press.key=="Enter"){
        send();
    }
},false);