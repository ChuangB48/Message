const socket=new WebSocket("wss://message-axxe.onrender.com");
const appellation=document.cookie.substring(5,document.cookie.length);
let typefocus=false;
let confirmname="";
let confirmcontent="";
document.getElementById("personal").innerHTML="<span id='username'>"+appellation+"</span>";
function down(){
    let i=document.getElementById("board");
    i.scrollTo(0,i.scrollHeight);
}
socket.onmessage=event=>{
    let word=event.data.toString();
    word=JSON.parse(word);
    if(word.type=="num"){
        if(word.content=="1"){
            document.getElementById("num").innerText=word.content.toString()+" person";
        }
        else{
            document.getElementById("num").innerText=word.content.toString()+"people";
        }
    }
    else if(word.type=="text"){
        let sentence=word.content;
        let call=word.name;
        if(confirmname==word.name&&confirmcontent==word.content){
            document.getElementById("board").innerHTML+="<div class='myzone'><span class='name'>"+call+"</span><br><div class='message'><span class='words'>"+sentence+"</span></div><br><br></div>";
            down();
            confirmname="";
            confirmcontent="";
        }
        else{
            document.getElementById("board").innerHTML+="<div class='otherzone'><span class='name'>"+call+"</span><br><div class='message'><span class='words'>"+sentence+"</span></div><br><br></div>";
            let i=document.getElementById("board");
            let h=i.scrollHeight;
            if(i.scrollTop+h>=i.scrollHeight){
                down();
            }
        }
    }
    else if(word.type=="photo"){
        let src=word.content;
        let call=word.name;
        if(confirmname==word.name&&confirmcontent==word.content){
            document.getElementById("board").innerHTML+="<div class='myzone'><span class='name'>"+call+"</span><br><div class='message'><br><img src='"+src+"' class='photo'><br><br></div><br><br></div>";
            down();
            confirmname="";
            confirmcontent="";
        }
        else{
            document.getElementById("board").innerHTML+="<div class='otherzone'><span class='name'>"+call+"</span><br><div class='message'><br><img src='"+src+"' class='photo'><br><br></div><br><br></div>";
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
    let photo=document.getElementById("photo");
    let video=document.getElementById("video");
    let file=document.getElementById("file");
    if(type.value.trim()!=""||photo.value!=""||video.value!=""||file.value!=""){
        if(video.value!=""){
            video.value="";
        }
        if(file.value!=""){
            file.value="";
        }
        if(photo.value!=""){
            let reader=new FileReader();
            let photos=new ArrayBuffer();
            reader.onload=e=>{
                photos=e.target.result;
                let message={
                    "type":"photo",
                    "name":appellation,
                    "content":photos
                };
                socket.send(JSON.stringify(message));
                confirmname=message.name;
                confirmcontent=message.content;
                photo.value="";
            };
            reader.readAsDataURL(photo.files[0]);
        }
        if(type.value!=""){
            let message={
                "type":"text",
                "name":appellation,
                "content":type.value
            };
            socket.send(JSON.stringify(message));
            confirmname=message.name;
            confirmcontent=message.content;
            type.value="";
        }
    }
}
function delet(){
    let photo=document.getElementById("photo");
    let video=document.getElementById("video");
    let file=document.getElementById("file");
    photo.value="";
    video.value="";
    file.value="";
    light();
}
window.addEventListener("keypress",press=>{
    if(press.key=="Enter"){
        send();
    }
},false);
window.addEventListener("click",mouse=>{
    let mousey=mouse.clientX-25;
    let mousex=mouse.clientY-25;
    document.getElementById("fireboard").style.top=mousex.toString()+"px";
    document.getElementById("fireboard").style.left=mousey.toString()+"px";
    document.getElementById("firework").style.opacity="1";
    let o=1.0,s=5.0;
    let time=window.setInterval(()=>{
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
document.getElementById("type").addEventListener("focus",()=>{
    typefocus=true;
    color();
});
document.getElementById("type").addEventListener("blur",()=>{
    typefocus=false;
});
function color(){
    let h=0;
    let focustime=window.setInterval(()=>{
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
function light(){
    document.getElementById("type").focus();
}