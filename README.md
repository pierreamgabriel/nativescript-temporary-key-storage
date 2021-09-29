# NativeScript Temporary Key Storage

I wrote this simple plugin for my use, and it works well for what it's intended for. It temporarily stores a key in an SQLCipher database. The database uses a random encryption key that changes in a predefined period, and it'll keep changing its key for as long as the app is running. Once the user or system kills the app, the user will need to provide his password again.

## Installation

```bash
tns plugin add nativescript-temporary-key-storage
```

## Usage

Import the plugin:

```javascript
import { keyStorage, processDb } from 'nativescript-temporary-key-storage';
```

Storing the key:

```javascript
keyStorage(myKeyGoesHere, 60000);
```

Here we're calling the `keyStorage` function passing two arguments. The first one is the key itself, and the second is the amount of time (milliseconds) you want the database to change its encryption key. This function should be called right after the user logs in, so you can retrieve his key whenever your app needs it. 

Getting the key:

```javascript
let mainKey = {key:""};
let requestKey = new processDb();
    requestKey.getKey(); 
    setTimeout(function() { 
        mainKey.key = requestKey.returnKey();
         if (mainKey.key === ""){
       // Do something here!
    } else {
      // Do something else!
    }
    },0);    
```    

We need to request the key inside a setTimout function; otherwise, it will return nothing. We also need to check if any key was returned, and that's why we used `if (mainKey.key === "")` in our example. 
