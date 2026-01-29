# Step 1 – Audit & Plan

## Référence (nemesis)
- Utilise Nitrado API file_server (list/download).
- Killfeed Discord en slash commands.
- ADM/RPT archive: upload des fichiers complets en attachments.

## Décisions
- Rebuild clean (monorepo apps/api + apps/web).
- Architecture modulaire (ingest/parser/discord).
- Cursors par fichier pour éviter reprocess.
- Dédup via hash unique.

## Livrables Step 1
- ARCHITECTURE.md
- Plan détaillé + backlog steps

## Steps suivantes (proposition)
2. Bootstrap NestJS (modules + config + prisma) + schema DB
3. Ingest Nitrado (list/download + cursor)
4. Parse ADM (kills, connexions, environnement)
5. Dispatch Discord (embeds + rate limit)
6. UI Vue (config + status)

