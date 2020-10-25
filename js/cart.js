var articles = {}; //Declaro el objeto que contiene el array luego de hacer un Fetch
var delivery = 0; //Variable que almacena el costo de cada envio
var subtotal = 0; //Variable que contiene el valor para mostrar el subtotal en tiempo real



function showCart(element){//Funcion que recibe un objeto y luego crea el contenido en el HTML con los datos obtenidos

    
    let content = ``;

    if (element.length == 0) {
      content += `
      <th scope="row">
       <td> <h3>El Carrito está vacío...</h3> <span><a href="products.html"> Agregar Productos</a></span> </td>
      </th>
      `
      
    } else {
    for (let i = 0; i < element.length; i++) {
        var article = element[i];
        var artId = 'ART' + i;
        var buttonID = "But" + i;
        element[i].artId = artId;
        subtotal = article.unitCost*article.count

        content+= `  <tr>
        <th scope="row">
          <img src="${article.src}" class="img-thumbnail" alt="${article.name}" width="200" height="200">
        </th>
        <td>
            <strong>${article.name}</strong>
        </td>
        <td></td>
        <td><strong>${article.unitCost}  ${article.currency}</strong></td>
        <td>
          <input type="number" value="${article.count}" aria-label="Search" class="form-control" style="width: 100px" id="${artId}" onchange="totalCounts(event);">
        </td>
        <td><strong id="subtotal-prices">${subtotal} ${article.currency}</strong></td>
        <td>
          <button type="button" class="btn" id="${buttonID}" title="Remove item" onclick="deletArt(articles, ${i});">Eliminar
          </button>
        </td>
      </tr>
      
         `

        }
        
        
        
    } 
    
    var shop = document.getElementById("cart-info");
        shop.innerHTML = content;
        localStorage.setItem("Badge", articles.length);
        var badge = localStorage.getItem("Badge")
        document.getElementById("badge").innerHTML = badge;
        document.getElementById("badge1").innerHTML = badge //Muestra los articulos del carrito
        

}


function showTotal(element, deliveryPrice){//Funcion que recibe un objeto como parametro y se encarga de calcular el Precio Total y de convertir la moneda en caso necesario
    if (!deliveryPrice){
        deliveryPrice = 0.05;
    }
    var total = 0;
    
    for (item of element) {
        let subtotal = item.unitCost*item.count
        if (item.currency == "UYU") {
            total += subtotal/40;
        }
        else {
            total += subtotal
        }
        

    }

    
  

   
    
    document.getElementById("send-price").innerHTML = new Intl.NumberFormat("de-DE").format((total*deliveryPrice).toFixed("2")) + " USD"
    
    document.getElementById("subtotal-price").innerHTML = total + " USD"
    total += (total*deliveryPrice);

    
    
    
    document.getElementById("total-price").innerHTML = total + " USD"
}


function shipp(event) {//Funcion que se encarga de modificar el valor de la variable "delivery" segun la opcion seleccionada en el HTML
    var value = event.target.value;
    //console.log(event);
    switch(value) {
        case "option1":
          console.log(value);
          delivery = 0.15;
          showTotal(articles, delivery)
          break;
        case "option2":
            console.log(value);
            delivery = .07;
            showTotal(articles, delivery)
          break;
        case "option3":
            console.log(value);
            delivery = 0.05;
            showTotal(articles, delivery)
          break;
        default:
          // code block
      }
      
    
}

function deletArt(element, position) {//Funcion que se encarga de eliminar los articulos seleccionados

      element.splice(position, 1);
      
    showTotal(element);
    showCart(element);

  }
      


function finishBuy() {
    location.href = "products.html";
    
}
function finishAll() {
    location.href = "cart-succesfully.html";
    
}

function totalCounts(event){//Función que toma las nuevas cantidades de articulos que el usuario selecciona y realiza el cálculo para mostrar el Subtotal y el Total

    var id = event.target.id;
    var artSum = 0;

    for (let i = 0; i < articles.length; i++) {
        if (id === articles[i].artId) {
            //console.log(articles[i].unitCost);
            var currency = articles[i].currency
            var cost = articles[i].unitCost;
            artSum = event.target.value*cost;
            //console.log(artSum)

            
            articles[i].count = event.target.value
            subtotal = event.target.value*cost 
            
        }
    } 
    
    showTotal(articles)
    showCart(articles)
}



function validate(){

  var clases = document.getElementsByClassName("validation");
  var closeBtn = document.getElementById("buttons1");
  var valid = false;

  for (let i = 0; i < clases.length; i++) {
    clases[i].classList.remove("is-invalid");
    clases[i].classList.remove("is-valid");

    if (clases[i].value === "" || clases[i].value === 0) {
      clases[i].classList.add("is-invalid");
      valid = false
      
    }
    else {
      clases[i].classList.add("is-valid");
      valid = true
    }
    
  }
   if (valid === false) {
     alert("Debe completar todos los campos")
     closeBtn.disabled = true
    
   } else {
     closeBtn.disabled = false
     document.getElementById("labelBtn1").style.display = "none"
  }
}

function validate1(){

  var clases = document.getElementsByClassName("validation1");
  var closeBtn = document.getElementById("buttons1");
  var valid = false;

  for (let i = 0; i < clases.length; i++) {
    clases[i].classList.remove("is-invalid");
    clases[i].classList.remove("is-valid");

    if (clases[i].value === "" || clases[i].value === 0) {
      clases[i].classList.add("is-invalid");
      valid = false
      
    }
    else {
      clases[i].classList.add("is-valid");
      valid = true
    }
    
  }
   if (valid === false) {
     alert("Debe completar todos los campos")
     closeBtn.disabled = true
    
   } else {
     closeBtn.disabled = false
     document.getElementById("labelBtn1").style.display = "none"
  }
}





 


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL1).then(function(resultObj){//Fetch a una URL que almacena los datos en el objeto "articles", previamente declarado
        if (resultObj.status === "ok") {
    
            articles = resultObj.data.articles;
            showCart(articles);
            showTotal(articles);
       
        }

        

    })

   
    
});