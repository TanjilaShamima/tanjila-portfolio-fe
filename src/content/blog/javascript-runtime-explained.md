---
title: The JavaScript runtime, explained from the call stack up
date: 2026-09-16
summary: Language vs. engine vs. runtime, the call stack, the heap, and how the event loop decides between microtasks and timers.
tags: JavaScript, Node.js, Fundamentals
lang: en
repo: https://github.com/TanjilaShamima/developer-journey-with-js/tree/main/chapter-1/jsRuntime
coverArt: runtime
cover:
---

A **JavaScript runtime** is the environment that runs JavaScript and gives it tools to work with the outside world.

JavaScript can calculate a total by itself. But reading a file, updating a web page, or starting a timer needs help from its environment.

## Language, engine, and runtime

These words describe different things:

| Term | Meaning | Example |
| --- | --- | --- |
| JavaScript language | Rules for writing programs | Variables, functions, objects, promises |
| JavaScript engine | Software that executes JavaScript | V8, SpiderMonkey, JavaScriptCore |
| JavaScript runtime | The engine plus the surrounding environment | A browser or Node.js |

Chrome and Node.js both use V8, but they provide different tools. A shared engine does not mean a shared environment.

```text
JavaScript runtime
  |-- JavaScript engine
  |     |-- Call stack: tracks running function calls
  |     |-- Heap: memory used for objects and other data
  |
  |-- Host APIs: timers, network, files, or page tools
  |-- Scheduling: event loop, tasks, and microtasks
```

This is a learning diagram, not an exact map of every implementation.

## Browser runtime vs. Node.js runtime

| Feature | Browser | Node.js |
| --- | --- | --- |
| Typical use | Interactive web pages | Servers, scripts, command-line tools |
| Page tools | `window`, `document`, DOM | No browser DOM by default |
| File access | Restricted browser APIs | Modules such as `node:fs` |
| Timers | `setTimeout`, `setInterval` | `setTimeout`, `setInterval` |
| Global environment | `globalThis` | `globalThis` |

The **DOM** is the browser's object representation of an HTML page. JavaScript uses it to read and change the page.

`document`, `setTimeout`, and `console` are supplied by the environment. They are not JavaScript language syntax. `Promise`, `Array`, and `Object` belong to the language's standard built-in tools.

