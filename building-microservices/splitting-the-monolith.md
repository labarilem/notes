# Splitting the monolith

Why would you want to split a monolith?

- There are lots of changes coming to a part of the monolith, splitting that part into a service will make you roll out those changes faster.
- Separate teams work on separate parts of the monolith.
- A part of the monolith requires increased security measures not needed by the rest of the system.
- A part of the monolith can be improved by switching technology.

How do we go about decomposing monolithic applications without having to embark on a big-bang rewrite?

## Seams

We want our services to be highly cohesive and loosely coupled. The problem with the monolith is that all too often it is the opposite of both.

A seam is a portion of the code that can be treated in isolation and worked on without impacting the rest of the codebase. Bounded contexts are good seams.

So when splitting, the first step is to identify seams in our system and then gradually move the code of these seams into different packages. Tests are really useful to make sure you're not introducing bugs with this packaging. This process will also help identify seams that you did not think of: they will come out when you are left with some code that you don't know in which package to place.

The splitting should start from the seam that is least depended on.

## Databases
