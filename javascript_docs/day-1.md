---
title: Execution Context
sidebar_position: 2
---

## What is Execution context in JavaScript?

Did you know know what happens when you execute a JavaScript code?

Spoiler alert! An execution context is created.

Want to know more? lets dive in.

Let me take an example of JavaScript code:

```js title="app.js"
let x = 5;

function double(a) {
  return a * 2;
}

let y = double(x);

console.log(y); // 10
```

So, the code is very straightforward. However, behind the scene, a lot of things are happening.

When the javascript engine executes a script, it creates an execution context. Each execution context has two phases: The creation phase (also known as the memory creating phase) and the execution phase (also known as the code exection phase).

### Creation Phase

Creation phase: When the code executed for the first time, the JavaScript engine creates a global execution context.

During this phase the following tasks are being performed by the JavaScript engine:

- In the case of a web browser, a global object `window` is created. And incase the Node.js environment `global` object is created.
- Creates `this` object which points to the global object above.
- Setup a memory heap for storing variables and function references.
- Store the function declaration in the memory heap and variables within the global execution context with the initial value as `undefined`.

![global execution context demo](/img/day-1/global-execution-context-demo.jpg)

In our example, during the memory creating phase, the Javascript engine stores the variable `x` and `y` and the function declaration `double()` in the global execution context. Meanwhile, it initializes the variables `x` and `y` to `undefined`.

![Creation phase](/img/day-1/creation-phase-1.jpg)

After the creation phase, the Global execution context moves to the code execution phase.

### Execution Phase

Execution phase: During this phase, the javascript engine started to execute the code line by line. Meanwhile, the javascript engine assign values to the variables and executes the function calls.

![Execution phase one](/img/day-1/execution-phase-1.jpg)

For every function call, the JavaScript engine creates a new function execution context. The function execution context is similar to the global execution context, but instead of creating the `global` object, it creates the `arguments` object that contains a reference to all the parameters passed into the function.

In our example, the function execution context creates the `arguments` object that references all the parameters passed into the function.

Sets `this` value to the `global` object and initializes the `a` parameter to `undefined`.

![Execution phase one](/img/day-1/function-execution-phase-1.webp)

During the execution phase of the function execution context, it assigns `5` to parameter `a` and returns the result `10` to the global execution context.

![Execution phase two](/img/day-1/function-execution-phase-2.webp)

Once the function execution context finishes its job, the global execution context now should look like this:

![Execution phase two](/img/day-1/global-execution-phase-2.webp)

A data structure named stack is used to keep track of the function execution context as well as the global execution context. This is known as the call stack.

<hr/>

## Resources

### Articles

- [📖 JavaScript Execution Context](https://www.javascripttutorial.net/javascript-execution-context/)

### Videos

- [🎥 How JavaScript Works 🔥& Execution Context | Namaste JavaScript Ep.1](https://youtu.be/ZvbzSrg0afE)
