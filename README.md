# BFS — Buddy For Study  
A modular, client-side productivity suite for students, built with vanilla JavaScript.

BFS (Buddy for Study) is a browser-based productivity system consisting of four independently implemented modules:  
**Task Splitter**, **StudySprint Timer**, **FocusRoom**, and **CarePack Generator**.  

The project follows a **component-oriented architecture** implemented without frameworks, bundlers, or external dependencies.

---

## ⚙️ Architectural Overview

BFS is built using a **strict separation of concerns**:

### **1. Core Shell (Root Layer)**
- `index.html` — base layout, screen containers, navigation
- `style.css` — theme, typography, layout, component styling
- `script.js` — runtime bootstrap + screen router

### **2. Component Layer (`/components`)**
Each tool is a self-contained module attached to `window`, with private internal state:

| Component | File | Purpose |
|----------|------|---------|
| Task Splitter | `tasks.js` | Rule-based decomposition of assignments into steps |
| StudySprint Timer | `timer.js` | Pomodoro engine + reflection workflow |
| FocusRoom | `focus.js` | Distraction-free mode + DOM locking |
| CarePack | `carepack.js` | Randomized wellbeing micro-routine generator |

Modules expose their API via `window.{ModuleName}` and initialize on DOM load.

### **3. Utility Layer (`/utils`)**
| File | Role |
|------|------|
| `helpers.js` | escapeHtml, date formatting, shared utilities |
| `storage.js` | localStorage abstraction for reflections + carepacks |

### **4. Assets (`/assets`)**
- `logo.svg` — custom BfS monogram (developer UI style)

---

## 🧩 Component Documentation

### **Task Splitter (`components/tasks.js`)**
Implements a deterministic task breakdown pipeline:
- difficulty classification → estimated hours  
- base step template → dynamic slicing  
- rendering pipeline → DOM injection  
- optional export → `.txt` download  
- integration hook → triggers FocusRoom with first step payload  

Contains a small HTML sanitizer (`escapeHtml`) and download utility.

---

### **StudySprint Timer (`components/timer.js`)**
Implements a classic Pomodoro scheduler:
- 1500s focus window → 300s break window  
- toggleable start/pause  
- reset control  
- cycle completion → reflection modal  
- reflection persistence via `StorageUtil.pushReflection()`  

UI state is updated every second via `setInterval`.

---

### **FocusRoom (`components/focus.js`)**
Implements a “distraction-free layer”:
- hides non-essential elements  
- disables all navigation buttons  
- applies global dimming filter  
- optional dynamic title (payload from Task Splitter)  
- breathing animation (CSS-driven)  

Exposes `enterFocusMode(payload)` to external modules.

---

### **CarePack Generator (`components/carepack.js`)**
Randomized selection of 3 predefined wellbeing micro-actions.

- Shuffles pool using Fisher–Yates variant  
- Renders care cards for each item  
- Optional persistence in local storage  

---

## 🗄️ Storage Layer

BFS uses only **localStorage**, abstracted through a minimal wrapper:

### Reflections
Key: `bfs_reflections`  
Value: Array of `{text, time, mode}`

### CarePack History
Key: `bfs_carepacks`  
Value: Array of `{pack, time}`

No external servers → privacy-preserving by design.

---

## 🎨 UI/UX Notes

- Dark developer-tool aesthetic  
- Semi-flat design with controlled shadows  
- Purple gradient accents  
- Optimized for readability at low brightness  
- No external fonts except Inter via Google Fonts  

The interface is responsive without a CSS framework.

---

## 🚀 Deployment (GitHub Pages)

This project is deployed via GitHub Pages:

