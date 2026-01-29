import { Module } from "@nestjs/common";
import { NitradoService } from "./nitrado.service";

@Module({
  providers: [NitradoService],
  exports: [NitradoService],
})
export class NitradoModule {}
