# Registration route app preview

`/register` is a screenshot walkthrough, not a signup form. Role and screen selection use browser memory only. No credentials are collected, no signup request is sent, and the existing registration API is unchanged.

The screenshots are copied unchanged from Phase4-Validation/Final-Screenshots in the current local iOS app validation artifacts, also backed up in Phase5-Validation/Phase4-Source-Backup. They show fictional demo accounts, organisations, offer terms and statuses. They are not live records or production verification. The page explains these limits and provides text descriptions alongside images.

Worker: review offer → confirmed provider connection.
Provider: recruitment overview → worker matches → team connection.

Source files:
- worker-offer.png: CC3398A1-4B7C-4BE3-ABEE-B25F6C78175A.png
- worker-providers.png: 94C91550-7C1B-4623-A5CF-197EB4A34248.png
- provider-home.png: 8D80D055-AFAC-4C79-964D-9846CA5BF7BE.png
- provider-candidates.png: F035EC3C-6572-4BAF-8399-B5A51FC39BB9.png
- provider-team.png: D5EEAA28-F8CC-4A2B-9CFF-CB3E7FF1FDAD.png

Navigation QC: header and footer app links open `/register`; `/login` redirects there for old bookmarks. The provider preview link opens `/register#provider`, selecting the provider journey. Homepage section anchors remain on the homepage. Server auth APIs and legacy dashboard routes remain in the repository, but the public preview navigation does not link to them.
