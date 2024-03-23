```
npm install
npm run dev
```

```
npm run deploy
```

wrangler.toml->   this file contains env variable that'll be used by cloudflare workers


the stack :
->react in the frontend
->cloudlfare workers in the backend
->zod as the validation library,type inference for the ->frontend types
->typescript as the language
->prisma (ORM)
->postgress as DB
->jwt for authentication