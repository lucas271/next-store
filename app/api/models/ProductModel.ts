import prisma from '@/lib/prisma';

//userId === cartId in the db
export interface ProductBodyInterface{
    userId?: string
    productId?: string,
    name?: string,
    description?: string,
    title?: string,
    price?: number,
    img?: string,
    quantity?: number,
    productQuantIncrement?: number
    categoryName?: string,
    brandName?: string
}

export interface ProductQueryInterface{
    productId?: string,
    limit?: number,
    skip?: number,
    categoryName?: string,
    brandId?: string,
    sortBy?: {
        isPriceAscending?: boolean,
        mostFavorites?: boolean,
        isNewer?: boolean,
    },
    startsWith?: string,
    includeSoldOut?: boolean,
}

class Product{
  public body: ProductBodyInterface | null | undefined
  public query: ProductQueryInterface | null | undefined
  public errors: String[]
  public response: any
  public prisma: typeof prisma
  
  constructor(body?: ProductBodyInterface, query?: ProductQueryInterface){

    this.body = body
    this.query = query
    this.errors = []
    this.response = null
    this.prisma = prisma
  }

  async getProducts(){
    const products = await this.prisma.product.findMany({
        skip: this.query?.skip || 0,
        take: this.query?.limit || 100, 
        where: {
            name: {
                startsWith: this.query?.startsWith || '',
                mode: "insensitive"
            },
            brand_id: this.query?.brandId,
            category_name: this.query?.categoryName,
            quantity: {gt: this.query?.includeSoldOut ? -1 : 0},
        }
    }).catch(err => this.errors.push("it was not possible to get the products"))

    if(this.errors.length > 0) return
    this.response = products
}  

  async getProduct(){
    if(!this.query?.productId) return this.errors.push("did not receive the product Id")

    const product = await this.prisma.product.findUnique({
        where: {
            id: this.query.productId
        }
    }).catch(err => this.errors.push("could not get product"))

    if(this.errors.length > 0) return
    
    this.response = product
  }

  async createNewProduct(){
    if(!this.body || !this.body.title || !this.body.name || !this.body.quantity || !this.body.description || !this.body.price) return this.errors.push("There are empty fields")

    const newProduct = await this.prisma.product.create({
        data: {
            title: this.body.title,
            description: this.body.description,
            img: this.body.img || '',
            name: this.body.name,
            price: Number(this.body.price),
            quantity: Number(this.body.quantity) || 1,
            brand_id: this.body?.brandName || undefined,
            category_name: this.body?.categoryName || undefined,
        }
    }).catch((error) => this.errors.push('error creating product') && console.log(error))

    if(this.errors.length > 0) return

    this.response = newProduct
  }

  async deleteProduct(){
    if(!this.body) return this.errors.push("did not receive any info")
    if(!this.body.productId) return this.errors.push("did not receive the product to delete")
    if(!this.body.userId) return this.errors.push("you need to be an authorized user to create a product")
    if(!(await this.isAuthorized(this.body.userId))) return this.errors.push("user not authorized")

    const deletedProduct = await this.prisma.product.delete({
        where: {
            id: this.body.productId
        }
    }).catch(() => this.errors.push('error deleting product'))

    if(this.errors.length > 0) return

    this.response = deletedProduct
  }

  async updateProduct(){
    if(!this.body || !this.body.title || !this.body.name || !this.body.quantity || !this.body.description || !this.body.price) return this.errors.push("There are empty fields")
    if(!this.body.userId) return this.errors.push("you need to be an authorized user to create a product")
    if(!this.body.productId) return this.errors.push(" did not receive the product to update")
    if(!(await this.isAuthorized(this.body.userId))) return this.errors.push("user not authorized")

    const updatedProduct = await this.prisma.product.update({
        where: {
            id: this.body.productId
        },
        data:{
            title: this.body.title,
            description: this.body.description,
            img: this.body.img || '',
            name: this.body.name,
            price: this.body.price,
            quantity: Number(this.body.quantity) || 1,
            brand_id: this.body.brandName,
            category_name: this.body.categoryName,
        }
    }).catch(() => this.errors.push('error creating product'))

    if(this.errors.length > 0) return

    this.response = updatedProduct
  }

  async decreaseProductQuantByOne(){
    if(!this.body || !this.body.productId) return this.errors.push("info missing")
    
    //Up to know for bussiness logic it should ALLOW negative items in storage. 
    const product = await this.prisma.product.update({
        where: {
            id: this.body.productId
        },
        data:{
            quantity: {decrement: 1}
        }
    }).catch(() => this.errors.push('error decreasing product'))

    if(this.errors.length > 0) return

    this.response = product
  }

  async increaseProductQuant(){
    if(!this.body || !this.body.productQuantIncrement || !this.body.productId || !this.body.userId) return this.errors.push("info missing")
    if(!(await this.isAuthorized(this.body.userId))) return this.errors.push("user not authorized")

    const product = await this.prisma.product.update({
        where: {
            id: this.body.productId
        },
        data:{
            quantity: {increment: Number(this.body.productQuantIncrement)}
        }
    }).catch(() => this.errors.push('error decreasing product'))

    if(this.errors.length > 0) return

    this.response = product
  }

  private async isAuthorized(userId: string){
    const user = await this.prisma.user.findFirst({where: {id: userId}}).then(res => res).catch(() => {
        this.errors.push("not able to check if user is authorized")
        return null
    })
    if(this.errors.length > 0)
    if(user?.role === 'ADMIN') return true
    return false
  }
}

export default Product