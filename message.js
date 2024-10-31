const socket=new WebSocket("wss://message-axxe.onrender.com");
const appellation=document.cookie.substring(5,document.cookie.length);
document.getElementById("personal").innerHTML="<span id='username'>"+appellation+"</span>";
socket.onmessage=function(event){
    let type=event.data.toString();
    if(type[type.length-1]=="a"){
        document.getElementById("num").innerText=type.substring(0,type.length-1);
    }
    else if(type[type.length-1]=="b"){
        let line=type.substring(0,type.length-1);
        let sep=line.split("^$%&#!)*;'`~(>?<:@");
        let sentence=sep[0];
        let call=sep[1];
        document.getElementById("board").innerHTML+="<div class='personalzone'><span class='name'>"+call+"</span><br><div class='message'>"+sentence+"</div><br><br></div>";
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