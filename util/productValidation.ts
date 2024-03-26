import {z} from 'zod'
const convertImgTobase64 = async (event: any) => {
    const fileType = event.type.split('/')[0];
    if(fileType !== 'image') return
    
    const reader = new FileReader();
    reader.readAsDataURL(event);
    const error = []
    reader.onload = async () => {
      const img = new Image();
      img.src = URL.createObjectURL(event);
      const isValidImg = await new Promise((resolve) => {
        img.onload = () => {
          resolve(((img.width / img.height) * 100  >= 100 && (img.width / img.height) * 100 <= 130) || (img.height / img.width) * 100  >= 100 && (img.height / img.width) * 100 <= 110 ? resolve(true) : resolve(false))
        };
      });   

      if(isValidImg) return true

    };
    reader.result
	reader.onerror = (error) => console.error("Error converting file to base64:", error);
  };


export const addProductValidation = z.object({
  title: z.string().min(1,'campo titulo está vazio').toUpperCase(),
  img: z.custom<FileList>().transform((file) => file.length > 0 && file.item(0)).refine(async (file) =>{
      if(!file || (!!file && file.size >= 10 * 1024 * 1024)) return false
      const fileType = file.type.split('/')[0];
      if(fileType !== 'image') return false

      const reader = new FileReader();

      const imageValidationResult: {isValid: boolean, errorMessage?: string, successImg?: string} = await new Promise((resolve) => {
        reader.onload = async () => {
          const img = new Image();
          img.src = URL.createObjectURL(file);

          const isValidImg: any = await new Promise((resolve) => {
            img.onload = () => {
              resolve(((img.width / img.height) * 100  >= 100 && (img.width / img.height) * 100 <= 130) || (img.height / img.width) * 100  >= 100 && (img.height / img.width) * 100 <= 110 ? resolve({isValid: true}) : resolve({isValid: false, errorMessage: 'Imagem tem tamanho invalido.'}))
            };
          });   
          if(isValidImg.errorMessage) return resolve({isValid: false, errorMessage: String(isValidImg?.errorMessage)})
          else{resolve({isValid: true, successImg: String(reader.result)})}
        };
        reader.readAsDataURL(file);
        reader.onerror = (error) => error && resolve({isValid: false, errorMessage: 'Imagem invalida'});
      })
      if(imageValidationResult.isValid) return true
      if(!imageValidationResult.isValid) return false
    }, {
    message: "Imagem invalida",
  })
  .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
    message: "Only images are allowed to be sent.",
  }),
  name: z.string().min(1, 'campo nome está vazio').max(100, 'nome deve conter menos de 100 caracteres').toUpperCase(),
  description: z.string().min(1).min(1, 'campo descrição está vazio').max(1000, 'descrição deve conter menos que 1000 caracteres'),
  price: z.string().min(1, 'campo preço está vazio').refine((val) => isNaN(Number(val)) ? false : true, {message: 'preço tem que ser um numero'}),
  quantity: z.string().min(1, 'campo quantidade está vazio').refine((val) => isNaN(Number(val)) ? false : true, {message: 'quantidade tem que ser um numero'})
})

export const editProductValidation = z.object({
  title: z.string().min(1,'campo titulo está vazio').toUpperCase().optional(),
  name: z.string().min(1, 'campo nome está vazio').max(100, 'nome deve conter menos de 100 caracteres').toUpperCase().optional(),
  img: z.custom<FileList>().transform((file) => file.length > 0 && file.item(0)).refine(async (file) =>{
    if(!file || (!!file && file.size >= 10 * 1024 * 1024)) return false
    const fileType = file.type.split('/')[0];
    if(fileType !== 'image') return false

    const reader = new FileReader();

    const imageValidationResult: {isValid: boolean, errorMessage?: string, successImg?: string} = await new Promise((resolve) => {
      reader.onload = async () => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        const isValidImg: any = await new Promise((resolve) => {
          img.onload = () => {
            resolve(((img.width / img.height) * 100  >= 100 && (img.width / img.height) * 100 <= 130) || (img.height / img.width) * 100  >= 100 && (img.height / img.width) * 100 <= 110 ? resolve({isValid: true}) : resolve({isValid: false, errorMessage: 'Imagem tem tamanho invalido.'}))
          };
        });   
        if(isValidImg.errorMessage) return resolve({isValid: false, errorMessage: String(isValidImg?.errorMessage)})
        else{resolve({isValid: true, successImg: String(reader.result)})}
      };
      reader.readAsDataURL(file);
      reader.onerror = (error) => error && resolve({isValid: false, errorMessage: 'Imagem invalida'});
      })
      if(imageValidationResult.isValid) return true
      if(!imageValidationResult.isValid) return false
    }, {
    message: "Imagem invalida",
  })
  .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
    message: "Only images are allowed to be sent.",
  }),
  description: z.string().min(1).min(1, 'campo descrição está vazio').max(1000, 'descrição deve conter menos que 1000 caracteres').optional(),
  price: z.string().min(1, 'campo preço está vazio').refine((val) => isNaN(Number(val)) ? false : true, {message: 'preço tem que ser um numero'}).optional(),
  quantity: z.string().min(1, 'campo quantidade está vazio').refine((val) => isNaN(Number(val)) ? false : true, {message: 'quantidade tem que ser um numero'}).optional()
})


export type addProductValidationType = z.infer<typeof addProductValidation>
export type editProductValidationType = z.infer<typeof editProductValidation>