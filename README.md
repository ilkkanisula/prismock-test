# prismock-test
Tried to replicate problem with findFirst using include.

# Run test 
```
npm i 
npx prisma generate
npx ts-node prismock-test.ts
```

Output should be (no seats included in query):
```
{ id: 1, name: 'Entry 1', groupId: 1, seats: [] }
```

