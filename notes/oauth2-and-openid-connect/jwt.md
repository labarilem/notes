# JWT (JSON Web Token)

A standard for creating JSON access tokens that can assert a number of claims.

JWTs are *stateless* because servers do not need to store any session data in order to validate these tokens.

## Structure

|Component|Example|Description|
|-|-|-|
|**Header**|`{ "alg" : "HS256", "typ" : "JWT" }`| Contains token metadata, such as the algorithm used to generate the signature. |
|**Payload**|`{ "loggedInAs" : "admin", "iat" : 1422779638 }`| Contains a set of claims. They can be [standard](#standard-fields) or custom. |
|**Signature**|`HMAC-SHA256(base64url(header) + '.' + base64url(payload), secret)`| The token signature, used to to provide integrity and authenticity proof. |

The **actual token** is produced by the following function:

`base64url(header) + '.' + base64url(payload) + '.' + base64url(signature)`

The token can be safely passed into HTML and HTTP.

## Standard fields

### Header

This table enumerates the standard fields that can be used inside a JWT header.

|Name|Extended name|Description|
|-|-|-|
|`typ`|	Token type|	If present, it is recommended to set this to `JWT`. |
|`cty`|	Content type|	If nested signing or encryption is employed, it is recommended to set this to `JWT`. Otherwise, omit this field. |
|`alg`|	Message authentication code algorithm| The issuer can freely set an algorithm to verify the signature on the token. However, some supported algorithms are insecure. |
|Any other field allowed by the [JWS](https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41) and [JWE](https://tools.ietf.org/html/draft-ietf-jose-json-web-encryption-40) standards.|

### Payload

This table enumerates the standard *claims* that can be used inside a JWT payload.

|Name|Extended name|Description|
|-|-|-|
|`iss`|Issuer| The principal that issued the JWT. |
|`sub`|	Subject|	The subject of the JWT.|
|`aud`|	Audience|	Lists the recipients that the JWT is intended for. If the principal processing the claim does not identify itself with a value in the `aud` claim when this claim is present, then the JWT must be rejected.|
|`exp`|	Expiration Time|	Identifies the expiration time on and after which the JWT must not be accepted for processing. The value must be a *NumericDate* (i.e. the number of seconds past `1970-01-01 00:00:00Z`).|
|`nbf`|	Not Before|	Identifies the time on which the JWT will start to be accepted for processing. The value must be a NumericDate.|
|`iat`|	Issued at|	Identifies the time at which the JWT was issued. The value must be a NumericDate.|
|`jti`|	JWT ID|	Case sensitive unique identifier of the token even among different issuers.|

## How JWTs are commonly used

1. The **client** requests a token by providing credentials to the issuer.
2. The **issuer** validates the client's request and responds with the token.
3. The client can use the token to access some protected **resources**. For such requests, the client typically sends the token in the `Authorization` header, using the `Bearer` schema. Example: `Authorization: Bearer abc123...321cba`.

## How to validate a JWT

1. Deserialize the token.
2. Validate the standard claims: `iss`, `aud`, `exp`, `nbf`. If you want to allow manual token expiration before the expiration date, you also need to check the token against a *data store*. By doing so, your tokens will not be stateless anymore.
3. Validate the signature using the algorithm specified in the token's header.