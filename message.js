const socket=new WebSocket("wss://message-axxe.onrender.com");
const appellation=document.cookie.substring(5,document.cookie.length);
let paragraph="";
document.getElementById("personal").innerHTML="<span id='username'>"+appellation+"</span>";
function down(){
    let i=document.getElementById("board");
    i.scrollTo(0,i.scrollHeight);
}
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
        sentence="&ensp;"+sentence+"&ensp;";
        if(paragraph==line){
            document.getElementById("board").innerHTML+="<div class='myzone'><span class='name'>"+call+"</span><br><div class='message'><span class='words'>"+sentence+"</span></div><br><br></div>";
        }
        else{
            document.getElementById("board").innerHTML+="<div class='otherzone'><span class='name'>"+call+"</span><br><div class='message'><span class='words'>"+sentence+"</span></div><br><br></div>";
        }
        if(paragraph==line){
            down();
            paragraph="";
        }
        else{
            let i=document.getElementById("board");
            let h=i.scrollHeight;
            if(i.scrollTop+h>=i.scrollHeight){
                down();
            }
        }
    }
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
window.addEventListener("click",function(mouse){
    let mousey=mouse.clientX-25;
    let mousex=mouse.clientY-25;
    document.getElementById("fireboard").style.top=mousex.toString()+"px";
    document.getElementById("fireboard").style.left=mousey.toString()+"px";
    document.getElementById("firework").style.opacity="1";
    let o=1.0,s=5.0;
    let time=window.setInterval(function(){
        document.getElementById("firework").style.opacity=o.toString();
        document.getElementById("firework").style.width=s.toString()+"px";
        document.getElementById("firework").style.height=s.toString()+"px";
        o-=0.02;
        s+=1;
        if(o<=0){
            window.clearInterval(time);
        }
    },1);
    document.getElementById("firework").style.opacity="0";
    document.getElementById("firework").style.width="5px";
    document.getElementById("firework").style.height="5px";
});