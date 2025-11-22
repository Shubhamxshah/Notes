1. Hoisting in javascript is behavior where var and function declarations are moved to the top of the scope (either global scope or functions scope respectively;) before the code is executed.
2. Closure: you can think of closure as a way to 'remember' and continue to access a function's scope (its variables) even once the function has finished running.
   Consider:

```
<Right>function makeAdder(x) {
    // parameter `x` is an inner variable

    // inner function `add()` uses `x`, so
    // it has a "closure" over it
    function add(y) {
        return y + x;
    };

    return add;
}
```

The reference to the inner add(..) function that gets returned with each call to the outer makeAdder(..) is able to remember whatever x value was passed in to makeAdder(..). Now, let’s use makeAdder(..):

```
// `plusOne` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusOne = makeAdder( 1 );

// `plusTen` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusTen = makeAdder( 10 );

plusOne( 3 );       // 4  <-- 1 + 3
plusOne( 41 );      // 42 <-- 1 + 41

plusTen( 13 );      // 23 <-- 10 + 13
```

### Modules Pattern

most common usage of closure is module pattern. Modules let you define private implementation details(variables, functions) that are hidden from the outside world, as well as a public api thats accessible from outside.

consider:

```
function User() {
  var username, password;

  function doLogin(user, pw) {
    username = user;
    password = pw;

    // do rest of function
  }

  var publicAPI = {
    login: doLogin
  }

  return publicAPI;
}

var fred = User();
fred.login('shubhamxshah', 'shub01')
```

```

```

normally when a function completes running its variables diappear, but doLogin survives, because a reference to it is stored in fred.login()

so here javascript says:

```
  hey, this function (`doLogin`) still needs access to username, and password so i still have to keep them alive.
```

This keep alive moment is closure.
`doLogin` still remembers `username` and `password`, even though `User()` finished executing.

3. Prototypes are fallback mechanisms in object when linked to another project done on creation or otherwise: for e.g.

```
var foo = {
    a: 42
};

// create `bar` and link it to `foo`
var bar = Object.create( foo );
foo.c = "shubham"
bar.b = "hello world";

bar.b;      // "hello world"
bar.a;      // 42
bar.c;      // "shubham"
```
