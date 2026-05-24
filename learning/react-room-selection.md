# Room Selection Page — Feature & Concept Checklist

Focused on `RoomSelection.jsx` and related services. Use this while you implement or review your own code.

---

## Concepts to understand

- [ ] **Component as a small state machine** — `mode`: `'selection' | 'create' | 'join'` drives which UI shows
- [ ] **Controlled inputs** — `value={roomName}` + `onChange` keeps React as source of truth
- [ ] **Prevent default form submit** — Full page reload without `e.preventDefault()`
- [ ] **Destructuring API responses** — `result?.data?._id` and why guards exist
- [ ] **Navigation after success** — Order: store code → navigate → toast (does order matter for UX?)

---

## Features to implement / verify yourself

- [ ] Create room: name + description → API → navigate with room id
- [ ] Join room: room id + 6-char code → validate → API → navigate
- [ ] Back/cancel from create or join returns to selection mode
- [ ] User-visible errors for network and validation failures
- [ ] Loading/disabled submit while request in flight (optional enhancement)

---

## Pseudocode skeleton (fill in yourself)

```
function RoomSelection():
  state: mode, roomName, description, code, joinRoomId

  onCreateSubmit(e):
    prevent default
    if roomName invalid: show error; return
    try:
      result = await createRoom(...)
      id = extract id from result safely
      if no id: error; return
      optionally save code to sessionStorage
      navigate to /room/{id} with state
      success toast
    catch:
      error toast from server message

  onJoinSubmit(e):
    // your turn: list validation steps before await joinRoom(...)
```

---

## Debug checklist (when something breaks)

- [ ] Network tab: Is the request sent? Correct URL and body?
- [ ] Console: Any red errors before the request?
- [ ] Is `roomName` / `code` what you expect? (`console.log` right before the API call)
- [ ] Response shape: Does backend return `data._id` or a different field name?
- [ ] After navigate: Does `/room/:id` page read `state` or `sessionStorage`?

---

## Questions to research or ask your tutor

1. Why use `sessionStorage` for the join code instead of only `navigate` state?
2. What are trade-offs of storing secrets/tokens in `sessionStorage` vs httpOnly cookies?
3. How would you add a "copy room code" button after create?
4. What happens if `createRoom` succeeds but navigation fails?

---

## Understanding check

Answer without looking at code:

1. What does `setMode('create')` do to what the user sees?
2. Why might `normalizedCode.length !== 6` run before the server is called?
3. What is the difference between `joinRoomId` and the room `id` in the URL after navigate?
