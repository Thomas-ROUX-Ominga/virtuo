'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

/*
console.log(cars);
console.log(rentals);
console.log(actors);
*/

// Step 1

for (var r of rentals){
  for (var c of cars){
    if (r.carId == c.id){
      r.price = (c.pricePerDay * ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1) + r.distance * c.pricePerKm);
    }
  }
}
console.log(rentals);

// Step 2

for (var r of rentals){
  for (var c of cars){
    if (r.carId == c.id){
      for (let i = 0; i < (Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1; i++){
        if (i === 0){
          r.price = (c.pricePerDay + r.distance * c.pricePerKm);
        }
        else if ((i >= 1)&&(i < 4)){
          r.price += (c.pricePerDay)*0.9;
        }
        else if ((i >= 4)&&(i < 10)){
          r.price += (c.pricePerDay)*0.7;
        }
        else {
          r.price += (c.pricePerDay)*0.5;
        }
      }
    }
  }
}
console.log(rentals);

// Step 3

for (var r of rentals){
  if (r.price != 0){
    r.commission.insurance = (r.price * 0.15);
    r.commission.treasury = ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1);
    r.commission.virtuo = (r.price * 0.15) - ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1);
  }
}
console.log(rentals);

// Step 4

for (var r of rentals){
  if((r.options.deductibleReduction === true)&&(r.price != 0)){
    r.price += 4 * ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1);
  }
}
console.log(rentals);

// Step 5

for (var a of actors){
  for (var r of rentals){
    if ((a.rentalId == r.id)&&(r.price != 0)){
      for (var p of a.payment)
      {
        if(r.options.deductibleReduction === true){
          if(p.who === 'driver'){ // Amount = Price
            p.amount = r.price;
          }
          else if(p.who === 'partner'){ // Amount = (Price - Option)*0.7
            p.amount = ((r.price  - (4 * ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1))) * 0.7);
          }
          else if(p.who === 'insurance'){ // Amount = (Price - Option)*0.15
            p.amount = ((r.price  - (4 * ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1))) * 0.15);
          }
          else if(p.who === 'treasury'){ // Amount = 1*nbDay
            p.amount = ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1);
          }
          else{ // Amount = (Price - Option)*0.15 - 1*nbDay + Option
            p.amount = (((r.price - (4 * ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1)))* 0.15) - ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1) + (4 * ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1)));
          }
        }
        else{
          if(p.who === 'driver'){
            p.amount = r.price;
          }
          else if(p.who === 'partner'){
            p.amount = (r.price * 0.7);
          }
          else if(p.who === 'insurance'){
            p.amount = (r.price * 0.15);
          }
          else if(p.who === 'treasury'){
            p.amount = ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1);
          }
          else{
            p.amount = (r.price * 0.15) - ((Date.parse(r.returnDate) - Date.parse(r.pickupDate))/(1000*3600*24) + 1);
          }
        }
      }
    }
  }
}
console.log(actors);
