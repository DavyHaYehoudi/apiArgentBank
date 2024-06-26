import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../database/models/userModel.js";

const serviceUser = {
  createUser: async (serviceData) => {
    try {
      const user = await User.findOne({ email: serviceData.email });
      if (user) {
        throw new Error("Email already exists");
      }

      const hashPassword = await bcrypt.hash(serviceData.password, 12);

      const newUser = new User({
        email: serviceData.email,
        password: hashPassword,
        firstName: serviceData.firstName,
        lastName: serviceData.lastName,
      });

      let result = await newUser.save();

      return result;
    } catch (error) {
      console.error("Error in userService.js", error);
      throw new Error(error);
    }
  },

  getUserProfile: async (serviceData) => {
    try {
     const jwtToken = serviceData.headers.authorization.split("Bearer")[1].trim();
      const decodedJwtToken = jwt.decode(jwtToken);
      // const user = await User.findOne({ _id: decodedJwtToken.id });
      const user = await User.findOne({ _id: decodedJwtToken.id }).select('-createdAt -updatedAt');

      if (!user) {
        throw new Error("User not found!");
      }

      return user.toObject();
    } catch (error) {
      console.error("Error in userService.js", error);
      throw new Error(error);
    }
  },

  loginUser: async (serviceData) => {
    try {
      const user = await User.findOne({ email: serviceData.email });

      if (!user) {
        throw new Error("User not found!");
      }

      console.log('serviceData.password:', serviceData.password)
      const isValid = await bcrypt.compare(serviceData.password, user.password);
      console.log('isValid:', isValid)

      if (!isValid) {
        throw new Error("Password is invalid");
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY || "default-secret-key",
        { expiresIn: "1d" }
      );

      return { token };
    } catch (error) {
      console.error("Error in userService.js", error);
      throw new Error(error);
    }
  },

  updateUserProfile: async (serviceData) => {
    try {
      const jwtToken = serviceData.headers.authorization
        .split("Bearer")[1]
        .trim();
      const decodedJwtToken = jwt.decode(jwtToken);
      const user = await User.findOneAndUpdate(
        { _id: decodedJwtToken.id },
        {
          firstName: serviceData.body.firstName,
          lastName: serviceData.body.lastName,
        },
        { new: true }
      ).select('-createdAt -updatedAt');

      if (!user) {
        throw new Error("User not found!");
      }

      return user.toObject();
    } catch (error) {
      console.error("Error in userService.js", error);
      throw new Error(error);
    }
  },
};

export default serviceUser;
