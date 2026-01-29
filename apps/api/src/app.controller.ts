import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  private resolveChangelogPath() {
    const cwd = process.cwd();
    if (cwd.endsWith('/apps/api')) {
      return path.resolve(cwd, '..', '..', 'docs', 'CHANGELOG-LIVE.md');
    }
    return path.resolve(cwd, 'docs', 'CHANGELOG-LIVE.md');
  }

  @Get('status')
  getStatus() {
    const filePath = this.resolveChangelogPath();
    const content = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf-8')
      : 'Changelog not found.';

    return {
      updatedAt: new Date().toISOString(),
      content,
    };
  }

  @Get('status/html')
  @Header('Content-Type', 'text/html; charset=utf-8')
  getStatusHtml() {
    const filePath = this.resolveChangelogPath();
    const content = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf-8')
      : 'Changelog not found.';

    const escaped = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const html = [
      '<!doctype html>',
      '<html lang=fr>',
      '<head>',
      '  <meta charset=utf-8 />',
      '  <meta name=viewport content=width=device-width, initial-scale=1 />',
      '  <title>Molt — Live Changelog</title>',
      '  <style>',
      '    body { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; padding: 24px; background: #0b0b0f; color: #e5e7eb; }',
      '    h1 { font-size: 18px; margin-bottom: 12px; }',
      '    pre { white-space: pre-wrap; background: #111827; padding: 16px; border-radius: 8px; }',
      '  </style>',
      '</head>',
      '<body>',
      '  <h1>Molt — Live Changelog</h1>',
      '  <pre>' + escaped + '</pre>',
      '</body>',
      '</html>',
    ].join('\n');

    return html;
  }
}
