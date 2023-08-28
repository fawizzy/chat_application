$(function(){
    $.ajax({
        type: "GET",
        url: `http://localhost:5000/allusers`,
        contentType: 'application/json'
    }).done((data)=>{
        console.log(data) 
        let users = data;
        let messageHeader = $("#messageheader")
        
        users.forEach(user => {
            $("#user_list").append(`
                <li style="cursor:pointer;">
                    <div class="card border-0">
                        <div style="text-decoration: none" class="user_list" user_id="${user._id}" username="${user.username}">

                        <div class="card-body"><span class="text-nowrap text-truncate text-uppercase text-white float-end p-1 text-center" style="width: 2rem;height: 2rem;border-radius: 15px;background: #00db5f;">1</span>
                            <h4 class="text-nowrap text-truncate card-title">`+ user.username + `</h4>
                        </div>
                        </div>
                    </div>
                </li>`)
            });

            $("#user_list").on("click",".user_list",(event)=>{
                const clickedItem = event.currentTarget
                const user_id = $(clickedItem).attr("user_id")
                const username = $(clickedItem).attr("username")
                messageHeader.text(username)
                window.selecteduser = user_id
                
            })
    }).fail ((err)=>{
        console.log(err)
    }).always(()=>{
    }) 
})