$(function(){
    
    $("button").on("click",function(event){
        event.preventDefault()
        let x = $("form").serializeArray()
        $.ajax({
            type: "POST",
            url: `http://localhost:5000/login`,
            data: JSON.stringify({
                email: x[0].value,
                password: x[1].value
            }),
            contentType: 'application/json'
        }).done((data)=>{
            console.log(data)
            window.location.replace("../pages/chat.html")
        }).fail ((err)=>{
            console.log(err)
        }).always(()=>{
        })     
        
    })
 })