import{cart,calculateCartQuantity} from "../../data/cart.js"
import {products} from "../../data/products.js"
import {formatCurrency} from "../utils/money.js"
import { deliveryOptions } from "../../data/deliveryOptions.js";


export function renderPaymentSummary(){
    let totalItemCost = 0; // Total Item Cost without delivery charge or tax
    products.forEach((product)=>{
        cart.forEach((cartItem)=>{
            if(cartItem.productId === product.id){
                totalItemCost += Number(formatCurrency(product.priceCents))*cartItem.quantity;
            } 
        });
    });

    let deliveryCharge = 0; // Total Delivery Charge
    deliveryOptions.forEach((option)=>{
        cart.forEach((cartItem)=>{
            if(cartItem.deliveryOptionId === option.id){
                deliveryCharge += Number(formatCurrency(option.priceCents));
            }
        })
    })
    
    let totalBeforeTax = Number(totalItemCost + deliveryCharge).toFixed(2); // Item cost + delivery Charge
    let tax  = Number((totalBeforeTax * 0.1).toFixed(2)); // Tax (totalBeforeTax x 10%)
    
    let totalCost = (Number(totalBeforeTax) + Number(tax)).toFixed(2); // Final Cost of the Order
    const html = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Item(${calculateCartQuantity()}):</div>
        <div class="payment-summary-money">$${totalItemCost}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${deliveryCharge}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${totalBeforeTax}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money js-payment-tax">$${tax}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-payment-total">$${totalCost}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
    `

    document.querySelector('.js-payment-summary').innerHTML = html;

}