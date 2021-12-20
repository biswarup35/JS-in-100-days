---
title: What the hack is Event loop? and Asynchronous JavaScript
sidebar_label: Event Loop
sidebar_position: 13
slug: event-loop-and-asynchronous-javascript
description: Let's dive into the Asynchronous JavaScript
author: biswarup35
image: https://res.cloudinary.com/rsimgx/image/upload/v1639842069/that_the_hack_is_event_loop_ncotpk.jpg
---

JavaScript is a single-threaded programming language, which means it can perform one task at a time. Though it is a single-threaded programming language it can perform asynchronous tasks. Isn't it great? Of course yes it is awesome.

We have a brief introduction to Asynchronous JavaScript code when we are studying Callback functions. I assume you're familiar with Callback functions otherwise things will go over your head.

Now let's come to the point, why you should learn **Event Loop?** There are mainly three benefits of learning it:

- To better understand Asynchronous JavaScript
- To debug Asynchronous JavaScript code
- To tackle interviews; A lot of interviewers ask questions about this topic.

## What is Event Loop in JavaScript?

Its a magic! No, I'm just kidding - The **event loop** is the main reason behind JavaScript's asynchronous nature. In JavaScript everything executes in the main thread (single thread), using the **event loop** the JavaScript engine creates an illusion of multi-threading. It is nothing but two data structures. A **_Stack_** (the Call Stack) and a **_Queue_** (the Callback Queue/Message Queue/ Event Queue).

Before diving deep let's pause for a moment to learn these two data structures. The _Call Stack_ and the _Callback Queue_.

### What is Call Stack (main thread)?

When the execution context is created, the JavaScript engine pushes the functions onto the **call stack** to execute these functions. When a function is finished executing it pops off the **call stack** and then the next function gets invoked and so on.

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

Let's visualize what happens when we execute the above script:
![call stack](/img/day-13/call-stack.gif)

The function which is at the top of the call stack is the currently executing function. As soon as the function has done its execution it pops off the call stack so that remaining functions from the script get a chance to execute.

Before going to the next data structure let me take another example:

```js
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
```

You might expect the output to be 1, 2, 3 as I have set the timer **0ms**. Unfortunately that not gonna be the output. The output will be different, and this is where the magic happens.

The `setTimeout()`, `addEventListener()`, `setInterval()` etc are not part of JavaScript engine these are part of **_Web APIs_**. Let me explain what happens when we execute the above script.

```js {1} title="/app.js"
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
```

This function will be executed immediately as there is nothing special in this function.

```js {2} title="/app.js"
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
```

Magic will happen when the JavaScript engine push the `setTimeout()` function onto the call stack. The function carries a timer **0ms** and a Callback function `() => console.log(2)`. The JavaScript engine will not invoke the function immediately though it has a **0ms** timer. But rather, the Callback function will be handed over to the Web API or the thread pool.

When the timer is completed then the Callback function will be enqueued into the Callback Queue.

### What is Callback Queue?

This is the second data structure used by the JavaScript engine and it plays an important role in the asynchronous nature of JavaScript. The Callback Queue is also known as Message Queue, Event Queue. The Job of the Callback Queue is to enqueue the Callback functions returned from the thread pool.

Let's visualize the above example:

![callback queue](/img/day-13/callback-queue.gif)

```js {3} title="/app.js"
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
```

Now you know what will be the output, it is 1, 3 then 2.

When the main thread (call stack) is done executing all the functions the **event loop** will grab the callback function from the queue and push it onto the call stack for execution.

:::note Remmember
There is no guarantee that the `setTimeout()` function will invoke the callback function at the specified time.
:::

The event loop will push the callback functions only when the call stack is empty (excluding the main function). If a function takes longer to finish its execution then the remaining callback functions will have to wait until the current function has done its execution.

So, all the callback functions which are invoked through APIs are get filtered in the call stack. The filtered callback functions are then handed over to the thread pool. Then thread pool enqueue the callback function(s) onto the callback queue. As soon as the main thread is available the event loop pushes the callback function(s) onto the call stack.

The job of the Event Loop is to push the callback function(s) onto the call stack from the callback queue. To be more precise, the event loop is subscribed to the call stack. When the call stack is empty the event loop is notified that now it can push the callback function(s) onto the call stack.

I already told, it is an illusion of multi-threading, in JavaScript, everything executes on the main thread.

:::tip
Do not block the main thread with functions that are not related to the UI. Anything that is not UI related do it off the main thread to get the optimal performance.

Use web workers if possible.

:::

Let me summarise everything for you.

## Summary

In JavaScript, everything executes in the main thread. With the help of a few data structures, the event loop creates an illusion of the multi-threading nature of the language.

The event loop works together with the call stack and the callback queue. The call stack filters all the callback functions (passed through web APIs) and sends them to the thread pool. Then the thread pool enqueues these callback functions into the callback queue. Meanwhile, when the call stack is empty the event loop takes the callback functions from the callback queue and push them onto the call stack for execution.

If a function takes longer to execute the remaining callback functions will have to wait in the queue until the current function has done its execution. So everything executes in the main thread, the event loop creates an illusion of a multi-threading nature with the help of these data structures.

<hr />

## Resources

### References

- [📖 Concurrency model and the event loop - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

### Articles

- [📖 What is an event loop in JavaScript?](https://www.educative.io/edpresso/what-is-an-event-loop-in-javascript)
