# @repo/security

Small cryptographic helpers over `node:crypto` — **zero runtime dependencies**.

```ts
import { hmacSign, hmacVerify, randomToken, sha256 } from "@repo/security";

const token = randomToken();             // url-safe, 32 bytes of entropy
const sig = hmacSign(body, webhookKey);  // sign an internal request / webhook
hmacVerify(body, sig, webhookKey);       // constant-time check
```

- `randomToken`, `sha256`, `hmacSign`/`hmacVerify`, `safeEqual` (constant-time).
- **Passwords:** do **not** use `sha256` — add `argon2`/`bcrypt` when you need
  password hashing.
