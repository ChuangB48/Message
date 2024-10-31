const socket=new WebSocket("wss://message-axxe.onrender.com");
const appellation=document.cookie.substring(5,document.cookie.length);
let paragraph="";
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
        document.getElementById("board").innerHTML+="<div class='personalzone'><span class='name'>"+call+"</span><br><div class='message'><span class='words'>"+sentence+"</span></div><br><br></div>";
        if(paragraph==line.trim()){
            down();
            paragraph="";
        }
    }
}
function down(){
    let i=document.getElementById("board");
    i.scrollTo(0,i.scrollHeight);
}
function send(){
    let type=document.getElementById("type");
    if(type.value.trim()!=""){
        let message=type.value+"^$%&#!)*;'`~(>?<:@"+appellation;
        socket.send(message);
        paragraph=message;
        type.value="";
    }
}
window.addEventListener("keypress",function(press){
    if(press.key=="Enter"){
        send();
    }
},false);