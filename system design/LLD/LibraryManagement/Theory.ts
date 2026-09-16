{/*
//? Requirements : Operations → Constraints → Edge Cases → Scale

✅ 1. Core Operations
User searches/selects a book
System checks available copies
User can borrow (issue) a book copy
System assigns:
 issue date
 due date
User can return the book
System updates availability
System may calculate fine for late return

✅ 2. Constraints
A user can borrow limited number of books (e.g., 3–5)
A book can have multiple copies
Only available copies can be issued
Each issued book must be returned before borrowing limit resets

✅ 3. Edge Cases
Book not available
Book lost by user
Late return (fine calculation)
Same book requested by multiple users

✅ 4. System Nature
Multiple users
Multiple books
Multiple copies per book
Concurrent borrow/return operations

User ↔ Loan ↔ BookCopy ↔ Book

| Concept    | Meaning                          |
| ---------- | -------------------------------- |
| Book       | Metadata (title, author)         |
| BookCopy   | Physical instance                |
| User       | Borrower                         |
| Loan/Issue | Relationship between user + copy |
//??  Entity Design
🔹 1. Book
Owns:
title
author
bookId
👉 Represents metadata

🔹 2. BookCopy
Owns:
copyId
book (reference)
isAvailable
👉 Represents physical copy

🔹 3. User
Owns:
userId
name
borrowedBooks

🔹 4. Loan (or IssueRecord)

👉 This replaces your assignBook

Owns:
user
bookCopy
issueDate
dueDate
returnDate

🔹 5. Library (Orchestrator)

Owns:

list of books
list of copies
users

Does:
issueBook()
returnBook()

🔥 Visual Relationship
Book (metadata)
   ↑
BookCopy (physical)
   ↑
Loan (relationship)
   ↑
User

❗//? Responsibilities (Control flow ownership)

🚀 Flow: User Borrows a Book
🔹 Step 1: User initiates request
User → Library.borrowBook(userId, bookId)

👉 Library is the entry point (like ParkingLot, ElevatorController)

🔹 Step 2: Library finds available copy

Library does:

Find Book → find available BookCopy
Library → BookCopy (check isAvailable)

🔹 Step 3: Validate constraints
Library checks:
user limit (max books)
copy available

👉 If not → reject
🔹 Step 4: Create Loan
Loan = new Loan(user, bookCopy, issueDate, dueDate)

👉 This is your “assignBook” but correctly modeled

🔹 Step 5: Update state
BookCopy → mark unavailable
User → add borrowed book
Library → store loan

🚀 Final Flow: User Borrows a Book
1. User requests to borrow a book → request goes to Library
2. Library finds an available BookCopy for the given Book
3. Library validates user borrowing limits
4. Library creates a Loan record (user + bookCopy + dates)
5. BookCopy is marked unavailable
6. Loan is stored and returned

🔁 🚀  Return Book Flow

1. User requests return → Library.returnBook(userId, copyId)
2. Library finds active Loan for that BookCopy
3. Library updates returnDate in Loan
4. Library marks BookCopy as available
5. Library removes book from user's borrowed list
6. If late → calculate fine

🧠 Key Insight
Borrow → create Loan
Return → update Loan

👉 Loan is the source of truth

*/}