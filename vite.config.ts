import { defineConfig } from "vite";

// GitHub Pages ではリポジトリ名がパスに含まれる
// (https://s1f102302832.github.io/Create-Portfolio/) ため、base を合わせる
export default defineConfig({
  base: "/Create-Portfolio/",
});
