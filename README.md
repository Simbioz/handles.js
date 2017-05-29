# handles.js

Releaseable handles! Wrap an action to perform later.

# Installation

    npm install --save handles.js

# Usage

```javascript
let handle = new Handle(()=> console.log("Handle released!"));
handle.release(); // Logs "Handle released!"

let counterHandle = new CounterHandle(2, () => console.log("Counter Handle Released!"));
handle.release(); // Does nothing
handle.release(); // Logs "Counter Handle Released!"
```
