# heartbeat.js

Repeat a function on an interval. heartbeat.js ensures that the interval restarts only *after* your function is
complete. It supports both synchronous and asynchronous functions.

## Getting Started

Get the source by [direct download](https://github.com/jmeas/heartbeat.js/blob/master/heartbeat.min.js), by cloning this repository, or through [Bower](http://bower.io/).

`bower install heartbeat.js`

## Usage

Use heartbeat by creating a new instance of it.

```js
var heartbeat = new Heartbeat({
  // Configure your options here
});
```

## Options

You can pass options to modify the behavior of a heartbeat.

### fn
Type: `function`  
Default: `function() {}`

The function to be executed on an interval.

### async
Type: `boolean`  
Default: `false`

Toggle asynchronous mode with this option. For more, refer to the example usage section.

### context
Type: `object`  
Default: `window`

The value of `this` within the function.

### args
Type: `array`  
Default: `[]`

An array of arguments to supply to the executed function. To support dynamic options,
you'll need to make a proxy function. See the examples section for more.

### interval
Type: `number`  
Default: `1000`

The frequency of executing the function in milliseconds.

### autostart
Type: `boolean`  
Default: `false`

Whether to start upon instantiation or not.

### leading
Type: `boolean`  
Default: `false`

Heartbeats will not execute the function when it is started until one interval passes. Pass `true` for this option to fire the function immediately on start up.

### trailing
Type: `boolean`  
Default: `false`

When a heartbeat is stopped the function will immediately stop being called. Pass `true` for this option to execute the function a final time *after* the heartbeat has stopped.

## Heartbeat.prototype

These methods comprise the API for working with a heartbeat.

##### `start()`

Start the heartbeat.

##### `stop()`

Stop the heartbeat.

##### `alive()`

A boolean that represents whether the heartbeat is started or stopped.

##### `setFn( fn )`

Set a new function to be executed.

##### `setInterval( interval )`

Specify a new interval. Takes effect the next time the function is called.

##### `setContext( context )`

Change the context of the function being called.

##### `periodCalls()`

The number of times the function has been called since the last `stop`.

##### `totalCalls()`

The total number of times the heartbeat has called the function.

##### `startCount()`

The number of times the heartbeat has been started.

##### `stopCount()`

The number of times the heartbeat has been stopped.

##### `resolve()`

For async mode only. Call this when your asynchronous function has completed to
start the next polling interval. See the async usage section for more.

## Examples

### Async Functions

Asynchronous, slow functions cause problems for polling methods. Consider the example of the execution time of the
async function being longer than the polling interval. Because of this possibility, heartbeat.js has a separate mode for handling asynchronous code.

```js
// Set up your heartbeat in async mode
var heartbeat = new Heartbeat({
  fn: someAsyncFn,
  async: true
});
```

In this mode the polling interval will not automatically reset itself when the function is called. Instead, it waits for you to tell
it when the deferred has been resolved. Do this by executing the `resolve` function.

```js
// Call this when the asynchronous function completes
heartbeat.resolve();
```

#### Example with promises

It's typical to track the progress of asynchronous Javascript functions with promises. In this example we'll take a look
at a common use-case: short polling using `jQuery.ajax`.

```js
// The function we're passing to our heartbeat
var fetch = function() {
  
  // Do something asynchronous that generates a promise-like object
  var deferred = $.get( "//api.com/route" );

  // When the async function is done inform the heartbeat
  deferred.always(function() {
    heartbeat.resolve();
  });

};

var heartbeat = new Heartbeat({
  fn: fetch,
  async: true
});
```

### Dynamic arguments

To pass dynamic arguments you'll need a proxy function.

```js
var heartbeat = new Heartbeat({
  fn: proxyFn
});

var proxyFn = function() {
  var dynamicArg = getDynamicArg();
  actualFn( dynamicArg );
}
```

## Browser Support

Tested in IE8+. May also work in IE6 and 7.
