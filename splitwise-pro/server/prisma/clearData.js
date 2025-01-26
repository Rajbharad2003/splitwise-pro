const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Start by deleting all related data (dependent models)

  // Delete transactions (they depend on users and expenses)
  await prisma.transaction.deleteMany({});
  
  // Delete expense splits (they depend on expenses and users)
  await prisma.expenseSplit.deleteMany({});
  
  // Delete expenses (they depend on users and groups)
  await prisma.expense.deleteMany({});
  
  // Delete group members (they depend on groups and users)
  await prisma.groupMember.deleteMany({});
  
  // Delete groups (they depend on users)
  await prisma.group.deleteMany({});
  
  // Delete users (no foreign keys depend on them now)
  await prisma.user.deleteMany({});
  
  console.log('All data has been deleted.');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
