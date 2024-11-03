function start(){
    const name=document.getElementById("username");
    if(name.value.trim()==""){
        let o=0;
        let time=window.setInterval(function(){
            document.getElementById("empty").style.opacity=o.toString();
            o+=0.01;
            if(o>=1){
                window.clearInterval(time);
            }
        },1);
        window.setTimeout(function(){
            o=1;
            let time=window.setInterval(function(){
                document.getElementById("empty").style.opacity=o.toString();
                o-=0.01;
                if(o<=0){
                    window.clearInterval(time);
                }
            },1);
        },2000);
    }
    else{
        document.cookie="name="+name.value.trim();
        location.href="message.html";
    }
}
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
window.addEventListener("keypress",function(press){
    if(press.key=="Enter"){
        start();
    }
},false);