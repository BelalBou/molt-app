# Architecture – Molt Killfeed (DayZ / Nitrado / Discord)

## Objectif
Nouveau service killfeed DayZ, robuste, scalable, réutilisable. Stack : NestJS + Prisma + PostgreSQL + Vue 3.

## Vue d’ensemble
- Ingress : récupération des logs Nitrado (ADM/RPT) via API file_server.
- Parser : parseurs déterministes par type de log (ADM/RPT), versionnés et testables.
- Store : stockage normalisé des événements (combat, connexions, environnement, admin, etc.).
- Dispatch : publication Discord (channels configurés, backpressure, rate limit).
- UI : dashboard Vue (config serveur, mapping channels, statut ingest, filtres).

## Modules NestJS
- config : gestion .env + validation Zod.
- nitrado : client API (list/download/upload/delete, settings, services).
- ingest : scheduler/poller + gestion des cursors de fichiers.
- parser : registry de parseurs ADM/RPT (strict, unit tested).
- events : normalisation des événements + persistence.
- discord : client bot + routing vers channels + embeds.
- admin : endpoints admin (debug, reprocess, purge, backfill).
- audit : logs techniques (erreurs, retry, stats).

## Flux ADM/RPT
1. listFiles Nitrado -> détecter nouveaux fichiers / rotations.
2. downloadFile -> récupérer contenu.
3. cursor -> conserver lastFile + lastOffset.
4. parse -> convertir lignes en événements typés.
5. dedup -> hash stable source + timestamp + payload.
6. store -> Prisma (batch insert).
7. dispatch -> Discord (channels configurés).

## Performance & Scalabilité
- Traitement par lots + pagination.
- Déduplication en base (index unique sur hash).
- Queue interne (BullMQ si besoin) pour découpler ingest/dispatch.
- Index sur (serverId, eventType, ts).

## Modèle de données (proposition)
- Server: id, serviceId, guildId, mission, platform, ftpUsername
- IngestCursor: id, serverId, fileType(ADM/RPT), lastFile, lastOffset, updatedAt
- LogEvent: id, serverId, type, ts, payload(jsonb), hash(unique)
- DiscordConfig: id, guildId, serverId, channelIds(jsonb), isActive
- AuditLog: id, scope, level, message, meta(jsonb), ts

## Discord
- Catégorie dédiée (molt-tests) pour tests.
- Channels par type: killfeed, adm-archive, rpt-archive.
- Limitation: rename channel max 2/10min.

## Tests
- Unit tests parseurs (fichiers ADM/RPT fixtures).
- Tests d’intégration ingest (mock Nitrado API).

