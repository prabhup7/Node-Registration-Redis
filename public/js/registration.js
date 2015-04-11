
//CMPE 280 - Assignment 4 User Registration
//Xiaoli Jiang 009390901

//JS Registration library
window.reg_user = (function () {

    //lib constructor
    function Reg_user () {

        //member object in reg_user lib
        this.member = {
            fname:"",
            lname:"",
            email:"",
            ssn:"",
            phone:"",
            //url:"",
            password:"",
            //pswStrength:"",
            dob:"",
            dob_time:"",
            dob_local:"",
            credit_card:"",

            toJSONString: function () {
                return JSON.stringify(this);
            },

            readFromJSONString: function (text) {
                var obj = JSON.parse(text);
                console.log(obj);
                for(var prop in obj){
                    this[prop] = obj[prop];
                }
            },

            isPhoneNumberFormatValid: function () {
                //check phone number format
                if(this.phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) return true;
                else return false;

            },

            isValidEmail: function () {
                //check email format
                if(this.email.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm)) return true;
                else return false;
            }

        };
    }

    //lib function
    Reg_user.prototype = {

        //saveToLocalStorage()
        saveToLocalStorage: function (){
            for(var prop in this.member){
                localStorage[prop] = this.member[prop];
            }
        },

        //saveToSessionStorage()
        saveToSessionStorage: function (){
            //Store all the data that has been created so far in Session storage.
            for(var prop in this.member){
                sessionStorage[prop] = this.member[prop];
            }
        },

        //readFromLocalStorage()
        readFromLocalStorage: function (){
            for(var prop in this.member){
                this.member[prop] = localStorage[prop];
            }
        },

        //readFromSessionStorage()
        readFromSessionStorage: function (){
            for(var prop in this.member){
                this.member[prop] = sessionStorage[prop];
            }
        },

        //Define Even Handler for the Class - Net Offline or Online
        netOffline: function () {
            this.saveToLocalStorage()
        },
        netOnline: function () {
            localStorage.clear();
            this.saveToSessionStorage()
        }

    };

    //lib instance
    var reg_user = new Reg_user();

    return reg_user;
}());



