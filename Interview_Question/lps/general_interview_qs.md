
# QUES why you left your company within 6 months, then you are not working for 1 year.
"I left my previous company because of a family emergency. Initially, I tried to manage both my professional and family responsibilities by working from home for around three months. However, I realized that I wasn't able to give my best to both, so I made the decision to resign and focus on my family situation.

During this period, I also used the time to upskill myself. I worked on several backend and full-stack projects, strengthened my system-design and problem-solving skills, and consistently practiced DSA. I'm now in a position where I can fully focus on my career, which is why I'm actively looking for my next opportunity."
# "What did you do for the entire year?"
"I spent a significant amount of that time strengthening my technical skills. I worked on projects involving Node.js, microservices, Redis, RabbitMQ, Docker and system design, and I consistently practiced DSA. I've solved around 840 DSA problems across platforms, including around 790 on LeetCode."
# "Why should we believe you won't leave again?"

"The reason for my previous resignation was a specific family situation, not dissatisfaction with the company or the role. I initially tried to continue working remotely for three months before realizing I couldn't do justice to both responsibilities. That situation has been resolved, and I'm now fully focused on my career and looking for a long-term opportunity.
## QUES What exact APIs did you build? What was your ownership vs contribution?
One concrete contribution was converting frontend-driven pagination into backend-driven paginated APIs. Earlier, large datasets were being fetched and paginated on the client side, which caused performance issues.

I redesigned the API to support pagination using limit and offset, reducing payload size and improving response time.

I also created separate search APIs based on different filters instead of overloading a single endpoint, which made the system more modular and easier to maintain.

In some cases, I split a monolithic API into smaller, purpose-specific endpoints to improve clarity and performance.

# QUES how will you approach the develop a complete feature if rquirements are 90% clear
If requirements are 90% clear, I would first clarify the remaining 10% because small ambiguities can lead to rework. Once I have enough clarity, I would break the feature into API design, database changes, backend implementation, testing, and deployment. I would deliver an initial working version and iterate based on feedback.

1. Clarify requirements (What problem are we solving?, Who are the users?,What is the expected behaviour?
2. Identify Dependencies (Database changes? External APIs? Authentication?
3. Design (API Contract, Database Schema, Flow Diagram
4. Break into tasks (DB,Backend APIs,Frontend,Testing)
5. Implement Incrementally ( Version 1 -> Basic functionality works
6. Test
7. Deploy & Monitor

# Q # your chat application is lagging and it faces latency issues how will you look into the issue
I would first identify where the latency occurs by measuring the message path from sender to receiver. Common bottlenecks include slow database writes, large payloads, network delays, or overloaded socket servers. Depending on the root cause, I would optimize database queries, reduce payload size, horizontally scale socket servers, and use a Redis adapter to synchronize events across multiple instances.
# Step 1: Find Where Latency Is Happening
  I would first identify whether latency is in:
Client
Network
WebSocket Server
Database
Third-party Service
# Step 2: Check Message Flow
A chat message typically flows:
Client A
 ↓
Socket Server
 ↓
Database
 ↓
Socket Server
 ↓
Client B

I would measure these to locate bottleneck:
Message Sent Time
Message Stored Time
Message Delivered Time
# Step 3: Common Causes
Database Slow : If database writes are slow then Message delivery delayed
Solution : Indexes, Query optimization, Async persistence

Large Payloads : Smaller payloads travel faster.

Too Many Connections : Single server:1Lakh socket connections may struggle. (use Load Balancer distribute connection to servers)

Multi-Server Problem : Suppose user A exist in server A, user B exist on server B,
Server1 doesn't know about sockets on Server2. we can use Event synchronizer like radis adapter.

# QUES "Your application is down. How would you investigate?"
  checking recent deployments first, then monitoring dashboards. If logs show dependency failures, verify each dependency like Mongo, Redis, and external APIs.    
STEP 1: IMPACT
 "First, I'd understand the impact—whether the entire application is down or only a particular feature, how many users are affected, and what the business impact is.
STEP 2 :  ROOT CAUSE
 Then I'd check our monitoring and CloudWatch metrics, application logs, and infrastructure health to identify where the failure is happening. 
 I'd also immediately check recent deployments, configuration changes, and database migrations. If the issue started after a recent deployment and we have a stable previous version, I'd prioritize rolling back to restore service, rather than keeping users impacted while debugging.

STEP 3 :  FIX OR TEACING
  If rollback isn't relevant, I'd trace the issue through the affected service and its dependencies such as the database, Redis, RabbitMQ, or external APIs.

STEP 4 :  PREVENT IT FROM HAPPENING AGAIN  
  Once the service is restored, I'd investigate the root cause, fix it, add appropriate monitoring or tests, and document the incident to prevent it from happening again."

# QUES API being down or not responding (same approach, but narrow the investigation to the API/request path)
"For an API issue, I'd first determine whether it's a single endpoint or the entire API and understand the user impact.
 Then I'd check monitoring, request/error rates and application logs, followed by the API's dependencies such as the database, Redis or other services. 
 I'd also check recent deployments or configuration changes. If a recent deployment caused the issue and the previous version is stable, I'd roll it back to restore service quickly, then investigate the root cause and add measures to prevent recurrence."

 # Investigation
1.Check the impact : Is only /orders affected?, Are other APIs working?, Are all users affected?
2.Check monitoring : Is request traffic reaching the API?, Response time increased?, 5xx errors increased? ,Is the server/container healthy?
3.Check logs : API Gateway -> Order API ->Docker logs

Look for things like: Database connection error, Unhandled exception, Timeout, Out of memory

4.Check dependencies : Order API -> MongoDB -> Redis ->RabbitMQ -> Payment Service

Find out whether the API itself is broken or waiting for something else.

5. Check recent changes
If: Deployment → API starts failing

and the previous version was working: I'd consider rolling back to the last stable version to restore the API, then investigate the new version.
6. After recovery : Fix the actual issue and add whatever is missing:
test
monitoring
alert
timeout
validation
capacity/scaling change