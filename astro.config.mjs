import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import syntaxTheme from "./syntax-theme.json";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://laraveljutsu.net",
  image: {
    service: passthroughImageService(),
  },
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: "material-theme-palenight",
      langs: [],
      wrap: false,
    },
  },
});
