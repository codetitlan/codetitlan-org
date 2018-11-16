Basic use:

```js
<TypeWrite
  lines={["The answer to", "life, the universe and", "everything is: 42"]}
/>
```

Change speed:

```js
<TypeWrite
  speed="fast"
  lines={["The answer to", "life, the universe and", "everything is: 42"]}
/>
```

With a cursor:

```js
<TypeWrite
  cursor
  speed="slow"
  lines={["The answer to", "life, the universe and", "everything is: 42"]}
/>
```

With a custom renderer:

```js
<TypeWrite
  cursor
  speed="slow"
  render={x => (
    <div style={{ color: "red", backgroundColor: "#d0d0d0" }}>{x}</div>
  )}
  lines={["The answer to", "life, the universe and", "everything is: 42"]}
/>
```

Done typing handler

```js
<TypeWrite
  onDoneTyping={() => "Do something here!"}
  lines={["The answer to", "life, the universe and", "everything is: 42"]}
/>
```
