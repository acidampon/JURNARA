# Career Pilot — Final Deployment Build

Career Pilot is a mobile-first career development platform prototype.

## Included
- First-run onboarding and persistent local profile
- Career direction and skills matching
- Opportunity saving and application tracking
- Structured CV Studio and text export
- Connected six-step career roadmap
- Career Coach with skill-gap and next-action guidance
- PWA manifest and offline-capable Vite PWA configuration
- Capacitor Android configuration
- GitHub Actions web and Android debug build workflows

## Run
npm install
npm run dev

## Production test
npm run build

## Current boundary
This build uses local browser storage and demo opportunities. It does not yet include secure cloud authentication/database, a live job feed, or an external AI provider. The next deployment work is production web verification, Android APK testing, release signing, and AAB publication.

## Release verification
Production web build has passed in GitHub Actions. Android debug build verification is now running from the same GitHub source.
