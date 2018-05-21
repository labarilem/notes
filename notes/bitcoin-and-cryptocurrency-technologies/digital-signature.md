# Digital signature

Digital signatures must verify 2 properties:

- Only you can sign some data, while anyone can verify the fact that you signed it.

- The signature must be specific to the data that it signs: if it isn't, anyone can just copy the signature you shared and apply it to different documents.

## Implementation

Digital signature schemes use a *public key* and a *private key*:

- The private key is used to sign data

- The public key is used to verify signed data

Digital signature schemes must guarantee that signed data is always correctly verified.

## Unforgeable signature schemes

When is a signature scheme called unforgeable? Let's consider this game:
There is an attacker who knows the public key and a challenger who knows the private key too.

- The attacker can pick a document and get the challenger to sign it.
- The challenger will sign that document and send the signed data to the attacker.
- The game can go on as for as much as the attacker wants (at least until a plausible amount of documents is signed)

Then the attacker tries to sign a message that the challenger has not already signed: if the forged message verifies correctly then the attacker wins, else the challenger wins.

So a signature scheme is *unforgeable* if, not matter what algorithm the attacker is using, he has only a slim chance to succeed.

## Use cases

- Public keys can be used as identities
- Signature schemes can be used to sign the last hash pointer in a blockchain, thus signing the whole blockchain.

## Signature scheme used in Bitcoin

Bitcoin uses ECDSA. Note that a good randomness source is essential to avoid leaking your private key using your public key.