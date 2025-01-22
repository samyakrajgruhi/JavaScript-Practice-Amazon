import { renderProductSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import './backend-practice.js';
// import {cars} from "../data/car.js"; 
// import '../data/cart-class.js' 
Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then(()=>{
    renderProductSummary();
    renderPaymentSummary();
})

/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve();
    });
}).then(()=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });
}).then(()=>{
    renderProductSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(()=>{
    loadCart(()=>{
        renderProductSummary();
        renderPaymentSummary();    
    });
});
*/



/* cars.forEach((car)=>{
    car.openTrunk();
    car.displayInfo();
    car.go();
    car.go();
    car.go();
    car.brake();
    car.displayInfo();
}); */