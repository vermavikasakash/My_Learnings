// TypeScript Implementation

// 🔸 Book
class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string
  ) {}
}

//🔸 BookCopy
class BookCopy {
  public isAvailable: boolean = true;

  constructor(
    public id: number,
    public book: Book
  ) {}

  markUnavailable() {
    this.isAvailable = false;
  }

  markAvailable() {
    this.isAvailable = true;
  }
}

// 🔸 User
class User {
  public borrowedCopies: BookCopy[] = [];

  constructor(
    public id: number,
    public name: string
  ) {}

  canBorrow(maxLimit: number): boolean {
    return this.borrowedCopies.length < maxLimit;
  }

  borrow(copy: BookCopy) {
    this.borrowedCopies.push(copy);
  }

  return(copyId: number) {
    this.borrowedCopies = this.borrowedCopies.filter(
      c => c.id !== copyId
    );
  }
}

// 🔸 Loan (CRITICAL ENTITY)

class Loan {
  public returnDate: Date | null = null;

  constructor(
    public user: User,
    public copy: BookCopy,
    public issueDate: Date,
    public dueDate: Date
  ) {}

  isActive(): boolean {
    return this.returnDate === null;
  }

  closeLoan() {
    this.returnDate = new Date();
  }

  isLate(): boolean {
    return (
      this.returnDate !== null &&
      this.returnDate > this.dueDate
    );
  }
}

// 🔸 Library (Orchestrator)
class Library {
  private books: Book[] = [];
  private copies: BookCopy[] = [];
  private users: User[] = [];
  private loans: Loan[] = [];

  private MAX_BORROW = 3;

  addBook(book: Book, numCopies: number) {
    this.books.push(book);

    for (let i = 0; i < numCopies; i++) {
      this.copies.push(new BookCopy(Date.now() + i, book));
    }
  }

  addUser(user: User) {
    this.users.push(user);
  }

  borrowBook(userId: number, bookId: number): Loan | null {
    const user = this.users.find(u => u.id === userId);
    if (!user || !user.canBorrow(this.MAX_BORROW)) return null;

    const copy = this.copies.find(
      c => c.book.id === bookId && c.isAvailable
    );

    if (!copy) return null;

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + 7);

    const loan = new Loan(user, copy, issueDate, dueDate);

    copy.markUnavailable();
    user.borrow(copy);
    this.loans.push(loan);

    return loan;
  }

  returnBook(userId: number, copyId: number): number {
    const user = this.users.find(u => u.id === userId);
    if (!user) return 0;

    const loan = this.loans.find(
      l =>
        l.copy.id === copyId &&
        l.user.id === userId &&
        l.isActive()
    );

    if (!loan) return 0;

    loan.closeLoan();
    loan.copy.markAvailable();
    user.return(copyId);

    return loan.isLate() ? this.calculateFine(loan) : 0;
  }

  private calculateFine(loan: Loan): number {
    if (!loan.returnDate) return 0;

    const delay =
      (loan.returnDate.getTime() - loan.dueDate.getTime()) /
      (1000 * 60 * 60 * 24);

    return delay > 0 ? Math.ceil(delay) * 10 : 0;
  }
}