var articles = {}; //Declaro el objeto que contiene el array luego de hacer un Fetch
var delivery = 0;



function showCart(element){//Funcion que recibe un objeto y luego crea el contenido en el HTML con los datos obtenidos
    let content = ``;
    for (let i = 0; i < element.length; i++) {
        var article = element[i];
        var subtotal = article.unitCost*article.count;

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
        <p style="text-decoration: solid; font-weight: bold;">Cantidad: <input class="form-control" min="1" name="quantity" value="${article.count}" type="number" id="${element.length}"></span></p>
        </dd>
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

    document.getElementById("send-price").innerHTML = new Intl.NumberFormat("de-DE").format(((total*deliveryPrice)/40).toFixed("2")) + " USD"

    document.getElementById("subtotal-price").innerHTML = total + " USD"
    total += (total*deliveryPrice);

    
    
    document.getElementById("total-price").innerHTML = total + " USD"
}


function shipp(event) {
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
            delivery = 0.07;
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





function finishBuy() {
    location.href = "cart-succesfully.html";
    
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

   // document.getElementById("finish-buy").addEventListener("click", finishBuy()) 
    
});