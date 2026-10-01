# JURNARA — Deployment Build

JURNARA 2.1 is a mobile-first Career GPS platform designed to move people from direction to skills, proof, opportunities, applications, and career growth.

## Included
- First-run onboarding and persistent local profile
- Career direction and skills matching
- Opportunity saving and application tracking
- Structured CV Studio and text export
- Connected six-step career roadmap
- Career Intelligence, Opportunity Intelligence, Application Intelligence, and Outcome learning
- Proof-of-Skill Studio and career milestone tracking
- Career Coach with skill-gap and next-action guidance
- PWA manifest and offline-capable Vite PWA configuration
- Capacitor Android configuration
- GitHub Actions web build
- GitHub Actions Android debug build
- GitHub Actions signed Android AAB release pipeline

## Verified
- Production web build: **PASS**
- Android debug APK build: **PASS**
- Android SDK setup: **PASS**
- Capacitor Android generation/sync: **PASS**

## Release pipeline
The signed release workflow is manual and intentionally requires four GitHub Actions secrets:

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_ALIAS_PASSWORD`

The workflow never stores the private signing key in the repository. It decodes the keystore only inside the temporary GitHub runner and removes it after the job.

See [ANDROID-RELEASE-SETUP.md](ANDROID-RELEASE-SETUP.md) for the release procedure.

## Current product boundary
The current app is still a local-first prototype: profile/application data is stored in browser/device storage, opportunities are demo records, and the Career Coach is rule-based. Secure cloud authentication/database, live job feeds, and an external AI provider are not yet connected.

## Android identity
Package ID: `com.jurnara.app`

Current application version: `2.1.0`

The first Play release can use version code 1. Future Play releases must use higher version codes.

## Local development
```
npm install
npm run dev
```

Production build:
```
npm run build
```
