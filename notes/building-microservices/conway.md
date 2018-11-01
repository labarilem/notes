# Conway’s Law and System Design

Melvin Conway’s paper *How Do Committees Invent* (April 1968) observed that:

>Any organization that designs a system (defined more broadly here than just information systems) will inevitably produce a design whose structure is a copy of the organization’s communication structure.

This idea can be summarized as *“If you have four groups working on a compiler, you’ll get a 4-pass compiler.”*

## Evidence

Various studies have found supporting evidence for this claim. You can read more on [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_law).

Some examples from the IT industry:

- Amazon conceived its *two-pizza teams* from this idea. This organizational structure mostly is what drove the creation of AWS.
- Netflix designed the organizational structure for the system architecture it wanted. Small teams allowed for independent services.

## Applications of Conway's Law

Let's examine 3 cases:

- **Single team owns a single service** (i.e. multiple teams own different services). Here takes place fine-grained communication, which suits well the nature of software communication inside the service's boundaries. Team communication is fast-paced just like function calls. Following Conway's Law, the outcome will be an efficient system which is isolated from external services because communications is harder between different teams.
- **Single team owns multiple services.** Here takes place fine-grained communication, so the services might end up being coupled.
- **Multiple teams own the same service.** Here takes place coarse-grained communication, so the development process will be inefficient and the service's code unnecessarily abstract and/or complex.

## Service Ownership

Having one team responsible for deploying and maintaining the application means it has an incentive to create services that are easy to deploy. There will be no one else to catch the code if the team wants to *throw it over the wall*.

Some factors that drive away from the ideal service ownership model:

- **High cost of splitting a service** may make multiple teams work on the same service. Try to gradually split the service.
- **Feature teams** own the same service but work on separate feature. This approach bases the organization on the technical model (i.e. UI, database, etc.). It's an approach to avoid because microservices are by nature to be aligned with the domain model, not the technical one. Another reason to avoid it is that, in the end, no team will end up having clear ownership of anything; this gives space to a lot of blaming.
- **Delivery bottlenecks** may make multiple teams work on the same service. This can be solved by temporarily adding a new member to the overloaded team or by splitting the service if the feature load is really high and it's expected to be kept up or increased in the future.

If, for some reason, it's unavoidable having shared services, we can adopt the **internal open source** model. In this model, a service is owned by a core team of trusted committers that review changes requested by untrusted committers.

## Summary

Conway’s law highlights the perils of trying to enforce a system design that doesn’t match the organization.