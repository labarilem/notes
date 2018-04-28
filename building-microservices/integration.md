# Integration

Desirable properties of communication between microservices:

- Avoid breaking changes as much as possible
- Technology agnostic APIs
- Make it easy to consume APIs
- Hidden internal implementation details

## Shared database

The most common form of integration.

![Image](./images/shared-db.png)

Has the following issues:

- Internal representations are not private, causing high coupling
- Logic to modify some kind of data is present in different services, causing loss of cohesion
- Every kind of data must be stored using the same DBMS technology

These issues would eliminate the benefits of using microservices, so shared databases are to avoid.

## Synchronous vs Asynchronous

**Synchronous communication** starts with a blocking call to the server that resolves once the operation completes. It's easy to debug but lacks capabilities to effectively handle long-running processes.

**Asynchronous communication** does not wait for the server to respond. In theory, a client may even not need to know if the server completed the operation. It's not easy to debug but can effectively handle long-running processes.

These two different modes of communication can enable two different styles of collaboration:

- **Request/response:** natural fit to synchronous communication, can handle asynchronous communication too using callbacks
- **Event-based:** natural fit to asynchronous communication. It's more flexible since a client just issues an event, allowing for more services to listen on that event later on, without modifying the client's code.

## Orchestration vs Choreography

**Orchestration** means having an orchestrator service that instructs other services on what to do and organizes the whole flow. This provides a clear view of the whole flow but can cause coupling if the orchestrator becomes a “god” microservice.

**Choreography** means that services can issue or listen to events. This approach keeps services decoupled but can make it hard to understand the whole flow.

## Remote procedure calls

Remote procedure call refers to the technique of making a local call and having it execute on a remote service somewhere.

RPC fit well with the request/response collaboration style.

The selling point of RPC is ease of use: it's really practical to make a remote call look like a local call.

However, RPC has issues too:

- Usually it causes technology coupling between client and server
- Local calls must not be confused with remote calls, because of latency and unreliability
- Brittleness, because server signatures and interfaces need to match exactly the ones in the client

Compared to database integration, RPC is certainly an improvement when we think about options for request/response collaboration.

## REST

REpresentational State Transfer (REST) is an architectural style inspired by the Web. The most important concept is the one of resource, which can be requested in different representations. This favours decoupling between internal and external representations.

There are many different styles of REST, compared in the Richardson Maturity Model.

Usually REST is implemented over HTTP because HTTP provides parts of the REST specification, such as verbs. Also, there are lots of tools supporting REST with HTTP.

### HATEOAS

Another principle introduced in REST that can help us avoid the coupling between client and server is the concept of **hypermedia as the engine of application state** (often abbreviated as HATEOAS). One of the downsides is that the navigation of controls can be quite chatty, as the client needs to follow links to find the operation it wants to perform. Ultimately, this is a trade-off.

### Serialization format

REST provides flexibility over the serialization format of the data. The most popular choices are JSON and XML.
XML has built-in support for hypermedia while there are standards to provide hypermedia data with JSON.

### Downsides to REST Over HTTP

- Not easy to generate stubs for REST over HTTP services as it would be with RPC
- Some web servers do not *fully* support all the HTTP verbs
- Performance is penalized because of hypermedia data and HTTP overhead
- HTTP is not suited for frequently exchanging small volumes of data, WebSockets or protocol buffers are more suitable for this kind of communication

Despite these disadvantages, REST over HTTP is a sensible default choice for service-to-service interactions.