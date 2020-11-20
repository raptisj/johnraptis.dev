---
title: The 'this' word in Javascript
date: 2019-07-26
description: Understand what this means in JavaScript
template: post
thumb: ../../assets/javascript-logo.png
tags: ["javascript"]
---

Many people have issues when it comes to understand the <span class="highlight-in-text">'this'</span> keyword. What it does and when should I use it are common questions.

The <span class="highlight-in-text">'this'</span> (special identifier keyword) is refering to the object that is executing the current function.
For example if I have a method(function within an object) in an object and console.log the <span class="highlight-in-text">'this'</span> keyword I'll get the object itself.
Where as if I console.log it in a regular function it will refer to the window object itself.

Let's see some examples.

console.log <span class="highlight-in-text">'this'</span> will give us the window object.

```javascript
console.log(this)
```

console.log <span class="highlight-in-text">'this'</span> within a regular function will give us the window objects once again.

```javascript
function funky() {
  console.log(this)
}
funky()
```

If we have an object and within that object we call a function, console.log <span class="highlight-in-text">'this'</span> will give us the object we are currently in.

```javascript
const car = {
  name: "BMW",
  wheels() {
    console.log(this) // {name: "BMW", wheels: f}
  },
}
car.wheels()
```

If we add other functions later on, the same will apply.

Remember previously that when we logged <span class="highlight-in-text">'this'</span> within a regular function we got the window object?
Well the same does not apply if we are dealing with constructor functions.

```javascript
function Car(name) {
  this.name = name
  console.log(this) // Car {name: "Chevy"}
}
const somecar = new Car("Chevy")
```

As you can see the <span class="highlight-in-text">'this'</span> refers to the new object that we constructed.

Now lets have a look at an example where a bit more complexity is involved.
Consider this . . . What will be logged in the console?

```javascript
const store = {
  cost: "a",
  items: ["laptop", "car", "fruits"],
  showItems() {
    this.items.forEach(function(item) {
      console.log(this.cost, item)
    })
  },
}
store.showItems()
```

You might be tempted to think the following

```
a laptop
a car
a fruits
```

Unfortunately that's not the case. Remember that the <span class="highlight-in-text">'this'</span> in a regular function will give us the window object. Well that is what we have here. Our callback function within the forEach is a regular function.
So here is what we get instead . . .

```
undefined "laptop"
undefined "car"
undefined "fruits"
```

A simple solution for this is to leverage the power of scope. With the introduction of ES6 we have some new features that make our life easier. In this case we can use an arrow function. This will turn our function into block scope mode instead of function scope. So we can rewrite our callback like so . . .

```javascript
...
  this.items.forEach((item) => {
        console.log(this.cost, item);
  });
...
```

Now we will get the desired result.

Another case is the folloing.

```javascript
let car = {
  name: "BMW",
  wheels() {
    console.log(this.name)
  },
}
let newCar = car.wheels
newCar()
```

If i store my functions in a new variable and call it we'll get undefined. And the reason for that is that newCar can't recognize what <span class="highlight-in-text">'this'</span> refers to. Here bind comes to place. We can work around this like so.

```javascript
let car = {
  name: "BMW",
  wheels() {
    console.log(this.name)
  },
}
let newCar = car.wheels
let bindCar = newCar.bind(car)
bindCar()
```

We create a new variable once again and store the previous variable with the binded object we want to refer to.

Now when <span class="highlight-in-text">bindCar</span> is called we get the name as we expected.
There are many cases where the <span class="highlight-in-text">'this'</span> keyword gets tricky. Hope it's a bit clearer now.
