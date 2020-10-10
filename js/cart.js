var articles = {}; //Declaro el objeto que contiene el array luego de hacer un Fetch
var delivery = 0;



function showCart(element){//Funcion que recibe un objeto y luego crea el contenido en el HTML con los datos obtenidos
    let content = ``;
    for (let i = 0; i < element.length; i++) {
        var article = element[i];
        var subtotal = article.unitCost*article.count;
        var artId = 'ART' + i;
        element[i].artId = artId;

        content+= ` <dl class="row">
        <dd class="col-sm-8" id="img-1">
        <img class="img-thumbnail img-responsive" src="${article.src}" alt="${article.name}>
        </dd>
        <dd class="col-sm-8" id="price-1">
          <p style="text-decoration: solid; font-weight: bolder;"> Precio:  ${article.unitCost}</p>
        </dd>
        <dd class="col-sm-8" id="product-1">
        <p style="text-decoration: solid; font-weight: bolder;">Artículo: ${article.name}</p>
        </dd>
        
        <dd class="col-sm-8" id="currency-1">
        <p style="text-decoration: solid; font-weight: bolder;">Moneda: ${article.currency}</p>
        </dd>
        <dd class="col-sm-8" id="count-1">
        <p style="text-decoration: solid; font-weight: bold;">Cantidad: <input class="form-control" min="1" name="quantity" value="${article.count}" type="number" id="${artId}" onchange="totalCounts(event);"></span></p>
        </dd>
        <button class="btn btn-primary btn-lg btn-block" onclick="deleteArt();"> Eliminar Artículo </button>
      </dl>
         `
        var shop = document.getElementById("cart-info");
        shop.innerHTML = content;
        localStorage.setItem("Badge", articles.length);
        var badge = localStorage.getItem("Badge")
        document.getElementById("badge").innerHTML = badge;
        
        
        
    } 
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


function deletArt(art) {
    articles.splice(art, 1)
    
}




function finishBuy() {
    location.href = "cart-succesfully.html";
    
}

function totalCounts(event){

    var id = event.target.id;
    var artSum = 0;

    for (let i = 0; i < articles.length; i++) {
        if (id === articles[i].artId) {
            console.log(articles[i].unitCost);
            var cost = articles[i].unitCost;
            artSum = event.target.value*cost;
            console.log(artSum)

            
            articles[i].count = event.target.value
            
            
        }
    } 

    showTotal(articles)
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