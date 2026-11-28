# CropTags Consumer Web Guidelines

React 19 + Vite 8 + Tailwind CSS v4 consumer portal deployed on Vercel (`croptags.com`).

## Release Changelog (Single Source of Truth)

- `CHANGELOG.md` at the root of this repo is the single master release changelog for CropTags. It is imported directly at build time to render the unlisted `/changelog` page (`https://croptags.com/changelog`).
- Keep entries grouped by `## vX.Y` CR batch with `Released on YYYY-MM-DD.`, `### Mobile app`, and `### Consumer web` sections (using `####` subheadings and `- ` bullets).
- Write entries in plain `/unslop` prose for stakeholders and farm owners. Do not include internal backend/security implementation details (RBAC internals, CORS config, demo farm seeds) or `.apk` download links on this public-facing site.

## Consumer Privacy Boundary

- `/trees/:id` is consumer-facing for durian buyers. Never display internal farmer-only fields such as symptom photos.
