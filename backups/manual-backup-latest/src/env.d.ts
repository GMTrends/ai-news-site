/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly EMAILOCTOPUS_API_KEY: string;
  readonly EMAILOCTOPUS_LIST_ID: string;
  readonly SITE: string;
  readonly NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}