---
title: Execution context: how JavaScript keeps track of what is running
date: 2026-09-17
summary: Hoisting, the temporal dead zone, the scope chain, this-binding and closures, all explained through one mental model.
tags: JavaScript, Fundamentals
lang: en
repo: https://github.com/TanjilaShamima/developer-journey-with-js/tree/main/chapter-1/executionContext
coverArt: context
cover:
---

An **execution context** is the information JavaScript uses to run a piece of code. It helps the engine track variables, find names, and know what `this` means.

Think of a function call as starting a small workspace. That workspace contains the call's parameters and local variables, and it connects to the surrounding scope.

## Runtime vs. execution context

The runtime is the whole environment, such as a browser or Node.js. An execution context is part of how the JavaScript engine manages running code inside that environment.

| Concept | Simple meaning |
| --- | --- |
| Runtime | The environment that runs JavaScript and supplies APIs |
| Execution context | Information needed to execute a piece of code |
| Call stack | Tracks active execution contexts |
| Scope | Rules that determine where a name can be used |
| Lexical environment | Bindings and a connection to an outer environment |

A **binding** connects a name, such as `score`, to its value. “Lexical” means that the structure of the source code matters.

## Types of execution context

- **Global context:** used for a classic script's top-level code.
- **Function context:** created for each function call, with that call's parameters and local state.
- **Module context:** used when evaluating a JavaScript module. Module-level names belong to the module.

Direct `eval()` also has special execution-context behavior, but you do not need it for these examples.

Top-level code is not identical in every environment. A classic browser script, an ES module, and a Node.js CommonJS file have different top-level rules.

These Node examples use `.js` files and CommonJS behavior in this project. Node wraps CommonJS files in a function, so a top-level variable in a file is not automatically a global variable. The HTML example uses a classic browser script to demonstrate browser globals.

