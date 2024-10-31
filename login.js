function start(){
    const name=document.getElementById("username");
    if(name.value.trim()==""){
        alert("Username can't be empty!");
    }
    else{
        document.cookie="name="+name.value.trim();
        location.href="message.html";
    }
}