$(function(){
    
    $("button").on("click",function(event){
        event.preventDefault()
        let email = document.getElementById("email")
        let password = document.getElementById("password")
        let verifyPassword = document.getElementById("verifyPassword")
        let submitBtn = document.getElementById("submitBtn")
        let emailErrorMsg = document.getElementById('emailErrorMsg')
        let passwordErrorMsg = document.getElementById('passwordErrorMsg')
         
        let formError = false
        function displayErrorMsg(type, msg) {
            formError = true
            if(type == "email") {
                emailErrorMsg.style.display = "block"
                emailErrorMsg.innerHTML = msg
                submitBtn.disabled = false
            }
            else {
                passwordErrorMsg.style.display = "block"
                passwordErrorMsg.innerHTML = msg
                submitBtn.disabled = false
            }
        }

        function hideErrorMsg(type) {
            if(type == "email") {
                emailErrorMsg.style.display = "none"
                emailErrorMsg.innerHTML = ""
                submitBtn.disabled = false
                if(passwordErrorMsg.innerHTML == "")
                    submitBtn.disabled = false
            }
            else {
                passwordErrorMsg.style.display = "none"
                passwordErrorMsg.innerHTML = ""
                if(emailErrorMsg.innerHTML == "")
                    submitBtn.disabled = false
            }
        }
	
        

            // If password has no value, then it won't be changed and no error will be displayed
            if(password.value.length == 0 && verifyPassword.value.length == 0) hideErrorMsg("password")
            
            // If password has a value, then it will be checked. In this case the passwords don't match
            else if(password.value !== verifyPassword.value) displayErrorMsg("password", "Passwords do not match")
            
            // When the passwords match, we check the length
            else {
                // Check if the password has 8 characters or more
                if(password.value.length >= 8)
                    hideErrorMsg("password")
                else
                    displayErrorMsg("password", "Password must be at least 8 characters long")
            }
      
	
        
            if(password.value !== verifyPassword.value)
                displayErrorMsg("password", "Passwords do not match")
            else {
                // Check if the password has 8 characters or more
                if(password.value.length >= 8)
                    hideErrorMsg("password")
                else
                    displayErrorMsg("password", "Password must be at least 8 characters long")
            }
    

       
            // Check if the email is valid using a regular expression (string@string.string)
            if(email.value.match(/^[^@]+@[^@]+\.[^@]+$/))
                hideErrorMsg("email")
            else
                displayErrorMsg("email", "Invalid email")
        
        
        if (!formError){
            let x = $("form").serializeArray()
            console.log(x)
            $.ajax({
                type: "POST",
                url: `http://localhost:5000/registeruser`,
                data: JSON.stringify({
                    username: x[0].value,
                    email: x[1].value,
                    password: x[2].value
                }),
                contentType: 'application/json'
            }).done((data)=>{
                console.log(data)
                window.location.replace("../index.html")
            }).fail ((err)=>{
                console.log(err)
            }).always(()=>{
            }) 
        }    
        
    })
 })