/**
 * Dirty Dozen security verification cases for /guestbookEntries/{entryId}
 * Run against Firestore Emulator with @firebase/rules-unit-testing when testing locally.
 */
export const dirtyDozenCases = [
  { name: '01_unauthenticated_create', expected: 'PERMISSION_DENIED' },
  { name: '02_unverified_email_create', expected: 'PERMISSION_DENIED' },
  { name: '03_identity_spoofing_authorUid', expected: 'PERMISSION_DENIED' },
  { name: '04_shadow_field_injection', expected: 'PERMISSION_DENIED' },
  { name: '05_missing_required_field_side', expected: 'PERMISSION_DENIED' },
  { name: '06_invalid_side_enum', expected: 'PERMISSION_DENIED' },
  { name: '07_authorName_exceeds_30_chars', expected: 'PERMISSION_DENIED' },
  { name: '08_message_exceeds_300_chars', expected: 'PERMISSION_DENIED' },
  { name: '09_client_spoofed_timestamp', expected: 'PERMISSION_DENIED' },
  { name: '10_cross_user_update_delete', expected: 'PERMISSION_DENIED' },
  { name: '11_immutable_createdAt_tamper', expected: 'PERMISSION_DENIED' },
  { name: '12_invalid_entryId_path_poisoning', expected: 'PERMISSION_DENIED' },
] as const;
