---
title: What the hack is Event loop? and Asynchronous JavaScript
sidebar_label: Event Loop
sidebar_position: 13
slug: event-loop-and-asynchronous-javascript
description: Let's dive into the Asynchronous JavaScript
---

JavaScript is a single threaded programming language, means it can perform one task at a time. Though it is a single theaded programming language it can perform asynchronous tasks. Isn't it great? offcourse yes it is awesome.

We have berif introduction with Asynchronus JavaScript code when we are studying Callback functions. I assume you're familier with Callback functions otherwise things will go over your head.

Now lets come to the poin, why you should be learn **Event Loop?** There are mainly three benefits of learning it:

- To better understand of Asynchronous JavaScript
- To debug Asynchronous JavaScript code
- Tackle interviews; A lot of interviewers ask questions around this topic.

## What is Event Loop in JavaScript?

Its a magic! No I'm just kidding - The **event loop** is the main reason behind JavaScript's asynchronous nature. In JavaScript everything executes in the main thread (single thread), using **event loop** the JavaScript engine create an illusion of multi-threading. It is nothing but two data structres. A **_Stack_** (the Call Stack) and a **_Queue_** (the Callback Queue/Message Queue/ Event Queue).

Before diving deep let's pause for a moment to learn these two data structres the _Call Stack_ and the _Callback Queue_.

### Call Stack

When the execution context is created, the JavaScript engine push the functions onto the **call stack** to execute these functions. When a function is finish executing it pops off the **call stack** and then the next function get invoked and so on.

Let's take an example:

```js {9} title="/app.js"
function add(num1, num2) {
  return num1 + num2;
}

function average(num1, num2) {
  return add(num1, num2) / 2;
}

const avg = average(10, 20);

console.log(avg);
```

Sometimes the call stack is known as the main thread. Because here all the function invocation took place. That is why it is refered as the main thread.

:::warning Caution
Do not block the main thread with expensive operations. The main thread is designed to handle the UI realted tasks. Anything that is not UI related should be done off the main thread.
:::
