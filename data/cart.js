export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart = [
        {
            productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity : 2,
            deliveryOptionId : '1'
        }
    ];
}


export function saveToStorage() {
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,quantity){
    let matchingItem;

    cart.forEach((item)=>{
        if(productId === item.productId){
            matchingItem = item;
        }
    });

    if(matchingItem){
        matchingItem.quantity += quantity;
    } else{
        cart.push({
            productId,
            quantity,
            deliveryOptionId:'1'
        });
    }
    saveToStorage();
}


export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((item)=>{
        if(item.productId !== productId){
            newCart.push(item);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function calculateCartQuantity(){
    let cartQuantity = 0;

        cart.forEach((item)=>{
            console.log(item.quantity);
            cartQuantity += item.quantity;
        });
    return cartQuantity;
}

export function toChangeDeliveryDate(inputProductId,inputDeliveryId){
    cart.forEach((cartItem)=>{
        if(cartItem.productId === inputProductId){
            cartItem.deliveryOptionId = inputDeliveryId;
        }
    });
    saveToStorage();

}


