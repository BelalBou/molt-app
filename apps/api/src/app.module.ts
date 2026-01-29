import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { validateEnv } from "./config/env";
import { PrismaModule } from "./prisma/prisma.module";
import { NitradoModule } from "./nitrado/nitrado.module";
import { IngestModule } from "./ingest/ingest.module";
import { ParserModule } from "./parser/parser.module";
import { EventsModule } from "./events/events.module";
import { DiscordModule } from "./discord/discord.module";
import { AuditModule } from "./audit/audit.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    PrismaModule,
    NitradoModule,
    IngestModule,
    ParserModule,
    EventsModule,
    DiscordModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
