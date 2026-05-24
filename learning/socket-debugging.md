# Socket Join & Chat — Debug Checklist

Use this when "join room" or "send message" doesn't work.

---

## Step 1: Browser console (first stop)

- [ ] Open DevTools → Console before entering a room
- [ ] Look for red errors (especially `ReferenceError`, `undefined`)
- [ ] Note the file name and line number

---

## Step 2: Trace the join flow

| Step | Where | What to verify |
|------|--------|----------------|
| HTTP join | `RoomSelection.jsx` | API `joinRoom` succeeded; code saved to `sessionStorage` |
| Navigate | Router | URL is `/room/:id` |
| Socket connect | `Room.jsx` → `connectSocket()` | Backend logs "User connected" |
| Socket join | `Room.jsx` → `joinRoom(...)` | `roomId`, `userId`, **`code`** all defined |
| Server accept | Backend `socket.js` | No `joinError`; user added to Socket.io room |

---

## Step 3: Trace the message flow

| Step | Where | What to verify |
|------|--------|----------------|
| Send | `ChatBox.jsx` → `sendMessage(...)` | `roomId`, `userId`, message text not empty |
| Server | Backend `sendMessage` handler | Message saved; `newMessage` emitted to room |
| Receive | `Room.jsx` listener | `socket.on("newMessage", ...)` runs |
| Display | `ChatBox.jsx` render | Property names match what `addMessage` stores |

---

## Fixes to implement yourself

- [ ] **Room.jsx** — Define `code` before passing to `joinRoom` (where is it stored after HTTP join?)
- [ ] **Room.jsx** — Listen for `joinError` and log or toast the message
- [ ] **ChatBox.jsx** — Align render field with store shape (`text` vs `message`)
- [ ] **Optional** — Emit `joinRoom` only after socket `connect` event

---

## Understanding check

1. Why does the backend reject join when `code` is missing for a non-host?
2. If `socket.join(roomId)` never runs, will `io.to(roomId).emit("newMessage")` reach you?
3. Why might messages "send" (no error) but not appear on screen?