> The runnable examples mentioned below (`01-…js`, `02-…js` and so on) live in the [source folder on GitHub](https://github.com/TanjilaShamima/developer-journey-with-js/tree/main/chapter-1/executionContext). Each runs directly with `node <file>` — no packages needed.

## Setup and execution

A useful beginner model has two steps:

1. **Setup:** establish the environment and prepare declarations.
2. **Execution:** evaluate statements and expressions in order.

Tutorials often call these the “creation phase” and “execution phase.” This is a teaching model; actual specification algorithms and engine implementation details are more involved.

Declarations are not all prepared in the same way:

| Declaration | Before its declaration executes |
| --- | --- |
| `var score` | Binding exists and starts as `undefined` |
| Ordinary function declaration | Function is available in its scope |
| `let score` | Binding exists but is uninitialized; access throws |
| `const score` | Binding exists but is uninitialized; access throws |
| `class Player` | Binding is also uninitialized until declaration evaluation |

**Hoisting** describes observable declaration behavior. It does not mean JavaScript physically moves your source code to the top of the file.

`02-creation-and-hoisting.js` prints:

```text
Before assignment: undefined
Function declaration: Hello!
After assignment: 10
Function expression before assignment: undefined
Function expression after assignment: Hi!
```

The `var` binding exists early, but its assigned value does not. A function expression assigned to `var` follows the same rule: trying to call it before assignment would throw a `TypeError` because `undefined` is not callable.

## Function calls get separate local state

```js
function double(number) {
  const result = number * 2;
  return result;
}

double(3); // Local number is 3; local result is 6.
double(5); // A separate call: number is 5; result is 10.
```

Parameters and local variables belong to their call's environment. Returning finishes the call, and its context leaves the call stack. Some bindings can remain reachable through closures, which we will cover later.

`01-context-basics.js` prints:

```text
Asha scored 15
Mina scored 25
Outside the function: undefined
```

The last line uses `typeof` on a name that is not declared in the outer scope. Reading that name directly would throw a `ReferenceError`.

## let, const, and the temporal dead zone

The **temporal dead zone**, or **TDZ**, is the period from entry into a binding's scope until its initialization. Reading a `let` or `const` binding during that period throws a `ReferenceError`.

```js
// console.log(score); // ReferenceError if this line is enabled.
let score = 10;
console.log(score); // 10
```

Saying “let and const do not exist before the declaration” is misleading. Their bindings are already present, but you cannot use them yet. Even `typeof` throws when applied to a binding in its TDZ.

`let` and `const` are block-scoped. `var` is function-scoped, or follows the surrounding top-level environment's rules when outside a function. An ordinary `{ ... }` block can create a lexical environment without creating a new function execution context.

`const` prevents reassigning the binding. It does not make an object immutable:

```js
const person = { name: "Asha" };
person.name = "Mina"; // Allowed: update the object.
// person = {};      // Not allowed: reassign the binding.
```

`03-let-const-tdz.js` catches its intentional errors so the example keeps running. It prints two `ReferenceError` messages, then demonstrates block scope and object mutation.

## Scope chain: how JavaScript finds a name

When code uses a variable, JavaScript searches its current environment and then follows outer environment links until it finds the binding. If it finds none, an ordinary read throws a `ReferenceError`.

**Lexical scope** means that the function's source location determines its outer scope. Calling a function from another function does not replace its outer scope with the caller's local variables.

```text
inner function environment
          |
          v
outer function environment
          |
          v
surrounding environment
```

**Shadowing** happens when an inner scope declares the same name as an outer scope. Code in the inner scope finds the nearer binding first.

`04-scope-chain.js` prints:

```text
Inner sees: outer message
Caller still sees: caller message
```

The inner function was defined inside `outer()`, so it reads `outer()`'s `message`, even though another function calls it.

## this depends on the kind of function

For ordinary functions, `this` usually depends on **how the function is called**.

| Call form | Typical `this` value |
| --- | --- |
| `person.sayName()` | `person` |
| `sayName()` in strict mode | `undefined` |
| `sayName.call(person)` | Explicitly supplied `person` |
| `new Person()` | The newly created instance |
| Arrow function | Inherits `this` from its surrounding context |

An arrow function has no own `this` binding. `.call()` cannot give it a different `this`. Arrow functions also cannot be used as constructors with `new`.

`05-this-binding.js` uses strict mode so a detached ordinary function call has `this === undefined`. It prints:

```text
Method call: Asha
Detached call: undefined
Explicit call: Mina
Arrow keeps outer this: Asha
```

Do not assume top-level `this` is always `window`. It differs between classic browser scripts, ES modules, and CommonJS files. ES modules are strict and have top-level `this` equal to `undefined`.

## Closures: bindings can outlive a function call

A **closure** is a function together with access to its surrounding lexical environment. A returned function can still use outer bindings after the outer call has returned.

```js
function createCounter() {
  let count = 0;
  return function increment() {
    count += 1;
    return count;
  };
}
```

Calling `createCounter()` twice creates two separate `count` bindings. A closure remembers access to a binding, not a frozen copy of its initial value.

`06-closures.js` prints:

```text
Counter A: 1
Counter A: 2
Counter B: 1
Counter A: 3
```

The outer execution context has left the stack. The captured environment remains reachable through the returned function. Memory can be reclaimed once the relevant data is no longer reachable; garbage collection timing is not controlled by this example.

## Execution contexts and the call stack

Calling a function places its context on the stack. Returning removes it, and the caller resumes.

Recursion creates a new call for each recursive step. Each call has its own parameters and local state.

`07-call-stack.js` calculates `factorial(3)`:

```text
Enter: 3
Enter: 2
Enter: 1
Return: 1
Return: 2
Return: 6
Final answer: 6
```

The base case stops recursion. Without a stopping condition, repeated calls can exceed the available stack space.

## Asynchronous callbacks and context

Scheduling a callback does not keep the scheduling function running on the stack. The function can return first. Later, when the callback runs, it gets its own function execution context.

The callback can still access surrounding bindings through a closure.

`08-async-context.js` prints:

```text
1. Script starts
2. scheduleMessage starts
3. scheduleMessage returns
4. Script ends
5. Promise callback: Asha
6. Timer callback: Asha
```

Both callbacks remember `name`. The promise handler runs as a microtask after the synchronous code finishes. The timer callback runs later. See the neighboring `../jsRuntime/README.md` guide for more event-loop examples.

For `async` functions, `await` suspends the function's execution and schedules its continuation when the awaited result is ready. It does not block the whole thread while waiting.

## Browser global context

Open `09-browser-context.html`. It runs a classic script and shows that:

- Top-level `var` creates a property on `window` in this example.
- Top-level `let` creates a global lexical binding without creating a property on `window`.
- Top-level `this` is `window` in this classic script.
- A function's local variable is not available outside that function.

These results describe a classic browser script, not a module or a Node.js CommonJS file. You can use the browser developer tools Console to see the same output.

## Common mistakes

| Mistake | Correct idea |
| --- | --- |
| Every block creates a new execution context | Blocks can create scope; ordinary blocks do not create function-call contexts |
| Hoisting moves source lines | It describes declaration setup and access behavior |
| `let` before declaration is `undefined` | Access during the TDZ throws |
| The caller decides a function's scope | The function's lexical location determines its outer scope |
| `this` always points to the surrounding object | Ordinary call style and arrow behavior matter |
| Returning destroys every local binding immediately | Closures can keep bindings reachable |
| An async callback stays on the stack while waiting | It executes later with its own context |

## Practice

1. Call the function in `01-context-basics.js` with a third student and a different score.
2. In `02-creation-and-hoisting.js`, change `var points` to `let points`. Predict the first error before running it.
3. In `03-let-const-tdz.js`, add another nested block with its own `label`.
4. In `04-scope-chain.js`, remove the `message` declaration inside `outer()`. Predict which message the inner function finds.
5. In `05-this-binding.js`, call the detached function with `.call({ name: "Rafi" })`.
6. Add a third independent counter in `06-closures.js`.
7. Trace `factorial(4)` on paper before running it.
8. Change `name` to a `let` binding in `08-async-context.js`, then update it before `scheduleMessage()` returns. Observe how both callbacks read the updated value.

Predict each result, run the file, and explain which context and scope each variable belongs to.
