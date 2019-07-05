// main script file 

const type = {
    a : "pot-flower",
    b : "branch-flower"
}

let pottedFlowersCollection = [];
let branchFlowersCollection = [];
let page = 0;
let currentCollection = [];

$("#flowers-menu, .other-links").on("click", async function(event){
    event.preventDefault();
    currentCollection = [];
    let typeChosen = event.target.name;
    HideElements();
    if(currentCollection.length === 0){
        $("#show-flowers").append(`
        <img src="./img/spinner.gif" alt="loading" />`);      
    }    
    if ((typeChosen === type.a) && (pottedFlowersCollection.length === 0)){
        pottedFlowersCollection = await flowerServices.getFlowersData(typeChosen);
        flowerServices.displayFlowers(flowerServices.pageData(pottedFlowersCollection)[0].flowersToShow, page);
        currentCollection = pottedFlowersCollection;
    }
    if ((typeChosen === type.b) && (branchFlowersCollection.length === 0)){
        branchFlowersCollection = await flowerServices.getFlowersData(typeChosen);
        flowerServices.displayFlowers(flowerServices.pageData(branchFlowersCollection)[0].flowersToShow, page);
        currentCollection = branchFlowersCollection;
    }
    if(typeChosen === type.a ){
        flowerServices.displayFlowers(flowerServices.pageData(pottedFlowersCollection)[0].flowersToShow, page);
        currentCollection = pottedFlowersCollection;
    }else{
        flowerServices.displayFlowers(flowerServices.pageData(branchFlowersCollection)[0].flowersToShow, page);
        currentCollection = branchFlowersCollection;
    }
    $("#nav-filter").css("display", "block");
    $("#my-pag").css("display", "block");

    //paging
    $(".page-item").on("click", function(e) {
        // e.preventDefault();
        let counter;
        if (e.target.text == "Next") {
            page++;
            counter = page;
            if (page >= 3) {
                $("#showPage").text(`No next page!`);
                e.target.css("pointer-events", "none")
            }
            flowerServices.displayFlowers(flowerServices.pageData(currentCollection)[counter].flowersToShow, page);
        } else {
            page--;
            counter = page;
            if (page <= 0) {
                page = 0;
            }          
            flowerServices.displayFlowers(flowerServices.pageData(currentCollection)[counter].flowersToShow, page);
        }        
    });

    // sorting 
    $("#sorting-menu").click(function(event){
        event.preventDefault();
        let typeOfSorting = event.target.textContent;
        flowerServices.displayFlowers(flowerServices.pageData(flowerServices.sortData(currentCollection, typeOfSorting))[page].flowersToShow, page);
    });

    //search
    $("#search-btn").keyup(function(event){
        event.preventDefault();
        let userInputString = $("#search-btn").val();
        let mapCollection = currentCollection
            .filter(x => x.name.toLowerCase().includes(userInputString));
        flowerServices.displayFlowers(flowerServices.pageData(mapCollection)[page].flowersToShow, page); 
        currentCollection = mapCollection;    
    });
    $('#search-btn').val('');
})

$("#home-btn, #home-too").click(function(){
    HideElements();
    $(".main-spaces").css("display", "block");
    $('#my-pag').css('display', 'none');

});

$("#about-btn, #other-about-us").click(function(e){
    e.preventDefault();
    HideElements();
    $('#about-us').css("display", "block");
});

$("#customer-btn").click(function(){
    HideElements();
    $('#customer-service').css("display", "block");
});

$("#cart").click(function(){
    HideElements();
    $('#my-cart').css("display", "block");
    $('#print-total').css("display", "block");
    $('#price').css("display", "block");

    if(shoppingCart.length === 0){
        $('#my-cart').css("display", "none");
        $('#print-total').css("display", "none");
        $('#price02').text(`Your shopping cart is empty!`);
    }else{
        cartServices.printCart(shoppingCart, $("#cart-table"));
        let priceToPay = cartServices.totalPrice(shoppingCart);
        $('#price02').text(``);    
        $('#price').text(`${priceToPay}`)    
    }
    
    //remove btn
    let removeBtn = $('.remove');
        for (let a = 0; a < removeBtn.length; a++) {
            removeBtn[a].addEventListener('click', (e) => {
                e.target.parentNode.parentNode.remove(e.target.parentNode);
                    if(shoppingCart.length === 1){

                        let newShoppingCart = shoppingCart
                        .filter(product => product.item.name != shoppingCart[a].item.name)
                
                        let priceToPay02 = cartServices.totalPrice(newShoppingCart);
                        $("#price").text("");
                        $("#price").text(`${priceToPay02}`);
                        shoppingCart = newShoppingCart;
                        $('#cart').html(`<img src="img/cart-02.png" alt="picture of a shopping cart" />&nbsp; ${shoppingCart.length}`); 
                        
                        $('#my-cart').css("display", "none");
                        $('#print-total').css("display", "none");
                        $('#price').text(`Your shopping cart is empty!`);
                        $('#cart').html(`<img src="img/cart-02.png" alt="picture of a shopping cart" />&nbsp; 0`);  
                    }
                                
                    let newShoppingCart = shoppingCart
                            .filter(product => product.item.name != shoppingCart[a].item.name)
            
                    let priceToPay02 = cartServices.totalPrice(newShoppingCart);
                    $("#price").text("");
                    $("#price").text(`${priceToPay02}`);
                    shoppingCart = newShoppingCart;
                    $('#cart').html(`<img src="img/cart-02.png" alt="picture of a shopping cart" />&nbsp; ${shoppingCart.length}`);                 
            }, false);
        };
    $('#order').click(function () {
        $('#order-form').css("display", "block");
    });
    $('#pay').click(function(){
        cartServices.pay();
    })
});

HideElements = () => {
    $(".main-spaces").css("display", "none");
    $("#nav-filter").css("display", "none");
    $(".my-pagination").css("display", "none");
    $('#my-cart').css("display", "none");
    $('#print-total').css("display", "none");
    $('#about-us').css("display", "none");
    $('#customer-service').css("display", "none");
    $('#price').css("display", "none");
    $("#show-flowers").html("");
    $('#order-form').css("display", "none");
    $('#my-pag').css('display', 'none');
}