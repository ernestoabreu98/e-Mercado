var buy = {}
var data = {}
var savedData = {}


function showBuy(element){

    let htmlContentToAppend = "";
    for(let i = 0; i < element.length; i++){
        let buy = element[i];


            htmlContentToAppend += `
            <div class="col-lg-5">
                <div class="row">
                    <div class="col-lg-6">
                        <img src="` + buy.src + `" alt="` + buy.name + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class=" w-100 justify-content-between">
                            <h4 class="mb-1">`+ buy.name +`</h4>
                        </div>
                        <p class="mb-1">` + "Precio: " + buy.unitCost + " " + buy.currency + `</p>
                    </div>
                </div>
            </a>
            </div>
            `
        

        document.getElementById("buy-container").innerHTML = htmlContentToAppend;
    }
}



function saveData() {

var name = document.getElementById("name");
//var lastName = document.getElementById("lastName");
var age = document.getElementById("age");
var mail = document.getElementById("mail");
var phone = document.getElementById("phone");

var getName = document.getElementById("form-first-name").value;
//var getLastName = document.getElementById("form-last-name").value;
var getAge = document.getElementById("form-age").value;
var getMail = document.getElementById("form-email").value;
var getPhone = document.getElementById("form-subject").value;


data.name = getName;
//data.lastName = getLastName;
data.age = getAge;
data.mail = getMail;
data.phone = getPhone;
console.log(data)

localStorage.setItem('data', JSON.stringify(data));
savedData = localStorage.getItem('data');
data = JSON.parse(savedData)
console.log(savedData)

name.innerHTML = data.name
age.innerHTML = data.age;
mail.innerHTML = data.mail;
phone.innerHTML = data.phone;
    
}


function showData() {
var name = document.getElementById("name");
var age = document.getElementById("age");
var mail = document.getElementById("mail");
var phone = document.getElementById("phone");




let savedData = localStorage.getItem('data');

if (savedData == null) {
    data.name = "";
    
}else {
    data = JSON.parse(savedData)
console.log(savedData)

name.innerHTML = data.name
age.innerHTML = data.age;
mail.innerHTML = data.mail;
phone.innerHTML = data.phone;
    
}


    
    
}

$(document).ready(function() {

    
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
});




document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(CART_INFO_URL1).then(function(resultObj){//Fetch a una URL que almacena los datos en el objeto "articles", previamente declarado
        if (resultObj.status === "ok") {
    
            buy = resultObj.data.articles;
            showBuy(buy);
            showData();
            
            
       
        }

        

    })

   
    
});