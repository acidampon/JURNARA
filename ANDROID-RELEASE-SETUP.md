# JURNARA Android Release Setup

The debug Android build is documented as verified in GitHub Actions. The release workflow is configured to create a signed Google Play App Bundle (AAB) without storing the private signing key in the repository. Verify the latest workflow run before treating any particular build as release-ready.

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

The repository README currently declares application version `2.1.0` and Android version code `2`. However, the Android Gradle project is generated during the build and is not committed in this repository, so these values have not been independently verified against generated `android/app/build.gradle` metadata here. Before publishing, inspect the generated Gradle configuration and the Play Console's latest uploaded version code. Never reuse a version code already accepted by Google Play.

## Current release boundary

The production web build has passed CI. A signed release AAB is not verified until the signing secrets are configured and the manual release workflow completes successfully. Do not infer Android release readiness from a web build. Confirm the generated Android project, package ID, version name, version code, signing certificate, and AAB artifact before Play Console submission.
