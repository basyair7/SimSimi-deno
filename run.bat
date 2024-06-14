cls;
deno run --unstable-sloppy-imports --config tsconfig.json --import-map=import_map.json --allow-net --allow-read --allow-env src/server.ts;