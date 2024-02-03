import prisma from '@/lib/prisma';

//userId === cartId in the db
export interface WishListBodyInterface{
    userId: string
    productId: string,
    wishListItemId?: string
}

export interface WishListQueryInterface{
    productId?: string,
    userId: string,
}

class WishList{
	public body: WishListBodyInterface | null | undefined
	public query: WishListQueryInterface | null | undefined
	public errors: String[]
	public response: any
	public prisma: typeof prisma
  
	constructor(body?: WishListBodyInterface, query?: WishListQueryInterface){
		this.body = body
		this.query = query
		this.errors = [] 
		this.response = null
		this.prisma = prisma
	}

	async getWishListItems(){
		if(!this.query?.userId) return this.errors.push("informations are missing")

		const items = await this.prisma.favorite.findMany({
			where: {
				user_id: this.query?.userId,
			},
			select: {
				product: true,
				id: true,
			}
		}).catch(err => this.errors.push("it was not possible to get the products"))

		if(this.errors.length > 0) return
		this.response = items
	}  


	async getWishListItem(){
		if(!this.query?.userId || !this.query?.productId) return this.errors.push("informations are missing")

		const product = await this.prisma.favorite.findMany({
			where: {
				product_id: this.query.productId,
				user_id: this.query.userId
			},
			select: {
				product: true
			}
		}).catch(err => this.errors.push("could not get product"))

		if(this.errors.length > 0) return
    
		this.response = product
	}

	async addToWishList(){

		if(!this.body?.userId || !this.body?.productId) return this.errors.push("informations are missing")

		const newProduct = await this.prisma.favorite.create({
			data: {
				user_id: this.body.userId,
				product_id: this.body.productId
			},
			select: {
				product: true,
				id: true,
			}
		}).catch((error) => this.errors.push('error creating product') && console.log(error))


		if(this.errors.length > 0) return

		this.response = newProduct
	}

	async removeFromWishList(){
		if(!this.body?.wishListItemId) return this.errors.push('you need the wishList item id to delete a product')
		if(!this.body?.userId) return this.errors.push('you need the userId to delete a product from wishList')

		const deletedProduct = await this.prisma.favorite.delete({
			where: {
				id: this.body.wishListItemId
			},
			select: {
				product: true,
				id: true,
			}
		}).catch((err) => {
			console.log(err)
			this.errors.push('error deleting product')
		})

		if(this.errors.length > 0) return

		this.response = deletedProduct
	}
  
	async removeAllFromWishList(){
		if(!this.body?.userId) return this.errors.push('you need the userId to delete a product from wishList')

		const deletedProducts = await this.prisma.favorite.deleteMany({
			where: {
				user_id: this.body.userId
			},
		}).catch(() => this.errors.push('error deleting product'))

		if(this.errors.length > 0) return

		this.response = deletedProducts
	}
}

export default WishList