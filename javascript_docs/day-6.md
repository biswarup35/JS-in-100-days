---
title: Lexical Scope
sidebar_position: 6
---

## Lexical Scope

We already know what is scope, now it's time to understand what is the lexical scope.

If you remember the last day I gave you a hint of lexical scope. Let's find out what it is.

According to the definition, the lexical scope is the ability of a function scope to access the variables from the parent scope.

If you still find it confusing then don't worry I will explain it using an analogy and it will clear all of your doubts about the lexical scope.

Let's imagine a three-generation of family `Grand parent`, `Parent` and `Child` represented by Yellow, Green and Blue respectively. The `Child` got hungry and wanted to eat a Pizza, but the `Child` has no money. In that case what the `Child` can do? he can ask his parent to buy him a pizza. If the `Parent` has money he will buy him a Pizza, if he didn't have money he can ask for money from his parent, in our example, it is the `Grand parent`.

![Lexical scope](/img/day-6/lexical-scope-eg.webp)

But what if the `Parent` wants something for example a car, can he ask for money from his `Child`? No, It will be morally incorrect, hence he cannot ask from his child but can ask from his parent. In our example `Grand parent` can help both the `Parent` and `Child` as well.

That's how lexical scope works in JavaScript, let's see this in action.

```javascript
(function grandParent() {
  const car = "Audi A8";
  console.log(`I have: ${car}`);

  (function parent() {
    const bike = "Ninja H2";
    console.log(`I have: ${bike}, ${car}`);

    (function child() {
      const scooter = "Mi Scooter Pro";

      console.log(`I have: ${scooter}, ${bike}, ${car}`);
    })();
  })();
})();
```

The program is very straightforward, the `child()` is lexically bounded by the parent functions. Now, let's what we can access from each function.

![Lexical scope](/img/day-6/lexical-scope-debug-1.webp)

The call stack is now pointing to the `child()` from here we have access to all variables.

![Lexical scope](/img/day-6/lexical-scope-debug-2.webp)

At this moment the call stack is pointing to the `parent()`. From here we have no access to the child's `scooter` property. But we have access to `car` property from the `grandParent()` function.

![Lexical scope](/img/day-6/lexical-scope-debug-3.webp)

At this point, the call stack is pointing to the `grandParent()` function. From here we have no access to the child's property. We cannot access the `bike` and `scooter` property anymore.

## Summary

- The most inner function is lexically bounded by the outer functions.

- From the most inner function we have access to all parents property

- Parent cannot access child's property.
  :::tip Tip
  Function and lexical scope together form a closure.
  :::

<hr/>

## Resources

### Articles

- [📖 Lexical Scope in JavaScript – What Exactly Is Scope in JS? - Oluwatobi Sofela](https://www.freecodecamp.org/news/javascript-lexical-scope-tutorial/)
- [📖 Lexical scope in JavaScript - Educative](https://www.educative.io/edpresso/lexical-scope-in-javascript)

### Videos

- [🎥 Lexical scoping in javascript - Hitesh Choudhry](https://youtu.be/qT5S7GgIioE)
