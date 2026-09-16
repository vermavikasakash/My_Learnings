🔥 Tier 1 — Must know

These are the ones I'd expect you to be able to answer confidently.

1. What is Spring Boot, and how is it different from Spring?
What is IoC (Inversion of Control)?
What is Dependency Injection?
What is a Spring Bean?
How does Spring create and manage Beans?
What is @SpringBootApplication?
What is component scanning?
Difference between @Component, @Service, @Repository, and @Controller?
Why is constructor injection preferred over field injection?
10. What happens when a Spring Boot application starts?

These ten are your foundation. If you understand them properly, a lot of Spring suddenly becomes less magical.

🔥 Tier 2 — REST API

Very likely for a backend position.

11. Difference between @Controller and @RestController?
Difference between @RequestParam, @PathVariable, and @RequestBody?
How do you handle exceptions globally in Spring Boot?
What is @ControllerAdvice / @RestControllerAdvice?
How do you validate request data in Spring Boot?
How do you return different HTTP status codes?
17. How would you structure a Spring Boot REST application?

You should be able to naturally explain:
Request
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
   ↓
Response

🔥 Tier 3 — JPA / Hibernate

If your project uses a relational database, expect these.

What is JPA? What is Hibernate?
Difference between JPA and Hibernate?
What is an Entity?
What is @Id and @GeneratedValue?
How do relationships work in JPA?
@OneToOne
@OneToMany
@ManyToOne
@ManyToMany
What is lazy vs eager loading?
What is the N+1 query problem?
What is @Transactional and why is it needed?

These are particularly important because interviewers can use them to determine whether you actually built the project or just followed a tutorial.

🔥 Tier 4 — Spring Security

If you put JWT/authentication in your project, expect these.

26. How does JWT authentication work in Spring Security?
Authentication vs authorization?
What is the Spring Security filter chain?
How do you secure specific endpoints?
30. How does Spring Security know which user is making the request?

You don't need to memorize Spring Security's internals, but you should be able to trace:
Request
   ↓
Security Filter Chain
   ↓
JWT extraction
   ↓
JWT validation
   ↓
Authentication
   ↓
Authorization
   ↓
Controller

And then there are 5 bonus questions

Once the above is comfortable:

What are Spring Profiles?
31. Difference between application.properties and application.yml?
What is @Bean and when would you use it?
What is Spring Boot auto-configuration?
35. What is the difference between @Autowired, @Qualifier, and @Primary?

                    SPRING BOOT
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
        CORE            REST          JPA
          │              │              │
      DI / IoC       Controllers    Hibernate
      Beans          Validation     Relations
      Components     Exceptions     Transactions
          │              │              │
          └──────────────┼──────────────┘
                         ↓
                    SECURITY
                         │
                       JWT
                         │
                         ↓
               Redis / Kafka / etc.

java :
Ques : just practice like basic dsa
1, reverse a string. 2, check if a string is a palindrome. 3, find the largest element in an array.
4, count frequency of characters in a string using HashMap. 5:, count word frequency in a sentence. 6:, remove duplicates from an ArrayList. 
7:, find the second largest number in an array. 
8:, find the first non-repeating character. 9:, filter even numbers from a list using streams. 
10:, create an Employee class with fields, constructor, getters, setters, and toString, then create and print a few objects.

# The Java Collections Framework contains interfaces such as Collection and Map. List, Set, and Queue extend Collection, while Map is a separate hierarchy for key-value mappings."

Iterable	
   │
   └── Collection
        │
        ├── List
        │    ├── ArrayList
        │    └── LinkedList
        │
        ├── Set
        │    ├── HashSet
        │    ├── LinkedHashSet
        │    └── TreeSet
        │
        └── Queue
             ├── PriorityQueue
             └── Deque
                  └── ArrayDeque


Map
│
├── HashMap
├── LinkedHashMap
└── SortedMap
      └── TreeMap

int[] arr

List<Integer> list = new ArrayList<>();

Set<Integer> set = new HashSet<>();

Map<Integer, Integer> map = new HashMap<>();

Deque<Integer> stack = new ArrayDeque<>();

Deque<Integer> queue = new ArrayDeque<>();

PriorityQueue<Integer> pq = new PriorityQueue<>();

Examples :
i) Primitive array :
int[] arr = new int[5];
arr[0] = 10;
int n = arr.length;

Arrays.sort(arr);
Arrays.fill(arr, -1);
int[] copy = Arrays.copyOf(arr, arr.length);

2D : 
int[][] matrix = new int[3][4];
matrix[0][1] = 10;

1. ArrayList
List<Integer> list = new ArrayList<>();

list.add(10);
list.get(0);
list.set(0, 20);
list.remove(0);
list.size();
list.contains(20);

2. HashMap
Map<Character, Integer> map = new HashMap<>();

map.put('a', 1);
map.get('a');
map.remove('a');
map.containsKey('a');
map.getOrDefault('a', 0);
map.size();

3. HashSet
Set<Integer> set = new HashSet<>();

set.add(10);
set.remove(10);
set.contains(10);
set.size();

4. ArrayDeque
// stack
Deque<Integer> deque = new ArrayDeque<>();

deque.push(10);
deque.pop();
deque.peek();

queue problems:
deque.offer(10);
deque.poll();
deque.peek();

5. PriorityQueue (Heap problems)
PriorityQueue<Integer> pq = new PriorityQueue<>(); // default minHeap

pq.offer(10);
pq.peek();
pq.poll();

Max heap: PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());

# For primitives, == compares values. For objects, == compares references, whereas .equals() is used to compare logical/content equality when the class overrides it.