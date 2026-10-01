// @ts-check
// Webflow Cloud rewrites this at deploy time: base, output, adapter, build.assetsPrefix
// and the image service are overridden. These values mirror that locally.
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";

const mountPath = "/app";

export default defineConfig({
  base: mountPath,
  build: {
    assetsPrefix: mountPath,
  },
  output: "server",
  adapter: cloudflare(),
  integrations: [react()],
});
