const socket=new WebSocket("ws://localhost:80");
const name=document.cookie.substring(5,document.cookie.length);
socket.onmessage=function(data){
    if(data[data.length-1]=="a"){
        document.getElementById("num").innerText=data.substring(0,data.length-1);
    }
    else if(data[data.length-1]=="b"){
        let line=data.substring(0,data.length-1);
        let sep=line.split("%ys^&jj|bSL!,~{]}[*;n#3$527)@as:-_?>g<(.,`");
        let sentence=sep[0];
        let call=sep[1];
        document.getElementById("board").innerHTML+="<div class='personalzone'><span class='name'>"+call+"</span><br><div class='message'>"+sentence+"</div></div>";
    }
}
function send(){
    let type=document.getElementById("type");
    if(type.value.trim()!=""){
        let message=type.value+"%ys^&jj|bSL!,~{]}[*;n#3$527)@as:-_?>g<(.,`"+name;
        socket.send(message);
        type.value="";
    }
}