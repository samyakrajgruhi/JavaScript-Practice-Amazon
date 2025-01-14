const cart = {
    cartItems: JSON.parse(localStorage.getItem('cart')),
    
    saveToStorage() {
        localStorage.setItem('cart',JSON.stringify(this.cartItems));
    },

    addToCart(productId,quantity){
        let matchingItem;
        this.cartItems.forEach((item)=>{
            if(productId === item.productId){
                matchingItem = item;
            }
        });
    
        if(matchingItem){
            matchingItem.quantity += quantity;
        } else{
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId:'1'
            });
        }
        this.saveToStorage();
    },

    removeFromCart(productId){
        const newCart = [];
        this.cartItems.forEach((item)=>{
            if(item.productId !== productId){
                newCart.push(item);
            }
        });
        cart = newCart;
        this.saveToStorage();
    },

    calculateCartQuantity(){
        let cartQuantity = 0;
    
            this.cartItems.forEach((item)=>{
                cartQuantity += item.quantity;
            });
        return cartQuantity;
    },
    
    toChangeDeliveryDate(inputProductId,inputDeliveryId){
        this.cartItem.forEach((cartItem)=>{
            if(cartItem.productId === inputProductId){
                cartItem.deliveryOptionId = inputDeliveryId;
            }
        });
        this.saveToStorage();
    }
}