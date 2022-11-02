import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      avatarUrl: 'https://github.com/matheusbrauna.png',
    },
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example pool',
      code: 'POL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-20T12:00:00.024Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-21T12:00:00.024Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'ES',

      guesses: {
        create: {
          firstTeamPoints: 3,
          secondsTeamPoints: 2,
          participant: {
            connect: {
              userId_poolId: {
                poolId: pool.id,
                userId: user.id,
              },
            },
          },
        },
      },
    },
  })
}

main()
