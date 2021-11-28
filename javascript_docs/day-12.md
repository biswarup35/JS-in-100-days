---
title: Prototype & Prototype Chain
sidebar_position: 12
slug: prototype-chain
image: https://res.cloudinary.com/rsimgx/image/upload/v1638088293/prototype-5_wyh5k2.jpg
---

## Prototype

Last day we have learned that every object has a second property called [[prototype]]. Similarly, every function has a second property known as the prototype, since functions are first-class citizens in JavaScript they can have their property. Today we're going to deep dive into prototype objects and prototype chains.

## What is Prototype in JavaScript?

When a function is created, internally the JavaScript engine assigns a property `prototype` object to the function. This object is known as an anonymous object in JavaScript. This object also contains a property `constructor` that references the newly created function.

Since, every object has a second object (linked throgh **[[prototype]]**) this `prototype` object also linked to the `Object.prototype` object.

Lets create a function `User()`:

```js
function User(name) {
  this.name = name;
}

new User();
```

![Prototype example](https://res.cloudinary.com/rsimgx/image/upload/v1637992120/prototype-1_bryv16.webp)

Before explaining the above example, let's pause for a moment to understand the **`Object.prototype`**:

:::info Note
It might be quite confusing if this is the first time you've learned about the JavaScript prototype.
:::
The `Object()` is a **function**, not an object.

That's why it has the `Object.prototype` object which contains all the methods for all the instances of `Object`.

Internally the `Object.prototype` object has a property `constructor()` that references the `Object` function.

```js
console.log(typeof Object); // function
console.log(Object.prototype.constructor === Object); // true
```

So, we've learned that:

- `Object()` is a function.
- Every function has a prototype object that references the `Object.prototype` object through the [[prototype]].
- This prototype object has a property named `constructor` that references the objects' function.

![constructor](/img/day-12/prototype-2.webp)

```js
Object.prototype.constructor === Object; // true
```

Now, we have a good understanding of `Object.prototype`. Let's get back to the `User()` function example:

Like the `Object()` function, the `User()` function has a property called prototype (_type of object_). And this prototype object has a constructor property that references the `User()` function.

In addition, the JavaScript engine by default links the `User.prototype` object to the `Object.prototype` object through the [[prototype]] linkage, which is known as prototype chaining or prototype linkage. The prototype chain is denoted by [[prototype]]. Let's visualize the above example:

![User.prototype](/img/day-12/prototype-3.webp)

All right! let's confirm the linkage between the `User.prototype` and the `Object.prototype`:

```js
console.log(User.prototype.__proto__ === Object.prototype); // true
console.log(Object.getPrototypeOf(User.prototype) === Object.prototype); // true
```

:::warning Beware
The _`__proto__`_ is deprecated in the browser environments. It is available on the server-side(node.js) for historical reasons.

To access the [[prototype]] object we have two methods:

- `Object.getPrototypeOf(obj)` returns the [[prototype]] object of a given object.
- `Object.setPrototypeOf(obj)` sets the [[prototype]] of a given object.

:::

Now, we have a solid understanding of what is a prototype in JavaScript. Let's quick recap before we dive into the **usage of prototype**.

- Every function has a prototype object. This prototype object references the `Object.prototype` object by default through the [[prototype]] link.
- The `Object.prototype` object has the constructor property that references the Object's function.
- The `Object.getPrototypeOf(obj)` method returns the [[prototype]] object of a given object.
- The `Object.setProtoypeOf(obj)` method sets the [[prototype]] object of a given object.

:::info
Since, the `Object.prototype.constructor` references the `Object()` function, we can create new object with one of its instances.
:::

Let's create a new object from one of an instance of `User`:

```js {12,14}
function User(name) {
  this.name = name;
}

User.prototype.greet = function (msg) {
  console.log(`${msg}, ${this.name}`);
};

const bob = new User("Bob");
const monika = new User("Monika");

const john = new bob.constructor("John"); // Creating new User without using the `User` function.

john.greet("Hello"); // Hello, John
```

## Use of Prototype

In traditional **object-oriented** programming we use **_classes_** to store the shared methods and properties for all of its instances. But in the case of JavaScript, it is different, the constructor/prototype pattern is used to achieve the same goal before ES6. However, in ES6 we can use the `class` keyword like in other traditional object-oriented programming languages. But it is just the syntactic sugar, under the hood JavaScript uses the prototype to store the shared methods (all built-in JavaScript methods uses the prototype pattern).

### Defining shared methods using `class`

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet(msg) {
    console.log(`${msg}, ${this.name}`);
  }
}

const bob = new User("Bob");
const monika = new User("Monika");
bob.greet("Hello"); // Hello, Bob
monika.greet("Hi"); // Hi, Monika
```

We have created two instances (objects) of `User` and both of these objects have one property `name`. The method `greet()` is served from the `User.prototype` object. The `greet()` is neither available in `bob` nor `monika`.

!["class shared methods"](/img/day-12/prototype-4.webp)

![class shared method link](/img/day-12/prototype-5.webp)

### Defining shared methods using constructor/prototype pattern

```js
function User(name) {
  this.name = name;
}

User.prototype.greet = function (msg) {
  console.log(`${msg}, ${this.name}`);
};

