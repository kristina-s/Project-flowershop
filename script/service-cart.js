// service functions 


let cartServices = {
    addToCart : function(quantity, item){
        let array = [];
        array.push(new OrderItem(quantity, item))
        return array;
    },

    totalPrice : function (array){
        let total = 0;
        for(let i=0; i<array.length; i++){
            total += array[i].item.price * array[i].quantity;
        }
        return total;
    },

    printCart: function(array, element){
        element.html("");
        for( let i=0; i<array.length; i++){
            element.append(`
                    <tr>
                        <td>${array[i].item.name}</td>
                        <td>${array[i].quantity}</td>
                        <td>${array[i].item.price}</td>
                        <td>${array[i].item.price * shoppingCart[i].quantity}</td>
                        <td><button class="remove">remove</button></td>
                    </tr>
    
            `);
        }
        
    },
    pay: function() {

        const totalPrice = $("#price").text();
        const formName = $('#fullname').val();
        const formAddress = $('#address').val();
        const formCity = $('#city').val();
        const formCardNumber = $('#cardnumber').val();

        const order = [new Order(totalPrice, formName, formAddress, formCity, formCardNumber)];
        const json = JSON.stringify(order);
        console.log("JSON FILE THAT IS GOING TO BACKEND!!!")
        console.log(json);
        $('#order-form').css("display", "none");
        $('#order-message').text(`Payment finished successfully!`);
    }
    

}