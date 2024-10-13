const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const Users = await prisma.user.createMany({
    data: [
    ],
    skipDuplicates: true,
  });

  const CarrouselParts = await prisma.carrouselPart.createMany({
    data: [
      {
        carrouselName: "home",
        order: 1,
        description: "The Sky-Dweller is a compelling timepiece of contemporary design.",
        title: "John Doe",
        subtitle: "CEO, Company Name",
        image:
          "https://plus.unsplash.com/premium_photo-1675432656807-216d786dd468?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        carrouselName: "home",
        order: 2,
        description: "The Sky-Dweller is a compelling timepiece of contemporary design.",
        title: "John Doe",
        subtitle: "CEO, Company Name",
        image:
          "https://plus.unsplash.com/premium_photo-1669725687221-6fe12c2da6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        carrouselName: "home",
        order: 3,
        description: "The Sky-Dweller is a compelling timepiece of contemporary design.",
        title: "John Doe",
        subtitle: "CEO, Company Name",
        image:
          "https://plus.unsplash.com/premium_photo-1669725687150-15c603ac6a73?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w1fHx8ZW58MHx8fHx8",
      },
      {
        carrouselName: "home",
        order: 4,
        description: "The Sky-Dweller is a compelling timepiece of contemporary design.",
        title: "John Doe",
        subtitle: "CEO, Company Name",
        image:
          "https://plus.unsplash.com/premium_photo-1669740462444-ba6e0c316b59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
      },
      {
        carrouselName: "home",
        order: 5,
        description: "The Sky-Dweller is a compelling timepiece of contemporary design.",
        title: "John Doe",
        subtitle: "CEO, Company Name",
        image:
          "https://plus.unsplash.com/premium_photo-1669725687221-6fe12c2da6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    skipDuplicates: true,
  });

  const DynamicTexts = await prisma.dynamicText.createMany({
    data: [
      {
        id: "home",
        title: "Welcome to our store",
        subtitle: "Mega Subtitle that should show in font 36",
        description: "We are a company that sells watches 2",
      },
    ],
    skipDuplicates: true,
  });

  const FAQ = await prisma.question.createMany({
    data: [
      {
        id: "home",
        question: "How do I track my order?",
        answer: "You can track your order by clicking on the link in the email we sent you.",
        order: 1,
        published: true,
      },
      {
        id: "home",
        question: "How do I return an item?",
        answer: "You can return an item by going to the return section of our website.",
        order: 2,
        published: false,
      },
      {
        id: "home",
        question: "Can I cancel my order?",
        answer: "You can cancel your order by contacting us at our email.",
        order: 3,
        published: true,
      },
    ],
    skipDuplicates: true,
  });

}

main()