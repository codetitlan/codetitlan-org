Zero configuration:

```js
<TypeLine>Is 🍕 time for you !!!</TypeLine>
```

Using a render function:

```js
<TypeLine render={x => <h4>{x}</h4>}>Pizza time for me too</TypeLine>
```

Using a onDoneTyping hook:

```js
<TypeLine
  onDoneTyping={() => {
    /* Do stuff */
  }}
>
  I'll do something when I'm done typing this
</TypeLine>
```
