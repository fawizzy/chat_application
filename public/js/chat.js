$(function(){
    let cookie = getCookie("session_id")
    let socket = io({auth: {token: cookie}})
    var messages = []
    var users = {}

    socket.on("user_connected", (data)=>{
        for (id of data) {
            users[id] = []
        }
    })

    socket.on("private_message", ({from, content})=>{
        var from_message = $(`
        <li class="my-2">
            <div class="card border border-muted" style="width: 65%;border-top-left-radius: 0px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;background: rgba(52,58,64,0.05);">
                <div class="card-body text-center p-2">
                    <p class="text-start card-text" style="font-size: 1rem;">${content}</p>
                    <h6 class="text-muted card-subtitle text-end" style="font-size: .75rem;">Julio 22, 2021. 12:33 P.M.</h6>
                </div>
            </div>
        </li>
        `)
        users[from].push(from_message)
        $("#chats").empty()
        users[window.selecteduser].forEach((message)=>{
            $("#chats").append(message)
        })
    })


        

    
   
    window.selecteduser = ""


    var to_message = $(`
    <li class="d-flex justify-content-end my-2">
        <div class="card border border-muted" style="width: 65%;border-top-left-radius: 0px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;background: rgba(52,58,64,0.05);">
            <div class="card-body text-center p-2">
                <p class="text-start card-text" style="font-size: 1rem;">TO MESSAGE</p>
                <h6 class="text-muted card-subtitle text-end" style="font-size: .75rem;">Julio 22, 2021. 12:33 P.M.</h6>
            </div>
        </div>
    </li>
    `)


    
    
    $("#send").on("click",()=>{
        let message = $("#message")
        // console.log(message.val())
        let socketData = {
                          to : window.selecteduser,
                          content: message.val()}
        socket.emit("private_message", socketData)
        message.val("")
        var to_message = $(`
            <li class="d-flex justify-content-end my-2">
                <div class="card border border-muted" style="width: 65%;border-top-left-radius: 0px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;border-bottom-left-radius: 20px;background: rgba(52,58,64,0.05);">
                    <div class="card-body text-center p-2">
                        <p class="text-start card-text" style="font-size: 1rem;">${socketData["content"]}</p>
                        <h6 class="text-muted card-subtitle text-end" style="font-size: .75rem;">Julio 22, 2021. 12:33 P.M.</h6>
                    </div>
                </div>
            </li>
            `)
        users[socketData["to"]].push(to_message) 
        $("#chats").empty()
        users[window.selecteduser].forEach((message)=>{
            $("#chats").append(message)
        })
       
    })

    if (window.selecteduser === ""){
        $("#messageheader").empty()
        $("#textarea").addClass("d-none")

    }

    $("#user_list").on("click",".user_list",(event)=>{
        const clickedItem = event.currentTarget
        const user_id = $(clickedItem).attr("user_id")
        const username = $(clickedItem).attr("username")
        window.selecteduser = user_id
       // console.log(users[window.selecteduser])
       $("#textarea").removeClass("d-none")
       $("#chats").empty()
       users[window.selecteduser].forEach((message)=>{
        $("#chats").append(message)
        })

    })

    $("#logout").on("click", ()=>{
        setCookie("session_id", null, 0);
        window.location.replace("/")
    })

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

      function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
    
 })