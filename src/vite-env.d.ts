/// <reference types="vite/client" />

declare module '*.css';

interface ImportMetaEnv {
  readonly VITE_GITHUB_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
