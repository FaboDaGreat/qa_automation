# Hacker News Newest Articles Validation

This project is an end‑to‑end Playwright test that validates **Hacker News’s `/newest` page** to ensure that the **first N articles (default: 100) are sorted from newest to oldest.**.

It was originally built as a take‑home assignment and has since been refined to reflect **production‑quality QA engineering practices**, focusing on correctness, robustness, and clear intent.

---

## 🎯 What This Project Demonstrates

* Strong **DOM reasoning** using real system invariants
* Pagination handling without brittle assumptions
* Data extraction and validation at scale
* Thoughtful assertions with guard rails
* Clear failure diagnostics
* Playwright best practices

This is not just a “does it work” test — it is designed to **fail loudly and meaningfully** when assumptions are violated.

---

## 🧠 Core Testing Strategy

### Ordering Invariant

Each Hacker News article row (`tr.athing`) includes a numeric `id` attribute.

**Key assumption:**

> Hacker News assigns monotonically increasing numeric IDs to newer articles.

This test validates ordering using that invariant:

* Newer articles → larger numeric IDs
* Older articles → smaller numeric IDs

Compared to something like parsing relative timestamps (e.g., *“5 minutes ago”*), this approach is:

* More reliable
* Less fragile
* Easier to reason about

If Hacker News ever changes this behavior, the test is expected to fail.

---

## 🧪 What the Test Validates

✔ The page loads successfully

✔ Pagination continues until enough articles are collected

✔ Exactly the number of articles chosen are validated

✔ Articles are ordered **newest → oldest**

✔ All article links return successful HTTP responses

---

## 🧩 Tech Stack

* **Playwright** (JavaScript)
* **Node.js v20+**
* Playwright Test Runner & Assertions

---

## ▶️ Running the Test

### Install dependencies

```bash
npm install
```

### Run the test

```bash
npx playwright test --headed
```

---

## 🛡️ Defensive Checks Included

* Ensures no duplicate articles are collected across pagination
* Guards against non‑numeric or malformed IDs
* Uses soft assertions for link validation to surface all failures in a single run

---

## 📂 Project Structure

```
├── helper_functions/
│   └── validateLinksFunction.js
├── tests/
│   └── hackerNews.test.js
├── playwright.config.js
└── README.md
```

---

## 💡 Why This Matters

This project reflects how I approach QA engineering:

* Favor **clear invariants** over fragile UI text
* Optimize for **signal over noise**
* Write tests that explain *why* they exist
* Design failures to be actionable

The goal isn’t to test everything — it’s to test the **right things**.




