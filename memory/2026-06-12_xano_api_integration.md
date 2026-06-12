# Xano API Integration (Letters)

## Date
2026-06-12

## Overview
Started integrating real data from the Xano instance by updating the API documentation (PRDs) for the `letter` endpoints based on the provided Swagger specification.

## Changes
1. **API Endpoints Documented**:
   - `GET /letter`: Retrieves all 22 letters (No auth required, supports `lang` query param).
   - `GET /letter/symbol/{symbol}`: Retrieves a specific letter by its Hebrew symbol (Auth required, supports `lang` query param).
   - `GET /letter/{letter_id}`: Retrieves a specific letter by its integer ID (Auth required, supports `lang` query param).
   - `POST /letter`, `PUT /letter/{letter_id}`, `PATCH /letter/{letter_id}`, `DELETE /letter/{letter_id}`: Standard CRUD endpoints (Auth required).
   
2. **Data Schema Documented**:
   - `id`: integer
   - `symbol`: string (Hebrew character)
   - `latin_id`: string (Latin name)
   - `visual_content`: object (nullable, contains image URLs)
   - `i18n_content`: object (nullable, contains localized text)

3. **PRD Updates**:
   - Updated `prd/Tech_Notice.md` to reflect the correct base URL (`https://api.najman.app/api:hyEJD2He`).
   - Updated the Smart Delivery endpoints section to match the real Xano routing (e.g., `/letter` instead of `/content/letters`).

## Next Steps
Waiting for user instructions to proceed with integrating these actual endpoints into the frontend logic (updating `useApi.ts` and data fetching hooks).
