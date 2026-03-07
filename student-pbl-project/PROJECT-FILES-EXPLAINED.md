# Project Files – Simple Explanation (Easy Student Understanding)

This document explains **each file** in the Rapid Care Blood Distribution Network project: **what it contains**, **what it does**, and **why it is used**. Use this for your own understanding and for viva.

---

## Folder Structure (Overview)

```
student-pbl-project/
├── index.html          ← Main page (what user sees first)
├── styles.css          ← All colors, layout, design
├── script.js           ← All actions: tabs, forms, add/search/sort
├── README.md           ← Project info & how to run
├── PBL-PPT-Guide.md    ← Guide to make your PPT slides
├── PROJECT-FILES-EXPLAINED.md  ← This file
├── java-dsa/                  ← Java DSA: LinkedList, Stack, Queue, Hashing
│   ├── BloodRequest.java
│   ├── BloodDistributionDSA.java
│   └── README.md
└── dsa-version/        ← Sub-folder for Status 3 (DSA)
    ├── index.html      ← Same kind of page, with DSA buttons
    └── script-dsa.js   ← Same actions + Stack, Queue, Search, Sort (with console output)
```

---

## 1. index.html

**What it is:**  
The **main webpage** of your project. It is the **structure** of the page – like a skeleton.

**What is written in it:**
- **Header** – The dark gray bar at top with text “RapidCare Blood Distribution Network Platform”.
- **Navigation** – The gray bar with 5 links: Home, Login, Register, Donor, Stock. Each link has a `data-tab` value (e.g. `data-tab="home"`) so JavaScript knows which section to show.
- **Five panels (sections):**
  - **Home** – Welcome text + input boxes (Blood Group, Units, Hospital) + Add Request button + Search / Sort / Clear buttons + list where requests appear.
  - **Login** – Welcome + form with Email/Username and Password + Login button.
  - **Register** – Welcome + form with Name, Email, Phone, Blood Group, City + Register button.
  - **Donor** – Welcome + table of sample donors (Name, Blood Group, Contact, Last Donated) + a small info card.
  - **Stock** – Welcome + table of blood stock (Blood Group, Units, Location, Last Updated).
- **Footer** – Red bar at bottom with “© 2026 RapidCare | All Rights Reserved”.
- At the end, a line that loads **styles.css** (for design) and **script.js** (for actions).

**What this file does / Purpose:**
- Defines **what appears on the screen**: headings, inputs, buttons, forms, tables.
- Gives **ids** to important elements (e.g. `id="bloodGroup"`, `id="requestList"`) so **script.js** can find them and add behavior.
- Does **not** handle clicks or logic – that is in **script.js**.

**In simple words:**  
“index.html = the structure and content of the page. It says *what* is there, not *what happens* when you click.”

---

## 2. styles.css

**What it is:**  
The **styling file**. It controls **how the page looks**: colors, spacing, font size, layout.

