class Car{
    #brand;
    #model;
    speed;
    isTrunkOpen;

    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
        this.speed = 0;
    }

    displayInfo(){
        if(this.speed > 0 ){
            this.closeTrunk();
        }
        console.log(`${this.brand} : ${this.model}, Speed: ${this.speed} Km/h, Trunk open?-> ${this.isTrunkOpen}`);
    }

    go(){
        if(this.speed <195){
            this.speed += 5;
        }
    }

    brake(){
        this.speed -= 5;
    }

    openTrunk(){
        this.isTrunkOpen = true;
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car{
    acceleration;
    
    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go(){
        if(this.speed < 300){
            this.speed += this.acceleration;
        }
    }

    openTrunk(){
        this.isTrunkOpen = "Race Cars do not have Trunks";
    }

    closeTrunk(){
        return;
    }

}

export const cars = [{
    brand: 'Toyota',
    model: 'Corolla',
},{
    brand: 'Nissan',
    model: 'Skyline GTR',
},{
    brand: 'BMW',
    model: 'M5 Competetion',
},{
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
}].map((carDetails)=>{
    if(!carDetails.acceleration){
        return new Car(carDetails);
    }
    return new RaceCar(carDetails);
});
