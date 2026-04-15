import { PrismaClient } from '@prisma/client'
import { allProducts } from '../src/lib/dummy-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  for (const item of allProducts) {
    const product = item as any;
    const p = await prisma.product.create({
      data: {
        title: product.title,
        price: product.price,
        numericPrice: product.numericPrice,
        oldPrice: product.oldPrice,
        discount: product.discount,
        rating: product.rating,
        reviews: product.reviews,
        image: product.image,
        images: product.images || [product.image],
        description: product.description,
        category: product.category || 'General',
        inStock: product.inStock !== undefined ? product.inStock : true,
        specs: product.specs || {}
      }
    })
    console.log(`Created product with id: ${p.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
