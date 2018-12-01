Zero configuration:

```js
<ChatMessageBox>Is 🍕 time for you !!!</ChatMessageBox>
```

Using a render function:

```js
<ChatMessageBox render={x => <h4>{x}</h4>}>
  Pizza time for me too
</ChatMessageBox>
```

Using a onDoneTyping hook:

```js
<ChatMessageBox
  onDoneTyping={() => {
    /* Do stuff */
  }}
>
  I'll do something when I'm done typing this
</ChatMessageBox>
```
