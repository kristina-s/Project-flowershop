// service functions 

//variables
let showPageFlowers = [];
let shoppingCart = [];

const config = {
    baseUrl : "https://raw.githubusercontent.com/kristina-s/Frontend-project-resourses/master/json/",
}
let typeOfSort = {
    nameAsc : 'Name - ASC',
    nameDesc : 'Name - DESC',
    priceAsc : 'Price - ASC',
    priceDesc : 'Price - DESC'
}
let typeOfLight = {
    sunHigh: 'sunlight',
    sunMedium: 'half-shadow',
    sunLow: 'shadow'
}
let typeOfHumidity = {
    humidityHigh: 'high',
    humidityMedium: 'medium',
    humidityLow: 'low'
}

let flowerServices = {

    getFlowersData : async function(type){
        const url = `${config.baseUrl}${type}.json`;
        const response = await fetch(url);
        const result = await response.json();       
        // map the results into objects 
        const flowers = result.map(flower => 
            new Flower (flower.id, flower.name, flower.latinName, flower.titleImage, setBucketIcon(flower.humidity), setSunIcon(flower.light) , flower.description, flower.bloomTime, flower.price, flower.images) 
        );
        return flowers;
    },

    //map array to have pages and elements for each page
    pageData : function(array) {
        showPageFlowers = [];
        for (let i = 0; i < array.length / 9; i++) {
            showPageFlowers.push({
                page: i,
                flowersToShow: array.slice(i * 9, (i + 1) * 9)
        });
        };
        return showPageFlowers;
    },

    // display flowers by 9 on a page
    displayFlowers : function (array, page){
        $("#show-flowers").html("");
       
        for (const flower of array) {
        $("#show-flowers").append(`           
                <div class="card">
                    <img class="card-img-top" src="${flower.titleImage}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${flower.name}</h5>
                        <p class="card-text"><i>${flower.latinName}</i></p>
                        <p class="card-text"><i>${flower.price} MKD</i></p>
                        <div class="d-flex justify-content-center">
                            <a href="#" class="btn btn-secondary details-btn">More Details</a>
                            <input type="number" class="quantity-input" placeholder="quantity" />
                            <a href="#" class="btn btn-secondary cart-btn">Add to cart</a>
                        </div>
                    </div>
                </div>
            <br/>
        `);
        };
        //more details buttons
        let detailsBtn = $('.details-btn');
        for (let a = 0; a < detailsBtn.length; a++) {
            detailsBtn[a].addEventListener('click', (e) => {
                let flowerToShow = currentCollection[(page*9)+a];
                flowerServices.displayOneFlowerWithDetails(flowerToShow, $("#show-flowers"));
                $("#my-pag").css("display", "none");
            });
        };
        //add to cart buttons
        let cartBtn = $('.cart-btn');
        for(let a = 0; a < cartBtn.length; a++){
            cartBtn[a].addEventListener('click', (e) => {
                let flowerToAdd = array[(page*9)+a];
                let quantityToAdd = 0;
                let quantityToAddInput = $('.quantity-input')[a].value;
                let questionValue = parseInt(quantityToAddInput);
                if(questionValue <= 0){
                    alert("You have entered an invalid number!");
                }
                else{
                    quantityToAdd = questionValue;
                }                           
                var foundFlower = shoppingCart.find( function (element){
                    return element.item.name === flowerToAdd.name
                });
                if(foundFlower != undefined){
                    index = shoppingCart.findIndex(function(element){
                        return element.item.name === flowerToAdd.name
                    });
                    shoppingCart[index].quantity += quantityToAdd;
                }
                else{
                    cart = cartServices.addToCart(quantityToAdd, flowerToAdd);
                    shoppingCart.push(...cart);
                    $('#cart').html(`<img src="img/cart-02.png" alt="picture of a shopping cart" />&nbsp; ${shoppingCart.length}`);  
                }
                $('.quantity-input').val('');
            });           
        }  
    },

    displayOneFlowerWithDetails : function(flower, element){
        element.html("");
        element.append(`
            <div class="d-flex justify-content-around align-items-center col-md-12 one-flower-big-card">
                <div class="one-flower-display-image">
                    <img src="${flower.titleImage}" class="card-img-flower-to-show" alt="image of a flower">
                </div>

                <div>
                    <div class="card-body">
                        <h5 class="card-title">${flower.name}&nbsp; "<i>${flower.latinName}</i>"</h5>
                        <p class="card-text">${flower.description}</p>
                        <p class="card-text">Bloom time: ${flower.bloomTime}</p>
                        <p class="card-text">Humidity: <img src=${flower.humidity} alt="picture of sunlight" width="60" height="60" /></p>
                        <p class="card-text">Light needed: <img src=${flower.light} alt="picture of sunlight" width="60" height="60" /></p>
                    </div>
                    <h2>More images:</h2>
                    <div class="addMoreImages"> 
                    </div>
                </div>
                <div>
                    <input type="number" class="quantity-input02" />
                    <a href="#" class="btn btn-secondary cart-btn02">Add to cart</a>
                    <button class="back-to-menu btn btn-secondary">Back</button>
                </div>

            </div>
        `);
        for (let index = 0; index < flower.images.length; index++) {
            $(".addMoreImages").append(`
                <img src="${flower.images[index]}" alt="pictures of flowers" class="plus-image thumbnail" />
           
            `);
        };
        //add to cart buttons
        let cartBtn = $('.cart-btn02');
        for(let a = 0; a < cartBtn.length; a++){
            cartBtn[a].addEventListener('click', (e) => {
                let flowerToAdd = flower;
                let quantityToAddInput = $('.quantity-input02')[a].value;
                let quantityToAdd = parseInt(quantityToAddInput);

                var foundFlower = shoppingCart.find( function (element){
                    return element.item.name === flowerToAdd.name
                });
                console.log(foundFlower);
                if(foundFlower != undefined){
                    index = shoppingCart.findIndex(function(element){
                        return element.item.name === flowerToAdd.name
                    });
                    shoppingCart[index].quantity += quantityToAdd;
                }
                else{
                    cart = cartServices.addToCart(quantityToAdd, flowerToAdd);

                    shoppingCart.push(...cart);
                    $('#cart').html(`<img src="img/cart-02.png" alt="picture of a shopping cart" />&nbsp; ${shoppingCart.length}`);  
                }              
            });          
        }
        //back to menu
        let backBtn = $('.back-to-menu');
        for(let i=0; i<backBtn.length; i++){
            backBtn[i].addEventListener('click', (e) => {
                flowerServices.displayFlowers(flowerServices.pageData(currentCollection)[page].flowersToShow, page);
                $('#my-pag').css('display', 'block');
            })
        }

    },
    //sorting function
    sortData : function (array, target) {
        switch (target) {
            case typeOfSort.nameAsc:
                array.sort((f, s) => f.name.localeCompare(s.name));
                return array;
            case typeOfSort.nameDesc:
                array.sort((f, s) => s.name.localeCompare(f.name))
                return array;
            case typeOfSort.priceAsc:
                array.sort((f, s) => f.price - s.price);
                return array;
            case typeOfSort.priceDesc:
                array.sort((f, s) => s.price - f.price);
                return array;
            default:
                break;
        }
    }
}
const setSunIcon = (type) => {
    switch(type){
        case typeOfLight.sunHigh:
            return './img/small-images/sun-01.png';
        case typeOfLight.sunMedium:
            return './img/small-images/sun-02.png';
        case typeOfLight.sunLow:
            return './img/small-images/sun-03.png';    
        default:
            break;
    }
}
const setBucketIcon = (type) => {
    switch(type){
        case typeOfHumidity.humidityHigh:
            return './img/small-images/bucket-01.png';
        case typeOfHumidity.humidityMedium:
            return './img/small-images/bucket-02.png';
        case typeOfHumidity.humidityLow:
            return './img/small-images/bucket-03.png';   
        default:
            break;   
    }
}
