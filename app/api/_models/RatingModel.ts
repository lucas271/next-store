import prisma from '@/lib/prisma';

//userId === cartId in the db
export interface RatingBodyInterface{
    userId: string,
    reviewId: string,
    ratingId?: string,
    ratingValue?: string,
    productId?: string
}

export interface RatingQueryInterface{    
    productId: string
}

class Rating{
	public body: RatingBodyInterface | null | undefined
	public query: RatingQueryInterface | null | undefined
	public errors: String[]
	public response: any
	public prisma: typeof prisma
  
	constructor(body?: RatingBodyInterface, query?: RatingQueryInterface){

		this.body = body
		this.query = query
		this.errors = []
		this.response = null
		this.prisma = prisma
	}

	async getRatings(){
		if(!this.query?.productId) return this.errors.push('did not received the product to get the ratings for from')
		const ratings = await this.prisma.rating.findMany({
			where: {
				product_id: this.query?.productId
			}
		}).catch(err => this.errors.push("it was not possible to get the ratings"))
		if(this.errors.length > 0) return
		this.response = ratings
	}  


	async createNewRating(){
		if(!this.body?.userId) return this.errors.push('need to be logged to create rate something')
		if(!this.body?.productId) return this.errors.push('did not receive the rating id')
		if(!this.body?.reviewId) return this.errors.push('did not receive the rating id')

		if(Number(!this.body?.ratingValue)) return this.errors.push("did not receive a valid rating")
		const newRating = await this.prisma.rating.create({
			data: {
				user_id: this.body?.userId,
				review_id: this.body?.reviewId,
				product_id: this.body.productId,
				rate: Number(this.body.ratingValue)
			}
		}).catch((error) => this.errors.push('error creating rating'))

		if(this.errors.length > 0) return
		this.response = newRating
	}

	async deleteRating(){
		if(!this.body?.userId) return this.errors.push("You need to be logged to delete your rating")
		if(!this.body?.ratingId) return this.errors.push("did not receive rating id")

		const deletedRating = await this.prisma.rating.delete({
			where:{
				id: this.body.ratingId,
				user_id: this.body.userId
			}
		}).catch(() => this.errors.push('error deleting rating'))

		if(this.errors.length > 0) return

		this.response = deletedRating
	}

	async updateRating(){
		if(!this.body?.userId) return this.errors.push("You need to be logged to update your rating")
		if(!this.body?.ratingId) return this.errors.push("did not receive ratingId")
		if(!Number(this.body?.ratingValue)) return this.errors.push("No valid rating received")


		const updatedRating = await this.prisma.rating.update({
			where: {
				id: this.body.ratingId,
				user_id: this.body.userId
			},
			data:{
				rate: Number(this.body.ratingValue)
			}
		}).catch(() => this.errors.push('error updating rating'))

		if(this.errors.length > 0) return

		this.response = updatedRating
	}
}

export default Rating