# Fresh project

Your new Fresh project is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Compile

To compile the project:

```bash
deno task build # run first to generate deno fresh
deno compile -A --include _fresh --include static --include deno.json main.ts
deno compile -A --include deno.json --include _fresh --include static --target x86_64-unknown-linux-gnu main.ts
```
