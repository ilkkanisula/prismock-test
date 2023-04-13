import { Prisma, PrismaClient } from '.prisma/client';
import { generatePrismock } from 'prismock';

async function seedData(prisma: PrismaClient) {
    const user: Prisma.UserCreateInput[] = [
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Charlie' },
    ];
    const group: Prisma.GroupCreateInput[] = [
        {
            name: 'Group 1',
            members: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        },
        {
            name: 'Group 2',
            members: {
                connect: [{ id: 1 }, { id: 2 }]
            }
        }

    ]

    const entry: Prisma.EntryCreateInput[] = [
        {
            name: 'Entry 1',
            group: {
                connect: { id: 1 }
            },
            seats: {
                connect: [{ id: 1 }]
            }
        },
        {
            name: 'Entry 2',
            group: {
                connect: { id: 1 }
            },
            seats: {
                connect: [{ id: 2 }]
            }
        },

    ];
    for (const u of user) {
        await prisma.user.create({ data: u });
    }
    for (const g of group) {
        await prisma.group.create({ data: g });
    }
    for (const e of entry) {
        await prisma.entry.create({ data: e });
    }
}


async function main() {
    const prisma = await generatePrismock();
    await seedData(prisma);


    const e = (await prisma.entry.findFirst({
        where: { id: 1 },
        include: {
            seats: true
        }
    }));
    type EntryWithSeats = Prisma.EntryGetPayload<{ include: { seats: true } }>;
    // const e: EntryWithSeats = (await prisma.entry.findFirst({
    //     where: { id: 1 },
    //     include: {
    //         seats: true
    //     }
    // }));
    console.log(e);
}
main()
