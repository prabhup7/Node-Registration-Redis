
//CMPE 280 Assignment 5 - RedisCache And Registration Page Integration
//Xiaoli Jinag 009390901

var form = document.register_form;
var pro_bar = document.getElementById("psw_progress");
pro_bar.style.display = "none"; //hide progress bar

/****************** member object in reg_user library ************************/
var reg_memeber = reg_user.member;
var password ="";

//listen to password input
form.password.onkeyup = function () {

    if(this.value.length > 24) alert("Maximun length of password is 24 characters");
    else {
        //check strength, show progress bar
        var strength = checkStrength(this.value);
        document.getElementById("pro_text").innerHTML = strength;

        switch (strength) {
            case "Weak":
                pro_bar.value = 10; break;
            case "Normal":
                pro_bar.value = 30; break;
            case "Medium":
                pro_bar.value = 50; break;
            case "Strong":
                pro_bar.value = 100; break;
        }
        pro_bar.style.display = "block"; //show progress bar
    }

    /****************** update pswStrength in reg_member with reg_user library ************************/
    //reg_memeber.pswStrength = document.getElementById("pro_text").innerHTML;

};

function checkStrength(psw) {
    var uppercase = 0, lowercase = 0, spec =0;
    for(var i = 0; i < psw.length; i++) {
        if(psw.charAt(i) >= 'a' && psw.charAt(i) <= 'z') lowercase++;
        else if(psw.charAt(i) >= 'A' && psw.charAt(i) <= 'Z') uppercase++;
        else spec++;
    }

    //If password contains 3 Uppercase letters, 2 Lowercase letters
    //and 2 special characters, then Password strength is Normal
    if(uppercase >= 3 && lowercase >=2 && spec == 2) return "Normal";

    //If password contains 3 Uppercase letters, 2 Lowercase letters
    // and 3-5 special characters, then Password strength is Medium
    if(uppercase >= 3 && lowercase >=2 && spec >=3 && spec <= 5) return "Medium";

    //If password contains 3 Uppercase letters, 2 Lowercase letters
    // and greater than 5 special characters, then Password strength is Strong
    if(uppercase >= 3 && lowercase >=2 && spec > 5) return "Strong";

    //If password contains less than 3 Uppercase letters, less than 2 Lowercase letters
    //and less than 2 special characters, then Password strength is Weak
    return "Weak";
}

//listen to out of focus on password input
form.password.onblur = function () {
    pro_bar.style.display = "none";
    document.getElementById("pro_text").innerHTML = "";
    password = this.value;
};

//check if confirmed password is same as the latter one
form.psw_conf.onchange = function () {
    if(this.value != password) {
        this.value = "";
        alert("Must be same as password!!");
    }
};

/****************** handle data with reg_user library ************************/
form.onsubmit = function (e) {
    e.preventDefault();

    this.psw_conf.disabled = true; //disable the input of psw_conf, not sending with POST request

    //validate email & phone
    //console.log(reg_memeber);
    if(reg_memeber.phone != "" && !reg_memeber.isPhoneNumberFormatValid()) {
        alert("Invalid phone number!");
        return
    }
    if(reg_memeber.email != "" && !reg_memeber.isValidEmail()) {
        alert("Invalid email address!");
        return;
    }

    //store form data to member object
    reg_memeber.fname = this.fname.value;
    reg_memeber.lname = this.lname.value;
    reg_memeber.email = this.email.value;
    //reg_memeber.password = this.password.value;
    reg_memeber.dob = this.dob.value;
    reg_memeber.dob_time = this.dob_time.value;
    reg_memeber.dob_local = this.dob_local.value;
    //reg_memeber.ssn = this.ssn.value;
    reg_memeber.phone = this.phone.value;
    //reg_memeber.credit_card = this.credit_card.value;

    //hashing with md5, only for sensetive data: password, ssn and credit card number
    //if(this.fname.value != "") reg_memeber.fname = md5(this.fname.value);
    //if(this.lname.value != "") reg_memeber.lname = md5(this.lname.value);
    //if(this.email.value != "") reg_memeber.email = md5(this.email.value);
    if(this.password.value != "") reg_memeber.password = md5(this.password.value);
    //if(this.dob.value != "") reg_memeber.dob = md5(this.dob.value);
    //if(this.dob_time.value != "") reg_memeber.dob_time = md5(this.dob_time.value);
    //if(this.dob_local.value != "") reg_memeber.dob_local = md5(this.dob_local.value);
    if(this.ssn.value != "") reg_memeber.ssn = md5(this.ssn.value);
    //if(this.phone.value != "") reg_memeber.phone = md5(this.phone.value);
    if(this.credit_card.value != "") reg_memeber.credit_card = md5(this.credit_card.value);

    var jsondata = JSON.parse(reg_memeber.toJSONString());

    //ajax call post to server
    $.ajax({
        url: "/registration",
        type: "POST",
        data: jsondata,
        success: function(response){
            console.log(response);
            alert("Create user (key:" + response.email + ") succeed!!");
            window.location.replace("/users");
        }
    });

};

/****************** handle event with reg_user library ************************/
window.addEventListener('load', function() {

    window.addEventListener("offline", function(e) {
        alert("offline");
        reg_user.netOffline(); //call reg_user offline handler
    }, false);

    window.addEventListener("online", function(e) {
        alert("online");
        reg_user.netOnline(); //call reg_user online handler
    }, false);

});


/****************** Drag and drop handler ************************/
var num_img = 0;
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    num_img++;
    if(num_img == 3) {
        form.submitBtn.disabled = false;
    }
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

