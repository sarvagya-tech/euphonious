# Music App — Learning Checklist

Track concepts and features as you build. Check items when you can explain them in your own words, not only when the code "works."

---

## Phase 1: JavaScript & React foundations

- [ ] **Variables & state** — Difference between `let`, `const`, and React `useState`
- [ ] **Functions** — Sync vs `async` functions; what `return` does when omitted
- [ ] **Objects & optional chaining** — Why `result?.data?._id` instead of `result.data._id`
- [ ] **Arrays & `.map()`** — Rendering lists in JSX; why `key` matters
- [ ] **Events** — `e.preventDefault()` on forms; controlled inputs (`value` + `onChange`)
- [ ] **Conditional rendering** — `&&`, ternary, or separate components for different UI modes

### Understanding check (explain aloud or in writing)

- What happens if `useState` is called inside an `if` block? Why is that invalid?
- When does a component re-render?

---

## Phase 2: Routing & navigation (your `App.jsx` + pages)

- [ ] **React Router** — `Route`, `path`, dynamic segments (`:id`)
- [ ] **`useNavigate`** — Programmatic navigation after create/join room
- [ ] **URL params vs state** — `navigate('/room/123', { state: { joinCode } })` vs reading from URL only
- [ ] **Redirects** — `<Navigate to="..." replace />` and when to use `replace`

### Research prompts

- What happens if the user refreshes on `/room/:id`? Is `location.state` still there?
- How else could you pass the join code besides `state` and `sessionStorage`?

---

## Phase 3: API calls & auth (services layer)

- [ ] **HTTP basics** — GET vs POST; status codes (200, 401, 404, 500)
- [ ] **Axios/fetch** — Request body, headers, error shape (`err.response?.data`)
- [ ] **Async flow in handlers** — `try/catch`, loading states, user feedback (`toast`)
- [ ] **Tokens / sessions** — Where auth tokens live; how protected routes might work

### Debugging practice

- Log the full `err` object once, then only the fields you need
- Use Network tab: request URL, payload, response body

---

## Phase 4: Room selection (`RoomSelection.jsx`)

- [ ] **UI modes** — Single component, multiple "screens" via `mode` state
- [ ] **Form validation** — Client-side checks before API call (trim, length, required fields)
- [ ] **Normalization** — Why `code.trim().toUpperCase()` before sending
- [ ] **`sessionStorage`** — Purpose of `roomJoin:${id}`; lifetime vs `localStorage`

### Edge cases to think through

- [ ] User submits empty room name
- [ ] API returns success but no `_id`
- [ ] User joins with wrong code — what does the server return?
- [ ] User opens two tabs and creates two rooms

---

## Phase 5: Real-time room (sockets, chat, player)

- [ ] **WebSockets / Socket.io** — Connection, emit, listen; cleanup on unmount
- [ ] **Shared state** — Who owns "now playing"? Server vs client
- [ ] **Component composition** — `ChatBox`, `MembersList`, `RoomPlayer` responsibilities
- [ ] **Lists in UI** — Scrolling chat; avoiding stale closures in socket handlers

### Nuanced questions

- What if two users skip the track at the same time?
- How do you avoid memory leaks when leaving a room?

---

## Phase 6: Best practices (ongoing)

- [ ] **Naming** — Handlers: `handleCreateRoom`; booleans: `isLoading`, not `loadingFlag`
- [ ] **Small components** — One main job per file
- [ ] **Don't repeat yourself** — Shared validation or API error messages in one place
- [ ] **Accessibility** — Labels on inputs, keyboard submit on forms

---

## Resources (search keywords included)

| Topic | Where to start | Search tip |
|-------|----------------|------------|
| React state | [React: State](https://react.dev/learn/state-a-components-memory) | `react useState controlled input` |
| React Router v6 | [React Router docs](https://reactrouter.com/en/main) | `react router useNavigate params` |
| Async JS | [MDN: async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises) | `javascript try catch async function` |
| Socket.io client | [Socket.io client API](https://socket.io/docs/v4/client-api/) | `socket.io react useEffect cleanup` |
| HTTP debugging | Browser DevTools → Network | `chrome devtools failed fetch cors` |

---

## Your next small steps (suggested order)

1. Trace one user flow on paper: Login → Room selection → Create room → Land on `/room/:id`
2. For each arrow, write: which file, which function, what data moves
3. Pick **one** unchecked box above; implement or refactor only that slice
4. Explain the slice to yourself (or ask me to quiz you)

---

## Session log (optional)

Use this space to note what you learned each session:

| Date | Topic | Still fuzzy on |
|------|-------|----------------|
|      |       |                |