> The runnable examples mentioned below (`01-…js`, `02-…js` and so on) live in the [source folder on GitHub](https://github.com/TanjilaShamima/developer-journey-with-js/tree/main/chapter-1/jsRuntime). Each runs directly with `node <file>` — no packages needed.

## Call stack: which function is running?

The **call stack** tracks active function calls. A function call adds a frame. Returning from the function removes that frame. The last frame added is the first one removed.

In `02-call-stack.js`, `greet()` calls `makeMessage()`:

```text
greet starts
  makeMessage starts
  makeMessage returns
greet continues
greet returns
```

Expected output:

```text
1. Script starts
2. Inside greet
3. Inside makeMessage
4. Hello, Asha!
5. Script ends
```

Each call finishes its synchronous work before the caller continues. Too many nested calls, such as recursion with no stopping condition, can overflow the stack.

## Heap: objects and references

The **heap** is a memory area used for objects and other dynamically managed data. Engines decide the exact storage details; do not assume every primitive always lives on the stack.

```js
const first = { name: "Asha" };
const second = first; // Both variables refer to the same object.
second.name = "Mina";
console.log(first.name); // Mina
```

Assignment does not automatically copy an object. `03-heap-and-references.js` also demonstrates `{ ...object }`. This creates a **shallow copy**: the outer object is new, but nested objects are still shared.

JavaScript uses **garbage collection** to reclaim memory that is no longer reachable. You do not normally free objects manually. Keeping unnecessary references, such as old objects in a global array, can keep memory in use. Collection timing is controlled by the engine.

## Synchronous vs. asynchronous work

**Synchronous** work runs now, in order. The next statement waits for it to finish.

**Asynchronous** operations allow a result to arrive later. The runtime can manage a timer or I/O operation while your JavaScript continues. A callback or promise continuation handles the result later.

```js
console.log("Start");
setTimeout(() => console.log("Timer finished"), 0);
console.log("End");
```

Output: `Start`, `End`, then `Timer finished`.

`setTimeout(..., 0)` does **not** mean “run immediately.” It schedules a callback for a later opportunity. The current synchronous code must finish first. Timer delays are not exact appointment times.

## Event loop, tasks, and microtasks

The **event loop** coordinates when queued work can run.

For the simple examples here:

1. Run the current synchronous code.
2. At the microtask checkpoint, process pending microtasks, including newly added microtasks.
3. Run eligible later work, such as a timer callback, when the runtime schedules it.

Promise `.then()` handlers and `queueMicrotask()` callbacks use microtasks. Timer callbacks are later tasks in the browser model. Node.js has its own event-loop phases, so a single queue picture does not explain all Node behavior.

Expected output of `04-event-loop.js`:

```text
1. Synchronous start
2. Promise executor runs immediately
3. Synchronous end
4. Promise handler (microtask)
5. queueMicrotask callback
6. Timer callback
```

The function passed to `new Promise(...)` runs immediately. Its `.then()` handler runs later as a microtask. Microtasks in this example run in the order they were queued.

Repeatedly adding microtasks can delay other work. Also, Node's `process.nextTick()` and `setImmediate()` have additional scheduling rules; do not apply this beginner example as a universal ordering rule for every API.

## What async and await really do

An `async` function always returns a promise. It runs synchronously until it reaches an `await` that suspends it. `await` pauses that function's continuation while other code can run. It does not stop the whole runtime.

In `05-async-await.js`, a timer simulates a delayed result. There is no real network request.

Expected output:

```text
1. Before calling showUser
2. Loading user...
3. Other code can run
4. User: Asha
5. Loading finished
```

Use `try/catch` around awaited work to handle rejected promises. Making a function `async` does not move heavy calculations to another thread.

## Single thread does not mean nothing else happens

Within one JavaScript execution thread, callbacks execute one at a time. However, the runtime can use the operating system and additional threads to support work such as I/O. Browsers and Node.js also support workers for running JavaScript on other threads.

A long loop still blocks the current JavaScript thread. During that loop, timer callbacks cannot execute on the same thread. In a browser, heavy work on the main thread can also delay page interaction and rendering.

`06-blocking-code.js` deliberately blocks for about 150 milliseconds. Its timer has a zero delay, but its callback runs only after the loop finishes. The measured time varies by machine. This short busy loop is a demonstration, not a recommended waiting technique.

For real CPU-heavy work, consider workers. For large tasks on the main thread, consider splitting work into smaller pieces and yielding between them.

## Node.js provides file-system tools

`07-node-file-system.js` reads this guide with `node:fs/promises`. The path uses `__dirname`, so it works even when you start the script from another directory.

Expected output:

```text
1. Starting file read
2. JavaScript continues while the file is being read
3. First line: # JavaScript Runtime — A Beginner-Friendly Guide
```

The read is asynchronous. Node supplies file access; the language alone does not. The example handles errors and sets a nonzero exit code if reading fails.

## Browser runtime example

Open `08-browser-runtime.html`, then click **Run example**. The browser provides:

- `document` to find and update elements.
- `addEventListener()` to handle clicks.
- `setTimeout()` to schedule later work.

The page shows synchronous messages first, then the promise microtask, then the timer. Open the browser's developer tools Console to see the same messages. Each click starts a fresh demonstration.

## Common mistakes

| Mistake | Better understanding |
| --- | --- |
| JavaScript engine and runtime mean the same thing | The runtime includes an engine and supporting facilities |
| A zero-delay timer runs immediately | It runs later when scheduling allows |
| A promise executor runs asynchronously | The executor runs synchronously; handlers run later |
| `await` blocks the entire program | It suspends the current async function's continuation |
| `async` makes CPU-heavy code nonblocking | Synchronous calculations still occupy the thread |
| Copying an object variable copies its data | It copies the reference |
| Browser JavaScript and Node have identical globals | Their host APIs differ |

## Practice

1. Before running `04-event-loop.js`, predict the output. Then move `queueMicrotask()` above the promise creation and predict it again.
2. Add a second timer to that file. Keep both delays at zero and observe the result in your environment.
3. In `03-heap-and-references.js`, make a separate copy of the nested `address` object. Check whether changing the copy still changes the original.
4. In `05-async-await.js`, reject the simulated request with `reject(new Error("User not found"))` and observe the error handler.
5. Add another button to the HTML page that changes the page's background color through the DOM.

Read the files in number order. Predict the output first, run the example, and explain why each line appears when it does.
