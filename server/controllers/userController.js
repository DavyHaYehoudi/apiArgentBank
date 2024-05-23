import serviceUser from "../scripts/services/userService.js"

const userController ={

   createUser : async (req, res) => {
    let response = {}
  console.log('req.body :',req.body);
    try {
      const responseFromService = await serviceUser.createUser(req.body)
      response.status = 200
      response.message = 'User successfully created'
      response.body = responseFromService
    } catch (error) {
      console.error('Something went wrong in userController.js', error)
      response.status = 400
      response.message = error.message
    }
  
    return res.status(response.status).send(response)
  },
  
   loginUser : async (req, res) => {
    let response = {}
  
    try {
      const responseFromService = await serviceUser.loginUser(req.body)
      response.status = 200
      response.message = 'User successfully logged in'
      response.body = responseFromService
    } catch (error) {
      console.error('Error in loginUser (userController.js)')
      response.status = 400
      response.message = error.message
    }
  
    return res.status(response.status).send(response)
  },
  
   getUserProfile : async (req, res) => {
    let response = {}
  
    try {
      const responseFromService = await serviceUser.getUserProfile(req)
      response.status = 200
      response.message = 'Successfully got user profile data'
      response.body = responseFromService
    } catch (error) {
      console.log('Error in userController.js')
      response.status = 400
      response.message = error.message
    }
  
    return res.status(response.status).send(response)
  },
  
   updateUserProfile : async (req, res) => {
    let response = {}
  
    try {
      const responseFromService = await serviceUser.updateUserProfile(req)
      response.status = 200
      response.message = 'Successfully updated user profile data'
      response.body = responseFromService
    } catch (error) {
      console.log('Error in updateUserProfile - userController.js')
      response.status = 400
      response.message = error.message
    }
  
    return res.status(response.status).send(response)
  }
}
export default userController