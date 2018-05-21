# Distributed consensus

A key challenge of distributed systems is achieving *distributed consensus*, because it is required for reliability in the system.
As example, consider a distributed database: if sometimes consensus is not achieved then some databases will not be consistent with the others.

## Definition

Let's suppose there is a network with *N* nodes. Each node receives an input value. Consensus in the network happens if:

1. The consensus protocol terminates.
2. All *N* nodes decide on the same value.
3. The decided value must be one of the input values.

## Consensus in Bitcoin

Let's examine what happens when Alice wants to pay Bob some bitcoins:

1. Alice signs the transaction referencing Bob's public key. The transactions contain the hash pointing to previously received coins by Alice.
2. Alice broadcasts the transaction to the whole network.
3. If Bob wants to be notified of the transaction, he might run a Bitcoin node. But his listening is not required for him to receive coins. The network will acknowledge (if valid) the transaction nonetheless.

It is really important that the network reaches consensus on the validity and ordering of transactions if we want the whole system to work.

But we cannot solve this problem with an algorithm that has the consensus properties described before, because:

- Nodes may crash
- Nodes may be malicious
- A p2p network is imperfect by nature (e.g. not all nodes are connected, there are faults, there is latency because the network has no notion of global time, etc.)

Also, the literature on distributed consensus is pessimistic, presenting several impossibility results (e.g. [Byzantine generals problem](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance#Byzantine_Generals'_Problem))

Still, there exist algorithms for achieving distributed consensus that trade off some properties with others (e.g. [Paxos](https://en.wikipedia.org/wiki/Paxos_(computer_science))).

But note that the hypotheses under which impossible results were proved are not applicable to the Bitcoin network. In fact, distributed consensus works better in practice than in theory for Bitcoin, because:

- The idea of *incentive* is introduced
- Consensus happens over long periods of time (1h usually), not in fixed periods. As time goes on, the probability that an invalid transaction is considered valid decreases exponentially.

So Bitcoins solves the distributed consensus problem with a probabilistic approach.