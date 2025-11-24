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

# Promises

Promises simplify asynchronous operations by reducing the complexity of callbacks, making the code more readable. A promise represents a value that may be available now, or in the future, or never.

```
function fetchData() {
  return new Promise(function(resolve, reject) {
    setTimeout(function (data) {
      if (data === "sample data") {
        resolve(data)
      } else {
        reject()
      }
    }, 2000)Let’s now recreate the Geralt example using promises.

function fetchCharacterData(characterId) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      // Simulate character data
      const character = {
        id: characterId,
        name: 'Geralt',
        level: 35,
        weapon: 'sword',
        attackPower: 80
      };
      if (character) {
        resolve(character);
      } else {
        reject('Character data not retrieved');
      }
    }, 500);
  });
}

function calculateWeaponDamage(character, weapon) {
  return new Promise(function(resolve, reject) {
    const attackPower = character.attackPower;
    let weaponMultiplier;

    if (weapon === 'sword') {
      weaponMultiplier = 1.5;
    } else if (weapon === 'knife') {
      weaponMultiplier = 1.8;
    } else {
      reject('Invalid weapon');
      return;
    }

    setTimeout(function() {
      const weaponDamage = attackPower * weaponMultiplier;
      resolve(weaponDamage);
    }, 500);
  });
}

const characterId = 123;
const weaponType = 'knife'; // or 'sword'

fetchCharacterData(characterId)
  .then(function(character) {
    return calculateWeaponDamage(character, weaponType);
  })
  .then(function(weaponDamage) {
    console.log(`Weapon damage: ${weaponDamage}`);
  })
  .catch(function(error) {
    console.log('Error: ' + error);
  });
  })
}

fetchData()
.then(function(xyz){
  console.log(xyz)  // sample data
})
.catch(function() {
  console.log('error, invalid data')
})
```

Let’s now recreate the Geralt example using promises.

```
function fetchCharacterData(characterId) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      // Simulate character data
      const character = {
        id: characterId,
        name: 'Geralt',
        level: 35,
        weapon: 'sword',
        attackPower: 80
      };
      if (character) {
        resolve(character);
      } else {
        reject('Character data not retrieved');
      }
    }, 500);
  });
}

function calculateWeaponDamage(character, weapon) {
  return new Promise(function(resolve, reject) {
    const attackPower = character.attackPower;
    let weaponMultiplier;

    if (weapon === 'sword') {
      weaponMultiplier = 1.5;
    } else if (weapon === 'knife') {
      weaponMultiplier = 1.8;
    } else {
      reject('Invalid weapon');
      return;
    }

    setTimeout(function() {
      const weaponDamage = attackPower * weaponMultiplier;
      resolve(weaponDamage);
    }, 500);
  });
}

const characterId = 123;
const weaponType = 'knife'; // or 'sword'

fetchCharacterData(characterId)
  .then(function(character) {
    return calculateWeaponDamage(character, weaponType);
  })
  .then(function(weaponDamage) {
    console.log(`Weapon damage: ${weaponDamage}`);
  })
  .catch(function(error) {
    console.log('Error: ' + error);
  });
```

# Async/Await

Async/Await, offers a more modern approach to handling asynchronous operations. Async functions allow for a natural and readable sequence of operations.

```
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      const data = "sample data";
      if (data) {
        resolve(data)
      } else {
        reject("data not retrieved")
      }
    })
  }
}

async function processAsynData() {
  try {
    const data = await fetchData();
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}

processAsyncData();
```

read more at this [medium](https://medium.com/@mkare/asynchronous-programming-in-javascript-callbacks-promises-and-async-await-ef683398b455) article.

## Promise methods

| Method                      | What it Does                                 | Example                                              |
| --------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| `Promise.resolve(value)`    | Creates a Promise that resolves immediately. | `Promise.resolve(5).then(console.log)`               |
| `Promise.reject(error)`     | Creates a Promise that rejects immediately.  | `Promise.reject("err").catch(console.log)`           |
| `promise.then()`            | Runs on success.                             | `fetch(url).then(res => console.log(res))`           |
| `promise.catch()`           | Runs on error.                               | `fetch(url).catch(err => console.error(err))`        |
| `promise.finally()`         | Runs whether resolved/rejected.              | `fetch(url).finally(() => console.log("done"))`      |
| `Promise.all([...])`        | Wait for all to succeed, fail if one fails.  | `Promise.all([p1,p2]).then(console.log)`             |
| `Promise.allSettled([...])` | Wait for all, return statuses.               | `Promise.allSettled([p1,p2]).then(console.log)`      |
| `Promise.race([...])`       | First promise to settle wins.                | `Promise.race([a,b]).then(console.log)`              |
| `Promise.any([...])`        | First fulfilled promise wins.                | `Promise.any([a,b]).then(console.log)`               |
| `Promise.withResolvers()`   | Gives `{promise, resolve, reject}`.          | `const {promise, resolve} = Promise.withResolvers()` |
