class Cart{
    cartItems;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageId));
    
        if(!this.cartItems){
            this.cartItems = [
                {
                    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity : 2,
                    deliveryOptionId : '1'
                },
                {
                    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity : 1,
                    deliveryOptionId : '2'
                },
            ];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageId,JSON.stringify(this.cartItems));
    }

    addToCart(productId,quantity){
        let matchingItem;
        if(!quantity){
            quantity = 1;
        }
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
    }

    removeFromCart(productId){
        const newCart = [];
        this.cartItems.forEach((item)=>{
            if(item.productId !== productId){
                newCart.push(item);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }

    calculateCartQuantity(){
        let cartQuantity = 0;
    
            this.cartItems.forEach((item)=>{
                cartQuantity += item.quantity;
            });
        return cartQuantity;
    }

    toChangeDeliveryDate(inputProductId,inputDeliveryId){
        this.cartItem.forEach((cartItem)=>{
            if(cartItem.productId === inputProductId){
                cartItem.deliveryOptionId = inputDeliveryId;
            }
        });
        this.saveToStorage();
    }
}

const cart = new Cart('cart-oop');
const buisnessCart = new Cart('cart-business');

console.log(cart);
console.log(buisnessCart);

console.log(buisnessCart instanceof Cart);