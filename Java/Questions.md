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