const bob = new User("Bob");
const monika = new User("Monika");
bob.greet("Hello"); // Hello, Bob
monika.greet("Hi"); // Hi, Monika
```

There is no difference between the `class` based implementation and constructor/prototype-based implementation, both are the same. The goal is to serve the methods from the prototype object, all built-in JavaScript methods are using the same implementation.

## Advantages of Prototype

```js
function User(name) {
  this.name = name;
  this.greet = function (msg) {
    console.log(`${msg}, ${this.name}`);
  };
}

const bob = new User("Bob");
const monika = new User("Monika");
```

The above example also made the `greet()` method available across all of the instances of `User`. But this way of creating objects is not recommended. The JavaScript engine have to re-create the `greet()` method whenever a new instance of `User` is created, it makes object creation slower.

![object creation without prototype](/img/day-12/prototype-6.webp)

That is why, in ES6 JavaScript under the hood uses prototypes to make the object creation faster. If methods are defined in the prototype then the JavaScript engine doesn't have to re-create those methods whenever a new instance is created.

:::tip Tip
To make object creation faster use ES6 `class` syntax to create objects or use constructor/prototype pattern whenever it is possible.
:::

What if, if we have the same method in prototype and individual level of instances. For example:

```js {5-7,12-14}
function User(name) {
  this.name = name;
}

User.prototype.greet = function (msg) {
  console.log(`${msg}, ${this.name}`);
};

const bob = new User("Bob");
const monika = new User("Monika");

monika.greet = function () {
  console.log("Hello, this is Monika");
};

bob.greet("Hello"); // ??
monika.greet(); // ??
```

This brings us to the next part of our discussion **prototype chaining**.

## What is Prototype Chain

Whenever a new object is created the JavaScript engine by-default links that object to the `Object.prototype` object through the prototype linkage [[protoype]]. The link between the newly created object and the `Object.prototype` object is known as the prototype chain.

Let's visualize:
![prototype chain](/img/day-12/prototype-7.webp)

In the above example when `bob` and `monika` instances were created, the JavaScript engine links both of these objects to the `User.prototype` object through the [[prototype]]. Internally, the `User.prototype` object also linked to `Object.prototype` object also via the [[protoype]]. The whole link (prototype chain) is represented in the blue dotted line.

```js
// bob and monika linked to User.prototype via [[prototype]]
console.log(Object.getPrototypeOf(bob) === User.prototype); // true
console.log(Object.getPrototypeOf(monika) === User.prototype); // true

// bob and monika shares the same User.prototype object
console.log(Object.getPrototypeOf(bob) === Object.getPrototypeOf(monika)); // true

// User.prototype linked to Object.prototype via [[prototype]]
console.log(Object.getPrototypeOf(User.prototype) === Object.prototype); // true
```

Alright! let's get back to our question what if we have the same method in prototype and individual level of instance?

So, before answering the question, let's try to understand what happens when we call `bob.greet()`:
![calling bob.greet](/img/day-12/prototype-8.webp)

When the `bob.greet()` method is called, the JavaScript engine looks up the `bob` object and searches for the `greet()` method. Since, there is no `greet()` method, the JavaScript engine wents one level up and look up the `User.prototype` object and searches for the `greet()` method. Since the javascript engine can find the `greet()` method inside the `User.prototype` object (_prototype chain_) it executes the `greet()` method and return.

```js
bob.greet("Hello"); // Hello, Bob
```

Similarly, when the `monika.greet()` method is called, the JavaScript engine looks it up at the `monika` object and searches for the `greet()` method. Since the JavaScript engine can find the `greet()` method inside the `monika` object it executes the `greet()` method and return.

```js
monika.greet(); // Hello, this is Monika
```

:::note
This time the JavaScript engine did not look it up at the `User.prototype` object (_prototype chain_). Since the JavaScript engine can find the `greet()` method in the instance it executes the method immediately without looking it up in the _prototype chain_.
:::

The question got answered: If we call a method, if the method is present at the instance level then it executes it from here. If the method is not available at the instance level then the JavaScript engine looks up at the prototype chain and execute the method from there. And if the method is not found anywhere in the prototype chain that goes up the `Object.prototype` it throws a TypeError.

```js
monika.sing(); // TypeError: monika.sing is not a function
```

![monika.sing](/img/day-12/prototype-9.webp)

## Summary

- Every function has a prototype object. This prototype object references the `Object.prototype` object through the [[prototype]] linkage.
- The `Object.prototype` object has the constructor property that reference back to the `Object()` function.
- The prototype chain allows instances(objects) to use the methods and properties of its prototype object through the [[prototype]] linkage.
- There are to methods available to access the [[prototype]] object:
  - `Object.getPrototypeOf(obj)` returns the [[prototype]] object of a given object.
  - `Object.setPrototypeOf(obj)` sets the [[prototype]] object of a given object.

<hr />

## Resources

### References

- [📖 Object.getPrototypeOf() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
- [📖 Object.setPrototypeOf() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

### Articles

- [📖 Prototype in JavaScript: it’s quirky, but here’s how it works - Pranav Jindal](https://www.freecodecamp.org/news/prototype-in-js-busted-5547ec68872/)
- [📖 Understanding JavaScript Prototype - Zell Liew](https://zellwk.com/blog/javascript-prototype/)

### Videos

- [🎥 9.19: Prototypes in Javascript - p5.js Tutorial - The Coding Train](https://youtu.be/hS_WqkyUah8)
- [🎥 Prototypes in JavaScript - FunFunFunction #16 - FunFunFunction](https://youtu.be/riDVvXZ_Kb4)
