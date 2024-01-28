import prisma from '@/lib/prisma';

//userId === cartId in the db
export interface ReviewBodyInterface{
    userId: string
    commentId?: string,
    message?: string,
    productId?: string
}

export interface ReviewQueryInterface{    
    productId: string
}

class Review{
  public body: ReviewBodyInterface | null | undefined
  public query: ReviewQueryInterface | null | undefined
  public errors: String[]
  public response: any
  public prisma: typeof prisma
  
  constructor(body?: ReviewBodyInterface, query?: ReviewQueryInterface){

    this.body = body
    this.query = query
    this.errors = []
    this.response = null
    this.prisma = prisma
  }

  async getReviews(){
    if(!this.query?.productId) return this.errors.push('did not received the product to get the reviews from')
    const products = await this.prisma.review.findMany({
        where: {
            product_id: this.query?.productId
        }
    }).catch(err => this.errors.push("it was not possible to get the products"))


    if(this.errors.length > 0) return
    this.response = products
}  


  async createNewReview(){
    if(!this.body?.userId) return this.errors.push('need to be logged to create a review')
    if(!this.body?.productId) return this.errors.push('did not receive the reviewed product id')
    if(!this.body?.message) return this.errors.push("did not receive the message")
    const newReview = await this.prisma.review.create({
        data: {
            userId: this.body?.userId,
            product_id: this.body.productId,
            message: this.body?.message
        }
    }).catch((error) => this.errors.push('error creating product') && console.log(error))
    if(this.errors.length > 0) return
    this.response = newReview
  }

  async deleteReview(){
    if(!this.body?.userId) return this.errors.push("You need to be logged to delete your review")
    if(!this.body?.commentId) return this.errors.push("did not receive message id")

    const deletedReview = await this.prisma.review.delete({
        where:{
            id: this.body.commentId,
            userId: this.body.userId
        }
    }).catch(() => this.errors.push('error deleting product'))

    if(this.errors.length > 0) return

    this.response = deletedReview
  }

  async updateMessage(){
    if(!this.body?.userId) return this.errors.push("You need to be logged to update your review")
    if(!this.body?.commentId) return this.errors.push("did not receive messageId")
    if(!this.body?.message) return this.errors.push("No message received")


    const updatedReview = await this.prisma.review.update({
        where: {
            id: this.body.commentId,
            userId: this.body.userId
        },
        data:{
            message: this.body.message
        }
    }).catch(() => this.errors.push('error updating message'))

    if(this.errors.length > 0) return

    this.response = updatedReview
  }
}

export default Review