**What is written in it:**
- **Reset** – `* { margin: 0; padding: 0; box-sizing: border-box; }` so every element starts with same spacing.
- **Body** – Background color (light gray), font, full height.
- **Header (`.site-header`)** – Dark gray background (#2c3e50), white text, centered, padding.
- **Navigation (`.site-nav`)** – Slightly lighter gray (#34495e), links in a row, spacing.
- **Main area (`.site-main`)** – Light gray background (#ecf0f1), padding.
- **Panels (`.panel`)** – Hidden by default; **`.panel.active`** is shown (used for tab switching).
- **Content box** – White box, rounded corners, shadow. Variants: normal, narrow (Login), wide (Register, Donor, Stock).
- **Welcome section** – Title and paragraph style.
- **Form styles** – Labels, inputs, full-width button (`.btn-block`).
- **Tables (`.data-table`)** – Header row dark gray, rows with borders, hover effect.
- **Buttons** – Primary (red), secondary (gray). Hover color change.
- **List of requests** – Each item with left red border, Remove button style.
- **Search result** – Green when found, red when not found.
- **Footer (`.site-footer`)** – Red background, white text, centered.

**What this file does / Purpose:**
- Makes the page look **clean and professional** (gray header/nav, red accents, readable fonts).
- Makes **tabs work visually**: only the active panel is shown.
- Makes **forms and tables** easy to read and use.

**In simple words:**  
“styles.css = the design of the page. It decides colors, size, and layout. It does not handle clicks or data.”

---

## 3. script.js

**What it is:**  
The **behavior file**. It makes the page **do something** when the user clicks or submits forms.

**What is written in it (in simple terms):**

1. **Tab navigation**
   - Finds all nav links (Home, Login, Register, Donor, Stock) and all panels.
   - When you **click** a link, it:
     - Stops the default jump (`e.preventDefault()`).
     - Removes `active` from all links and adds `active` to the clicked link.
     - Hides all panels and shows only the panel that matches the link (e.g. Login → `panel-login`).
   - So clicking “Login” shows the Login section, etc.

2. **Login form**
   - When you click **Login**, it checks if email and password are filled.
   - If yes, it shows a green message “Login submitted successfully! (Demo – no backend)” and clears the form.
   - If no, it shows a red error message.
   - No real server – only for demo.

3. **Register form**
   - When you click **Register**, it checks Name, Email, City (required).
   - If ok, shows green “Registration successful! We will contact you when needed.” and clears the form.
   - If not, shows red error.

4. **Home – Blood distribution requests**
   - **Variable:** `requests` = array that holds all requests (e.g. "A+ | 2 units | Apollo Hospital").
   - **Add:** Reads Blood Group, Units, Hospital; if all filled, adds one string to `requests` and updates the list on screen.
   - **Display:** `renderRequests()` clears the list in HTML and creates one `<li>` per request with a Remove button.
   - **Remove (single):** Clicking Remove on an item removes that index from `requests` and redraws the list.
   - **Search:** Asks user for a search word; loops through `requests` (linear search); shows “Found” or “Not found” message.
   - **Sort:** Sorts `requests` alphabetically and redraws the list.
   - **Clear All:** Asks confirmation; if yes, clears `requests` and the list.

**What this file does / Purpose:**
- **Switches tabs** when you click Home, Login, Register, Donor, Stock.
- **Handles form submit** for Login and Register and shows success/error messages.
- **Manages the request list** on Home: add, remove, search, sort, clear using an **array** and **DOM updates**.

**In simple words:**  
“script.js = the brain. It reacts to clicks and form submit, updates the screen, and keeps the list of blood requests in memory (array).”

---

## 4. dsa-version/index.html

**What it is:**  
The **same kind of page** as the main `index.html`, but used for **Status 3 (DSA demo)**. It has the **same** header, nav, welcome text, and request form, plus **extra buttons** for DSA.

**What is written in it:**
- Same header: “RapidCare Blood Distribution Network Platform”.
- Same nav (Home links back to main project).
- Welcome section with an extra line: “DSA Version — Stack, Queue, Search & Sort”.
- Same inputs: Blood Group, Units, Hospital + Add Request.
- **Extra buttons:** “Undo (Stack)” and “Process Next (Queue)” in addition to Search, Sort, Clear.
- Same list area for requests.
- A note: “Open Browser Console (F12) to see DSA output.”
- It loads **../styles.css** (same design as main) and **script-dsa.js** (not script.js).

**What this file does / Purpose:**
- Provides a **separate page** to demonstrate **DSA concepts** (Stack, Queue, Search, Sort) with console output.
- Keeps the **same look** as the main project so the theme is consistent.

**In simple words:**  
“dsa-version/index.html = the DSA demo page. Same layout as main page, but uses script-dsa.js so you can show Undo, Process Next, and console logs.”

---

## 5. dsa-version/script-dsa.js

**What it is:**  
The **behavior file for the DSA version**. It does everything **script.js** does for the request list, plus **Stack**, **Queue**, **Linear Search**, and **Bubble Sort**, and **prints DSA-related messages in the console**.

**What is written in it (main ideas):**

1. **Array / List**
   - `requests` = array of blood distribution requests.
   - When we add, remove, or display, we use this array. Console logs: `[DSA] Array: Current blood distribution requests → [...]`.

2. **Stack (Undo)**
   - `undoStack` = another array used like a **stack** (LIFO – Last In, First Out).
   - When we **Add** a request, we also **push** it onto `undoStack`.
   - **Undo** button: **pop** from `undoStack` (get last added), remove that request from `requests`, and update the list.
   - Console: `[DSA] Stack: Pushed request for undo` and `[DSA] Stack: Undo: removed request`.

3. **Queue (Process Next)**
   - We use `requests` as a **queue** (FIFO – First In, First Out).
   - **Process Next** button: **shift** the first element from `requests` (first added = first processed) and update the list.
   - Console: `[DSA] Queue: Processed next request (FIFO)`.

4. **Linear Search**
   - When user clicks Search, we take the search word and **loop through** `requests` from start to end.
   - If we find a match, we show “Found” and log in console; else “Not found” and log.

5. **Bubble Sort**
   - When user clicks Sort, we **sort** `requests` using **bubble sort** (compare adjacent elements and swap if wrong order), then update the list.
   - Console: `[DSA] Sort: Bubble sort applied to requests`.

**What this file does / Purpose:**
- Implements **DSA concepts** required for Status 3: Array/List, Stack, Queue, Searching, Sorting.
- **Console output** helps you **show** in the demo that these operations are happening (F12 → Console).

**In simple words:**  
“script-dsa.js = same as script.js plus DSA. Undo = Stack (last in, first out). Process Next = Queue (first in, first out). Search = linear search. Sort = bubble sort. All DSA actions are printed in the console.”

---

## 6. README.md

**What it is:**  
A **short project description** and **how to run** the project. It is for you and for anyone who opens the project folder.

**What is written in it:**
- Your name and roll number placeholders.
- Project title: Rapid Care Blood Distribution Network Platform.
- **How to run:** Open `index.html` in browser for main project; open `dsa-version/index.html` for DSA, and use F12 for console.
- **Project structure** (list of files and folders).
- **What the project does** (add request, list, search, sort, Login/Register demo, Donor/Stock tables).
- **DSA concepts** used in the DSA version (Array/List, Stack, Queue, Search, Sort).
- **For Expo/Viva** – short tips on what to say for FWD and DSA.

**What this file does / Purpose:**
- Helps you **remember** how to run the project and what each part does.
- You can **show it** to faculty or use it to prepare viva answers.

**In simple words:**  
“README.md = project summary and instructions. Use it to run the project and to explain it in the expo.”

---

## 7. PBL-PPT-Guide.md

**What it is:**  
A **step-by-step guide** to create your **PBL PPT** (20–30 slides).

**What is written in it:**
- **Slide 1:** Title – Name, Roll No., Project Title, KLH Logo.
- **Slide 2–3:** Abstract.
- **Slides 4–6:** Existing system vs Proposed system.
- **Slides 7–10:** Project modules (UI, Request management, Search & Sort, DSA version).
- **Slides 11–16:** Where to put screenshots (home, login, register, donor, stock, DSA console).
- **Slides 17–18:** Conclusion and future scope.
- **Slides 19–21:** Geo-tagged photos for 3 demos.
- **Final slides:** Thank you, Q&A, References.
- A **checklist** (slides 20–30, name, roll number, screenshots, etc.).

**What this file does / Purpose:**
- Tells you **what to put on each slide** so you don’t miss any requirement.
- Keeps your PPT **in order** and complete for the PBL evaluation.

**In simple words:**  
“PBL-PPT-Guide.md = blueprint for your PPT. Follow it slide by slide to make your presentation complete.”

---

## 8. java-dsa/BloodRequest.java

**What it is:**  
A simple **Java class** that represents one blood distribution request.

**What is written in it:**
- Three private fields: `bloodGroup`, `units`, `hospital`.
- Constructor to create a request. Getters for each field.
- `toString()` method that returns a string like `"A+ | 2 units | Apollo Hospital"`.

**What this file does / Purpose:**
- Used by **BloodDistributionDSA.java** in the **LinkedList**, **Stack**, **Queue**, and **HashMap**. Each request in the list/stack/queue is an object of this class.

**In simple words:**  
“BloodRequest.java = a small Java class that holds one request (blood group, units, hospital). Other code uses it to store and display requests.”

---

## 9. java-dsa/BloodDistributionDSA.java

**What it is:**  
The **main Java program** – a **console application** with a menu. It uses **LinkedList**, **Stack**, **Queue**, and **HashMap (Hashing)**.

**What is written in it:**
- **LinkedList&lt;BloodRequest&gt; requestList** – main list of all requests; we add, remove, and display from this list.
- **Stack&lt;BloodRequest&gt; undoStack** – when we add a request, we push it here; **Undo** pops from stack and removes that request from the list (LIFO).
- **Queue&lt;BloodRequest&gt; processQueue** – Java’s `LinkedList` is also a **Queue**; we offer when we add, poll when we **Process Next** (FIFO).
- **HashMap&lt;String, LinkedList&lt;BloodRequest&gt;&gt; requestsByBloodGroup** – **Hashing**: key = blood group (e.g. "A+"), value = list of requests with that blood group. When we add a request, we put it in the right group; menu option 6 prints all groups.
- Menu: 1) Add Request, 2) Undo (Stack), 3) Process Next (Queue), 4) Display All (LinkedList), 5) Search, 6) Group by Blood (HashMap), 7) Exit.

