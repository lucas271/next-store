import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt'
import Email from 'next-auth/providers/email';
import validator from "validator";

export interface UserBodyInterface{
  id?: string
  email: string,
  name: string,
  password: string,
  profilePic?: string,
}

class User{
  public body: UserBodyInterface
  public errors: String[]
  public response: any
  public prisma: typeof prisma
  
  constructor(body: UserBodyInterface){
    this.body = body
    this.errors = []
    this.response = null
    this.prisma = prisma
  }

  public async handleProviderUser(){
    await this.validateUser(true, true)
    if(this.errors.length > 0) return this.errors

    this.response = await this.prisma.user.findUnique({
      where:{
        email: this.body.email
      }
    })
    if(this.response) return
    const user = await this.prisma.user.create({
      data: {
        name: this.body.name,
        email: this.body.email,
        image: this.body.profilePic,
        id: this.body.id
      }
    }).catch(() => {
      this.errors.push('error creating user')})
    if(this.errors.length > 0) return
    this.response = user
    return this.response =  user
  }

  public async createUser(){
    await this.validateUser(true)
    if(this.errors.length > 0) return
    if(await this.userExists()) return this.errors.push('user already exists')
    const user = await this.prisma.user.create({
      data:{
        name: this.body.name,
        email: this.body.email,
        image: this.body.profilePic || ''
      },
    }).then(async (resp) => {
      await this.prisma.userCredentials.create({
          data: {
              userId: resp.id,
              password: bcrypt.hashSync(this.body.password, 6)
          }
      })
      return resp
  }) .catch((error) => {
    this.errors.push('error trying to create user'); 
  })
    if(this.errors.length > 0) return

    this.response = user
  }
  private async getUserCredentials(){

    const user = await this.prisma.user.findFirst({where: {
      OR: [
        { email: this.body.email },
        { id: this.body.id }
      ]    
    },
    select: {
      userCredential: true
    }
  }).catch(() => {
      this.errors.push("Erro ao tentar encontrar usuário")
      return null
    })

    return user
  }
  public async loginUser(){
    if(this.body.id) return this.errors.push("dados do usuário não recebidos")
    this.validateUser()
    if(this.errors.length > 0) return
    const user = await this.getUserCredentials()

    if(!user) return this.errors.push("usuario não existe")
    if(this.errors.length > 0) return

    if( !(bcrypt.compareSync(this.body.password, String(user.userCredential?.password)))) this.errors.push("Credenciais incorretas")
    this.response = await this.prisma.user.findFirst({
      where: {
        OR: [
          {id: this.body.id},
          {email: this.body.email}
        ]
      }
    })  
  }
  public async removeUser(){
    if(!this.body.id) return this.errors.push("ID do usuário não recebido")
    const isUser = await this.getUserCredentials()

    if(!isUser) this.errors.push('usuário não existe')

    const user = await this.prisma.user.delete({
      where: {
        id: this.body.id,
      },
    }).catch(() => {
      this.errors.push("Erro ao deletar usuário")
      return null
    })

    if(this.errors.length > 0) return

    this.response = user
  }

  //validate body that represents user
  private async validateUser(needsName: boolean = false, isProvider: boolean = false){
    try {
      if(
        !this.body.email && needsName||
        !this.body.password && !isProvider
      ) return this.errors.push("campos vazios")

      //validate Name
      if(needsName && !this.body.name) return this.errors.push("campos vazios")
      if(needsName && this.body.name.length > 40) return this.errors.push("nome n pode conter mais de 40 caracteres")
      if(needsName && /![^a-zA-Z ]/g.test(this.body.name)) return this.errors.push("Nome não pode conter números e caractéres especiais")

      //validateEmail
      if(!validator.isEmail(this.body.email || '') && needsName) return this.errors.push("Email Invalido")

      //validate Password
      if(isProvider) return
      if(this.body.password.length < 6) return this.errors.push("senha deve conter no minimo 6 caracteres")
      if(this.body.password.length > 30) return this.errors.push("senha não pode conter mais de 30 digitos")
      
      const UppercaseInPassword:number = this.body.password.match(/[A-Z]/g)?.length || 0
      const LowercaseInPassword:number = this.body.password.match(/[a-z]/g)?.length || 0
  
      if(UppercaseInPassword < 1) return this.errors.push("senha deve ter no minimo 1 letra maiúscula")
      if(LowercaseInPassword < 1) return this.errors.push("senha deve ter no minimo 1 letra minuscula")

    } catch (error) {
      console.log(error)
      this.errors.push("Algum dado invalido foi recebido")
    }
  }

  public async userExists(): Promise<boolean>{
    return await this.prisma.user.findFirst({
      where: {
        OR:[{email: this.body.email}, {id: this.body.id}]
      }
    }) !== null && true || false
  }
}

export default User