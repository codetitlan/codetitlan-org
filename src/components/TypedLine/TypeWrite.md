Zero configuration:

```js
<TypeWrite>Is 🍕 time for you !!!</TypeWrite>
```

Custom timers:

```js
<TypeWrite min={100} max={200}>
  I want some 🍕 too !!!
</TypeWrite>
```

Using a render function:

```js
<TypeWrite render={x => <h4>{x}</h4>}>Pizza time for me too</TypeWrite>
```

Using a onDoneTyping hook:

```js
<TypeWrite
  onDone={() => {
    /* Do stuff */
  }}
>
  I'll do something when I'm done typing this
</TypeWrite>
```
