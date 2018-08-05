# Monitoring

Breaking our system up in microservices adds complexity in the monitoring process. The answer is to add monitoring at a single service level and then aggregate the data, because eventually there are gonna be too many services for manual monitoring.

In microservices, monitoring can help you efficiently scale your system too.

## Single Service, Single Server

Let's first consider the simplest setup: one host, running one service. What should we monitor?

- The **host** (e.g. CPU and memory usage).
- The **logs of the server**, so when a user reports an error we can pinpoint it to a log record.
- The **application** (e.g. response times).

## Single Service, Multiple Servers

Now there multiple copies of the service running on separate hosts, behind a load balancer.

![Image](./images/siservice-muservers.png)

What should we monitor?

- The **hosts**, both individually and by aggregating data: it would be useful to determine if memory usage is due to a software bug or to a rogue OS process.
- The **logs** can still be saved on each host. We would be able to easily navigate them via tools like ssh-multiplexers.
- The load balancer can help with aggregating data for tasks like **response time tracking**. Ideally the load balancer should be able to tell if a microservice is healthy and remove it if that's not the case.

## Multiple Services, Multiple Servers

Multiple services are providing capabilities to our users, and those services are running on multiple hosts — be they physical or virtual.

![Image](./images/muservices-muservers.png)

In this case we would need specific subsystems to aggregate (e.g. [Logstash](https://www.elastic.co/products/logstash), [Graphite](https://graphiteapp.org/)) and visualize (e.g. [Kibana](https://www.elastic.co/products/kibana)) data.

## Service Metrics

Ideally your service should expose basic metrics too (e.g. invoices emitted per day).

The benefits are:

- You can detect which features of a service are actually used in production.
- You can react to how your users are using your system in order to improve it.
- It's hard to know what data will be useful when you first deploy your system.

## Synthetic Monitoring

WIP