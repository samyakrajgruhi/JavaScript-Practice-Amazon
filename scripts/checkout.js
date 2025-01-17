import { renderProductSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {cars} from "../data/car.js";
// import '../data/cart-class.js'

renderProductSummary();
renderPaymentSummary();

cars.forEach((car)=>{
    car.openTrunk();
    car.displayInfo();
    car.go();
    car.go();
    car.go();
    car.brake();
    car.displayInfo();
})












