# Event Loop

so event loop in javascript enables non-blocking asynchronous behavior. Its responsible for managing the execution of code, collecting and processing events, and executing queued tasks.

## components of event loop:

1. `Call Stack`: keeps track of function calls. when a function is invoked, its pushed onto the stack. when function finishes execution, its popped off the stack.

2. `Web APIs`: Provides browser features like **setTimeout**, DOM events, and HTTP requests. These APIs handle asynchronous operations.

3. `Task queue/ callback queue/ macrotask queue`: stores tasks waiting to be executed after the call stack is empty. These tasks are queued by **setTimeout** , **setInterval**, or other APIs.

4. `MicroTask queue`: A higher priority queue for **promises** and **MutationObserver** callbacks. Microtasks are executed before tasks in the tasks queue.

5. `Event loop`: continuously checks if the call stack is empty and pushes tasks from the microtask queue or task queue to the call stack for execution.

for a more indepth explanation refer this [medium](https://medium.com/@ignatovich.dm/the-javascript-event-loop-explained-with-examples-d8f7ddf0861d) article.

# Callbacks

Callbacks are the cornerstone of asynchronous operations in javascript. They can be thought of as functions that are executed once a task is completed.

```
function fetchData(callback) {
  setTimeout(function() {
    const data = 'Sample data';
    callback(data);
  }, 2000);
}

function processData(data) {
  console.log('Processed data: ' + data);
}

fetchData(processData);
// After 2 seconds, "Processed data: Sample data" will be logged
```

In this example, the `fetchData` function uses a timer to simulate data retrieval and then calls the `processData` function, enabling asynchronous data processing.
Let’s move on to a more complex example: a script that calculates the damage based on the weapon used by Geralt from The Witcher 3, using callbacks.

```
function fetchCharacterData(characterId, callback) {
  setTimeout(function() {
    // Simulate character data
    const character = {
      id: characterId,
      name: 'Geralt',
      weapon: 'sword',
      level: 35,
      attackPower: 80
    };
    callback(character);
  }, 500);
}

function calculateWeaponDamage(character, weapon, callback) {
  const attackPower = character.attackPower;
  let weaponMultiplier;

  if (weapon === 'sword') {
    weaponMultiplier = 1.5;
  } else if (weapon === 'knife') {
    weaponMultiplier = 1.8;
  } else {
    callback('Invalid weapon');
    return;
  }

  setTimeout(function() {
    const weaponDamage = attackPower * weaponMultiplier;
    callback(null, weaponDamage);
  }, 500);
}

const characterId = 123;
const weaponType = 'knife'; // or 'sword'
fetchCharacterData(characterId, function(character) {
  calculateWeaponDamage(character, weaponType, function(error, weaponDamage) {
    if (error) {
      console.log('Error: ' + error);
    } else {
      console.log(`Weapon damage: ${weaponDamage}`);
    }
  });
});
```

The `calculateWeaponDamage` function calculates the damage Geralt would deal with a knife or sword. We specify the weapon type using the `weapon` parameter. If an invalid weapon type is provided, an error message is returned. We perform the operations sequentially using callbacks. Finally, the calculated weapon damage is logged to the console. As seen in this example, the use of callbacks can lead to complexity known as **callback hell.**
