var product = {};
var comment = [];
var newComment = {}

 function showImagesGallery(array){//Muestro las imagenes del Json en forma de galeria

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>

        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

/*function showRelatedProducts(array){//Muestro los productos relacionados 

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        var relatedProduct = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + relatedProduct.imgSrc + `" alt="">
                <h4 class="mb-1">`+ relatedProduct.name +`</h4>
                <p class="mb-1">` + relatedProduct.description + `</p>
            </div>
        </div>
        `

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
}*/

function showComments(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let comment = array[i];

    htmlContentToAppend += `
    
<div class="container">
  <div class="list-group">
    <div class="list-group-item">
      <p class="list-group-item-text">Usuario: ${comment.user} </p>
      <p class="list-group-item-text">Fecha: ${comment.dateTime}</p>
      <p class="list-group-item-text">Comentario: ${comment.description}</p>
      <p class="list-group-item-text">Calificación: ${comment.score}</p>
    </div>
  </div>
</div>
<br>

        `;

    document.getElementById("comments").innerHTML = htmlContentToAppend;
  }
}

function addComment() {//Funcion que toma la informacion del form y la añade al array de comentarios
    var newComment = {}
    var add = document.getElementById("addcomment")
    var username = document.getElementById("username").value;
    var description = document.getElementById("review").value;
    var rating = document.getElementById("rating-value").value

    var date = new Date();
    var day = date.getDate();
    var dayOk = (day < 10) ? '0' + day : day;
    var month = date.getMonth() + 1;
    var monthOk = (month < 10) ? '0' + month : month;
    var hour = date.getHours() + `:` + date.getMinutes() + `:` + date.getSeconds();
    var dateOk = date.getFullYear() + `/` + monthOk + `/` + dayOk;

    newComment.user = username;
    newComment.description = description;
    newComment.dateTime = dateOk + ` ` + hour;
    newComment.score = rating;
    
    comment.push(newComment);
    showComments(comment)

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){//Fecth que carga los comentarios predefinidos en el JSon
        if (resultObj.status === "ok")
        {
            comment = resultObj.data;

            //Muestro las imagenes en forma de galería
            showComments(comment);

        }
    });


    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){//Fetch que carga la informacion de los productos y la muestra en el HTML
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("soldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productPriceHTML = document.getElementById("productPrice");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML ='<a href="category-info.html">' + product.category + '</a>';
            productPriceHTML.innerHTML = product.currency + " " + product.cost;
           
            

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);

            getJSONData(PRODUCTS_URL).then(function(resultObj){//Fetch para capturar la URL productos y encontrar el array de productos relacionados
                if (resultObj.status === "ok")
                {
                    let relatedProduct = resultObj.data;

                    let content = "";
                    product.relatedProducts.forEach(function(productFinder) {
                        let productCounter = relatedProduct[productFinder];
                        content += `
                        <div class="col-lg-3 col-md-4 col-6">
                            <div class="d-block mb-4 h-100">
                                <img class="img-fluid img-thumbnail" src="` + productCounter.imgSrc + `" alt="">
                                <h4 class="mb-1">`+ productCounter.name +`</h4>
                                <p class="mb-1">` + productCounter.description + `</p>
                                <p> Ver Categoría: <a href="category-info.html">`+ product.category +` </a> </p>

                            </div>
                        </div>
                        `
                
                        document.getElementById("relatedProducts").innerHTML = content;

                    })
                }
            });
        }

        
    });


