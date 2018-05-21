# Microservices

Microservices are small and autonomous services.

## Benefits

- Allow adoption of new technologies with reduced risk
- Resiliency of services, the system can be kept up on partial failures
- Scaling can be aimed at specific services, thus providing cost savings due to efficiency
- Ease of deployment, can deploy small parts with small deltas to deploy more frequently
- Organizational alignment, can assign team of ideal size (not too big, not too small) to a microservice development
- Composability and reusability of services
- Small services can be easily decommissioned and replaced when the need arises

## Relationship with SOA

SOA has some issues because it's not a well-defined specification, so there are lots of ways to do SOA. Microservices are a specific way to do SOA. Some say they are SOA done right.

## Similar decomposition techniques

Do we need microservices? Can similar decomposition techniques offer the same benefits provided by microservices?

### Shared libraries

Drawbacks:

- Need to run on the same platform as the service (losing technology heterogeneity)
- Cannot scale services independently
- Unless using DLLs, services cannot load a new version of the library without stopping their execution (losing ease of deploy in isolation)
- Lack of system resiliency

Shared libraries are best suited for common code reuse. But be careful: business code reuse can cause coupling in microservices.

### Modules

Usually languages do not have proper support for isolated life cycle management of modules, it's hard (if possible at all) for developers to add this functionality.
The drawbacks in these cases are nearly the same as the ones provided by shared libraries.

Consider even languages that have proper support for ILM (such as Erlang). The system should be based only on that language (losing technology heterogeneity) and this is usually not the case for projects that integrate with legacy software.

Also, in practice, using modules will likely make developers produce coupled code between modules, thus losing independence.

## No silver bullet

Microservices are no silver bullet because they add to your system the challenges of distributed systems. Also, you have to be confident with deploys, testing, monitoring and scaling in order to effectively gain the benefits of microservices.