export const boilerPlateResponse = async (classInstance: {errors: [], response: any} | any, callback: () => Promise<any>, responseSuccessName: string): Promise<Response> => {
    //callback === function method for boiler plate, cart === class instance to get response/errors por the callback.
    await callback()

    if(classInstance.errors.length > 0) return new Response(JSON.stringify({errors: classInstance.errors}), {
        status: 404,
    })

    return new Response(JSON.stringify({[responseSuccessName]: classInstance.response}), {
        status: 200,
    })
}