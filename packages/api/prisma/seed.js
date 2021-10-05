import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const exClient = await prisma.client.create({
    data: {
      fullName: 'Example Client',
        displayName: 'E.C.',
        provider: {
          create: {
            fullName: 'Example Provider',
            displayName: 'Ex. Prov.',
            notes: 'this where you can write down notes about the provider etc.',
            portal: 'portal?',
          }
        }
      }
  })
  
  const exTreatPlan = await prisma.treatmentPlan.create({
    data: {
      title: 'Example Treatment Plan',
      description: 'this is the description of The Example Treatment Plan. Here you should write something short, but descriptive, to help identify the correct Treatment Plan',
      bcba: {
        create: {
          employee: {
            create: {
              fullName: 'Example Bcba',
              displayName: 'ExBcba',
              password: 'bcba123',
              position: 'BCBA',
              email: 'example@email.com',
            }
          },
          clients: {
            connect: {
              id: exClient.id
            }
          }
        }
      },
      client: {
        connect: {
          id: exClient.id
        }
      }
    }
  })
  
  
  console.log(`Database Seeded!\nclient: ${exClient}\nTreatmentPlan: ${exTreatPlan}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async() => {
    await prisma.$disconnect
  })