// Copies the default-font CSS + woff2 files into dist/ as real, separate files rather than
// letting them go through Vite's CSS asset pipeline — that's what was forcing them to get
// base64-inlined into the main stylesheet (see src/index.ts's comment on why fonts.css is
// opt-in). A plain file copy keeps the woff2s as actual lazily-fetched network resources,
// which is also just a better outcome for anyone who *does* want the default font.
import { cpSync } from 'node:fs'

cpSync('src/styles/fonts.css', 'dist/fonts.css')
cpSync('src/styles/fonts', 'dist/fonts', { recursive: true })
