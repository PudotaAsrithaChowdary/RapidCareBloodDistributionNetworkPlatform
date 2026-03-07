# Java DSA Module – Rapid Care Blood Distribution

Uses **LinkedList**, **Stack**, **Queue**, and **HashMap (Hashing)** for the same blood distribution theme.

## Concepts Used

| Concept      | Where in Java | Purpose |
|-------------|----------------|---------|
| **LinkedList** | `requestList` | Main list of requests; add, remove, display |
| **Stack**   | `undoStack`   | Undo last added (LIFO) |
| **Queue**   | `processQueue` (LinkedList as Queue) | Process next (FIFO) |
| **Hashing** | `requestsByBloodGroup` (HashMap) | Group requests by blood group |

## How to Run

```bash
cd student-pbl-project/java-dsa
javac BloodRequest.java BloodDistributionDSA.java
java BloodDistributionDSA
```

Menu: 1 Add, 2 Undo, 3 Process Next, 4 Display, 5 Search, 6 Group by Blood, 7 Exit.
