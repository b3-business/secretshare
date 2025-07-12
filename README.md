# SecretShare

# Demo

[Demo Here](https://secretshare.ebiko.me/)


## Features
- Share secrets/passwords via a simple web interface
- configureable expiration time for each secret

## Info

SecretShare is a simple web application to share secrets or passwords with others.
It stores all secrets in memory, thus it is not suitable for long-term storage.
It is designed to be used for temporary sharing of secrets, such as passwords or sensitive information.

The secrets are encrypted using AES-GCM with a randomly generated key. However you can also use a custom key to encrypt the secrets.
If you do not provide a custom key, the application will generate a random key for you which will be added to the URL. 

If a custom key is provided, the application will not store the key in the URL, but will use it to encrypt the secrets. This way you can share the key with the recipient via a different channel (e.g. email, chat, etc.).

## disclaimer
This project is not intended for production use. It is a simple demo application to showcase and is currently used for personal purposes only.
The server is only temporary thus secrets will be lost when the server is scaled down or restarted.

## Self-Hosting

You can use the provided release binary file and run it on any server.
I recommend running it within an ubuntu docker container or similar, with an nginx reverse proxy in front of it, so that the proxy can handle SSL termination and other features.

Alternatively you can run the project locally using Deno, which is the runtime used to build this project.


### Developer Usage

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

### Debug Secret

Use this debug seret when developing locally.
```
/secret/0000?encryptionKey=OTBXU3IzWHFIN1B1QXNoNi94aE42dz09
```
