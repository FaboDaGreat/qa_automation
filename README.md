# Hacker News Newest Articles Validation

This project is an end‑to‑end Playwright test that validates **Hacker News’ `/newest` page** to ensure that the **first N articles (default: 100) are sorted from newest to oldest**.

It was originally built as a take‑home assignment and has since been refined into a **portfolio‑grade QA automation project**, emphasizing correctness, robustness, and explicit testing intent.

---

## What This Project Demonstrates

* Strong **DOM reasoning** grounded in real system behavior
* Pagination handling without brittle assumptions
* Deterministic data extraction and validation at scale
* Layered assertions using independent signals
* Explicit, intention-revealing test design
* Clear, actionable failure diagnostics
* Playwright best practices

This is not just a “does it work” test — it is designed to **fail loudly and meaningfully** when assumptions are violated.

---

## Core Testing Strategy

This project validates article ordering using **two independent signals**, intentionally layered to increase confidence and reduce false positives.

### 1. ID‑Based Ordering (Primary Invariant)

Each Hacker News article row (`tr.athing`) includes a numeric `id` attribute.

**Key assumption:**

> Hacker News assigns monotonically increasing numeric IDs to newer articles.

The test validates that:

* Newer articles → larger numeric IDs
* Older articles → smaller numeric IDs

This invariant is:

* Stable
* Easy to reason about
* Independent of UI formatting

If Hacker News ever changes this behavior, the test is expected to fail.

---

### 2. Time‑Ago String Ordering (Secondary Cross‑Check)

In addition to IDs, the test also validates ordering using the **visible timestamp text** displayed on the site (e.g. `"4 hours ago"`).

These strings are:

* Parsed
* Normalized into seconds
* Compared to ensure articles are ordered from **least → greatest age**

This check:

* Mirrors what users actually see
* Acts as a cross‑validation against the ID ordering
* Is intentionally scoped (minutes / hours / days only) to avoid flaky edge cases

The ID‑based invariant remains the authoritative signal; the timestamp check exists to strengthen confidence and catch unexpected inconsistencies.

---

## What the Test Validates

* Successful navigation to the `/newest` page

* Pagination continues until the required number of articles is collected

* Exactly the configured number of articles are validated

* No duplicate articles are collected across pagination

* Articles are ordered **newest → oldest** by numeric ID (primary invariant)

* Articles are ordered **newest → oldest** by visible timestamp text (secondary cross-check)

* All article links return successful HTTP responses

---

## Tech Stack

* **Playwright** (JavaScript)
* **Node.js v20+**
* Playwright Test Runner & Assertions

---

## Running the Test

### Install dependencies

```bash
npm install
```

### Run the test

```bash
npx playwright test --headed
```

---

## Defensive Checks Included

* Ensures no duplicate article IDs are collected
* Validates numeric ordering invariants explicitly
* Converts human‑readable timestamps into comparable values
* Uses soft assertions for link validation to surface all failures in a single run
* Avoids reliance on brittle UI selectors or locale‑dependent date parsing

---

## Project Structure

```
├── helper_functions/
│   ├── calculateSecondsFunction.js
│   └── validateLinksFunction.js
├── tests/
│   └── hackerNews.test.js
├── playwright.config.js
└── README.md
```

---

## Design Decisions & Tradeoffs

This project intentionally avoids relying on a single signal to validate ordering.

### Why not trust relative timestamps alone?

UI strings like `"4 hours ago"` are:

* Rounded
* Human-readable
* Not guaranteed to be strictly monotonic

They are useful for **cross-checking user-visible behavior**, but fragile as a sole source of truth.

### Why numeric IDs are the primary invariant

Hacker News assigns monotonically increasing numeric IDs to new submissions. This provides a:

* Stable ordering signal
* Backend-driven invariant
* Locale- and formatting-independent comparison

For these reasons, ID ordering is treated as the **authoritative signal**, while timestamp parsing exists to strengthen confidence and catch unexpected inconsistencies.

---

## Why This Matters

This project reflects how I approach QA engineering:

* Favor **clear invariants** over fragile UI text
* Use **multiple independent signals** to validate critical behavior
* Optimize for **signal over noise**
* Write tests that explain *why* they exist
* Design failures to be actionable and debuggable

The goal isn’t to test everything — it’s to test the **right things**, clearly and confidently.




