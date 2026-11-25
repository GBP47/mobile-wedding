# Security Specification — Wedding Invitation Guestbook

## 1. Data Invariants
1. Every `guestbookEntries/{entryId}` document must have an `entryId` matching `^[a-zA-Z0-9_-]+$` with length `1..128`.
2. Creating a guestbook entry requires an authenticated, email-verified user (`request.auth.token.email_verified == true`) whose `request.auth.uid` strictly matches `authorUid`.
3. Every entry must contain exact schema keys `['authorName', 'side', 'message', 'authorUid', 'isPublic', 'createdAt', 'updatedAt']` with no extra shadow fields.
4. `authorName` must be `1..30` characters, `message` must be `1..300` characters, and `side` must be one of `'groom' | 'bride' | 'friend'`.
5. `createdAt` and `updatedAt` must equal `request.time` on creation; `createdAt` and `authorUid` are immutable on update.
6. Only the original author (`existing().authorUid == request.auth.uid`) or a verified admin (`isAdmin()`) may update or delete an entry.
7. List queries are strictly constrained to `existing().isPublic == true` (or own/admin entries).

## 2. The "Dirty Dozen" Payloads (Expected: PERMISSION_DENIED)
1. Unauthenticated create attempt (`auth: null`).
2. Unverified email create attempt (`email_verified: false`).
3. Identity spoofing: `authorUid` set to another user's UID.
4. Shadow field injection: extra key `isAdmin: true` in payload.
5. Missing required field: omitting `side`.
6. Invalid enum value: `side: "stranger"`.
7. Name length overflow: `authorName` exceeding 30 characters.
8. Message length overflow: `message` exceeding 300 characters (Denial-of-Wallet guard).
9. Client-spoofed timestamp: `createdAt` set to past/future client timestamp instead of `request.time`.
10. Cross-user update/delete: User B attempting to edit or delete User A's guestbook entry.
11. Immutable field tampering: Author attempting to change `createdAt` or `authorUid` during update.
12. Invalid document ID path poisoning: `entryId` longer than 128 chars or containing invalid symbols.
