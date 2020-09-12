var content = []

getJSONData(PRODUCTS_URL).then(function(resultObj){//Fetch para capturar la URL productos y encontrar el array de productos relacionados
    if (resultObj.status === "ok")
    {
        let content1 = resultObj.data;
        content = content1

    }
});

const form = document.querySelector("#search-bar");
const btn = document.querySelector("#search-button");
const result = document.querySelector("#cat-list-container");

const filter = ()=> {
    result.innerHTML = "";
    const text = form.value.toLowerCase();

    for (i of content){
        let name = i.name.toLowerCase();
        if (name.indexOf(text) !== -1){
        result.innerHTML += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + i.imgSrc + `" alt="` + i.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ i.name +`</h4>
                            <small class="text-muted">` + "Vendidos: " + i.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + i.description + `</p>
                        <p class="mb-1">` + "Precio: " + i.cost + " " + i.currency + `</p>
                    </div>
                </div>
            </a>`
            
        }
    }

    if(result.innerHTML === ""){
        result.innerHTML += `<h4 class="mb-1">`+ "Producto no encontrado..."+`</h4>`
    }
}


btn.addEventListener("click", filter);
form.addEventListener("keyup", filter);

filter();