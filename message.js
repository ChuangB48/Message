const socket=new WebSocket("wss://message-axxe.onrender.com");
const appellation=document.cookie.substring(5,document.cookie.length);
let typefocus=false;
let paragraph="";
let id=0;
document.getElementById("personal").innerHTML="<span id='username'>"+appellation+"</span>";
function down(){
    let i=document.getElementById("board");
    i.scrollTo(0,i.scrollHeight);
}
socket.onmessage=function(event){
    let word=event.data.toString();
    word=JSON.parse(word);
    if(word.type=="num"){
        document.getElementById("num").innerText=word.content.toString();
    }
    else if(word.type=="text"){
        let line=word.ID;
        let sentence=word.content;
        let call=word.name;
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
        let message={
            "type":"text",
            "name":appellation,
            "content":type.value,
            "ID":id
        };
        socket.send(JSON.stringify(message));
        id++;
        paragraph=message.ID;
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
document.getElementById("type").addEventListener("focus",function(){
    typefocus=true;
    color();
});
document.getElementById("type").addEventListener("blur",function(){
    typefocus=false;
});
function color(){
    let h=0;
    let focustime=window.setInterval(function(){
        h++;
        if(h>=355){
            h=0;
        }
        document.getElementById("type").style.border="1px hsl("+h.toString()+",100%,50%) solid";
        if(!typefocus){
            document.getElementById("type").style.border="1px #632A7E solid";
            window.clearInterval(focustime);
        }
    },2);
}