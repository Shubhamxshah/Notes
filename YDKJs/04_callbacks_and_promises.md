# Event Loop

so event loop in javascript enables non-blocking asynchronous behavior. Its responsible for managing the execution of code, collecting and processing events, and executing queued tasks.

## components of event loop:

1. `Call Stack`: keeps track of function calls. when a function is invoked, its pushed onto the stack. when function finishes execution, its popped off the stack.

2. `Web APIs`: Provides browser features like **setTimeout**, DOM events, and HTTP requests. These APIs handle asynchronous operations.

3. `Task queue/ callback queue/ macrotask queue`: stores tasks waiting to be executed after the call stack is empty. These tasks are queued by **setTimeout** , **setInterval**, or other APIs.

4. `MicroTask queue`: A higher priority queue for **promises** and **MutationObserver** callbacks. Microtasks are executed before tasks in the tasks queue.

5. `Event loop`: continuously checks if the call stack is empty and pushes tasks from the microtask queue or task queue to the call stack for execution.

for a more indepth explanation refer this [medium](https://medium.com/@ignatovich.dm/the-javascript-event-loop-explained-with-examples-d8f7ddf0861d) article.
