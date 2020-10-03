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
        <p style="text-decoration: solid; font-weight: bolder;">Cantidad: <span><input class="quantity" min="1" name="quantity" value="${article.count}" type="number" id="${element.length}"></span></p>
        </dd>
      </dl>
         `
        var shop = document.getElementById("cart-info");
        shop.innerHTML = content;
        
    } 
}


function showTotal(element){//Funcion que recibe un objeto como parametro y se encarga de calcular el Precio Total y de convertir la moneda en caso necesario
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
    
    
    
    document.getElementById("total-price").innerHTML = total + " USD"
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

    document.getElementById("delivery1").addEventListener("change", function(){
        delivery = 0.15;
        showTotal(articles);

    });
    
    
    document.getElementById("delivery2").addEventListener("change", function(){
        delivery = 0.07;
        showTotal(articles);

    });

    document.getElementById("delivery3").addEventListener("change", function(){
        total =  total*0.05;
        showTotal(articles);

    });
});