**What this file does / Purpose:**
- Shows **LinkedList** (list of requests), **Stack** (undo), **Queue** (process next), and **Hashing** (HashMap – group by blood group) in **Java**, with the same blood distribution theme as the web project.

**In simple words:**  
“BloodDistributionDSA.java = Java program with a menu. It uses LinkedList for the list, Stack for Undo, Queue for Process Next, and HashMap for grouping by blood group. Run it in terminal and choose 1–7.”

---

## Quick Summary Table

| File | Main purpose |
|------|----------------|
| **index.html** | Structure and content of the main page (header, nav, 5 sections, footer). |
| **styles.css** | Design: colors, layout, forms, tables, tabs. |
| **script.js** | Actions: tab switch, Login/Register messages, add/search/sort/clear requests. |
| **dsa-version/index.html** | DSA demo page (same layout + Undo & Process Next buttons). |
| **dsa-version/script-dsa.js** | DSA actions: Stack (Undo), Queue (Process Next), Search, Sort + console logs. |
| **java-dsa/BloodRequest.java** | Java class for one request (blood group, units, hospital). |
| **java-dsa/BloodDistributionDSA.java** | Java console app: LinkedList, Stack, Queue, HashMap (hashing). |
| **java-dsa/README.md** | How to compile and run the Java program. |
| **README.md** | Project info and how to run; useful for viva. |
| **PBL-PPT-Guide.md** | Guide to build your PPT (20–30 slides). |

---

Use this document to **understand each file**, **explain the project in viva**, and **revise before the expo**. Good luck.
