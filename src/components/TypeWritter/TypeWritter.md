Basic use:

```js
<TypeWritter
  lines={["The answer to", "life, the universe and", "everything is: 42"]}
/>
```

Change speed:

```js
<TypeWritter
  speed="fast"
  lines={["The answer to", "life, the universe and", "everything is: 42"]}
/>
```

With a cursor:

```js
<TypeWritter
  cursor
  speed="slow"
  lines={["The answer to", "life, the universe and", "everything is: 42"]}
/>
```

With a custom renderer:

```js
<TypeWritter
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
<TypeWritter
  onDoneTyping={() => "Do something here!"}
  lines={["The answer to", "life, the universe and", "everything is: 42"]}
/>
```
