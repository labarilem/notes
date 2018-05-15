# Deployment

Deployment in microservices differs from monolithic systems. It's important to have a working approach following the continuous integration and delivery practices.

## Mapping Continuous Integration to Microservices

The goal is to be able to deploy microservices independently.
So, how to map microservices to builds and code repositories? We have different options:

### Single repository and single build

Use a single repository to store all our code, and have a single build, triggered on every code integration, that produces every build artifact we need.

Benefits:

- Easy to implement.
- Easy to commit changes.

Downsides:

- A small change to a single service will trigger builds we do not need.
- What services do we need to deploy? Hard to determine which services changed by only looking at the pushed commit.
- If a commit breaks the build, the build needs to be fixed before any other team can push code in the repository, locking those teams.

### Single repository and multiple builds

A variation of the previous approach is to have a single repository but setup multiple CI builds mapping to parts of the source code.

Benefits:

- Easy to commit changes.

Downsides:

- Developers can get into the habit of making changes to different services in the same commit.

### Multiple repositories and multiple builds

Each microservice has its own repository and CI build.

Benefits:

- Only needed builds and tests are run when the build is triggered.
- A team can own the repository that it's working on.

Downsides:

- Making changes across microservices is more difficult, but this is still preferable to the single repository approach.

## Build Pipelines and Continuous Delivery

In build processes usually there are a lot of fast, small-scoped tests, and a few large-scoped, slow tests. We will not get fast feedback when our fast tests fail if we're waiting for the other tests to finish. Also, if the fast tests fail, there is no need to run other tests.

A solution to this problem is to have different stages in our build, i.e. a **build pipeline**.
Build pipelines allow to track the software as it goes through each build stage, giving a clear idea of its stability.

In *continuous delivery* (*CD*) we get constant feedback on the production readiness of each and every check-in, and treat each and every check-in as a release candidate. So clearly *CD* benefits from build pipelines.
In microservices with CI, we want one pipeline per service, in which a single artifact will move through our path to production.

## Exceptions to Continuous Delivery

In the starting stage of a project, a single repository and single build approach may be more convenient since developers are not confident with the domain yet because the service boundaries are likely to change a lot. In this case, having a multi repository model will increase a lot the cost of these changes.
Then, when the development team acquires experience in the domain, it can start moving out services in their own repositories and build pipelines.

## Platform-Specific Artifacts

Some artifacts are platform-specific (e.g. JAR files). This means that they need a specific configuration and a specific platform to be run in an environment.
Tools like [Puppet](https://puppet.com/) and [Chef](https://www.chef.io/) can help to automate this process.

## Operating System Artifacts

Another option for platform-specific artifacts is to use os-specific artifacts. This way, the OS can manage dependencies, installation and removal of your software.

The downside is in actually creating these packages, because the difficulty depends on the target OS (e.g. teams using Windows, not known for package management capabilities, may be unhappy with this approach).

Another downside is that if you need to deploy on different OS, there is an increase in complexity in your build and test process.

## Custom images

The problem with tools like Puppet and Chef is that **they take time to provision a machine**. They need to install platforms (e.g. JVM) or perform expensive checks on the system to detect if a valid platform version is already installed.

And if we're using an on-demand compute platform we might be constantly shutting down and spinning up new instances frequently, making the time cost of these tools really high.

If you need to install the same tools multiple times per day (e.g. because of CI) this becomes a real problem in terms of providing fast feedback. It can also lead to increased downtime when deploying in production if your systems do not allow zero-downtime deployment (*blue/green deployment* can help mitigate this issue).

One approach to **reducing the provisioning time** is to create a virtual machine image that bakes in some common dependencies we use. When we want to deploy our software, we spin up an instance of this custom image, and all we have to do is install the latest version of our service.

When you launch new copies of this image you don't need to spend time installing your dependencies, as they are already there. This can result in significant time savings.

There are drawbacks too:

- Build times are increased.
- Resulting images can be very large, making it hard to move them across the network.
- The image build process differs from platform to platform (e.g. VMWare images, Vagrant images).
  Tools like [Packer](https://www.packer.io/) can help.

As we'll see later, container technology mitigates these drawbacks.

### Images as Artifacts

Why stop at including only dependencies in these images? We can also include our software in it.
This will make our software platform agnostic and it is a good way to start implementing the *immutable server* deployment concept.

### Immutable Servers

To keep our servers immutable we also must be sure that no one is able to access them after they've been deployed (e.g. by disabling *SSH* in the image artifact).
Otherwise, the configuration could be edited, causing a *configuration drift*.
If we want to have environments that are easy to reason about, every configuration change must pass through a build pipeline.

## Environments

Our microservice artifact will move in different environments during the CD pipeline.
Usually these are:

1. Slow tests environment.
2. UAT environment.
3. Performance/load test environment.
4. Production environment.

As you go on in the pipeline, you want the environments to look more like the production environment, allowing to catch production problems before they happen in production.
But consider that production environments are more expensive and slower to set up. So you should balance the ability to find production-like bugs with the ability to get fast feedback from builds.

## Service configuration

Our services need some configuration (e.g. db username and password). Ideally this should be a small amount of data. Also, it's best to minimize configuration that changes between environments, so that you minimize chances for environment-specific bugs.
But how to handle this kind of configuration?

- Bundling the configuration in your build artifacts is to be avoided because it violates the principles of *CD*.
  In this case it would be hard to avoid having sensitive data (e.g. passwords) in your source code.
  Also, build times are increased since you now have more images.
  Then you have to know at build time which environments exist, coupling the build process with the delivery process.
- Create a single artifact and place configuration files in environments or use a dedicated system for providing configuration (a popular approach in microservices).

## Service-to-Host Mapping

In this era of virtualization, the mapping between a single host running an operating system and the underlying physical infrastructure can vary a lot.

Let's define *host* to be the generic unit of isolation, i.e. an operating system onto which you can install and run your services.

So how many services per host should we have? There are different options.

### Multiple Services Per Host

Having multiple instances of your service per host.

![Image](./images/multiple-services-per-host.png)

Benefits:

Downsides:

# WIP