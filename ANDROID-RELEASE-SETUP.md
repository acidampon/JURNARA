# JURNARA Android Release Setup

The debug Android build is verified in GitHub Actions. The release workflow is configured to create a signed Google Play App Bundle (AAB) without storing the private signing key in the repository.

## Required GitHub Actions secrets

Create these repository secrets before running **JURNARA Android Release**:

- `ANDROID_KEYSTORE_BASE64` — base64-encoded Java/Android release keystore
- `ANDROID_KEYSTORE_PASSWORD` — keystore password
- `ANDROID_KEY_ALIAS` — key alias
- `ANDROID_KEY_ALIAS_PASSWORD` — key alias password

Never commit the keystore, passwords, or private signing material to Git.

## Release flow

1. Create or use the permanent JURNARA upload/release keystore.
2. Store the four values above as GitHub Actions repository secrets.
3. Open GitHub Actions.
4. Select **JURNARA Android Release**.
5. Run the workflow manually.
6. Confirm the AAB build succeeds.
7. Download the `jurnara-release-aab` artifact.
8. Test the release build before Play Console submission.

## Important

Keep the keystore and its passwords backed up securely. Losing the signing material can complicate future updates to the same Android application.

The package ID is:

`com.jurnara.app`

The current web/Capacitor version is:

`2.0.0`

The first Play release can use version code 1. Future releases must use higher version codes.

## Current release boundary

The repository has a verified production web build and a verified debug APK build. A signed release AAB cannot be generated until the required signing secrets are configured. This workflow deliberately fails early when those secrets are missing.
