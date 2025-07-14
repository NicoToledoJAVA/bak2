//  /src/daos/mongo/user.dao.js

import userModel from "./models/user.model.js";

class UserDAO {

  async saveUser(user) {
    try {
      let result = await userModel.create(user);
      return result;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  get model() {
    return userModel;
  }

  async getUsers() {
    try {
      let result = await userModel.find({});
      return result;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async getUserById(uid) {
    try {
      let result = await userModel.findOne({ _id: uid });
      return result;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async getUserByNum(num) {
    try {
      const result = await userModel.findOne({ num }).populate("orders");
      return result;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async getUserByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async updateUserByID(uid, obj) {
    try {
      let result = await userModel.updateOne({ _id: uid }, { $set: obj });
      return result;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }

  async updateUserByNum(num, data) {
    try {
      const result = await userModel.updateOne({ num }, { $set: data });
      return result;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }
  

  async deleteUserByID(uid) {
    try {
      const result = await userModel.deleteOne({ _id: uid });
      return result;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }
  
  async deleteUserByNum(num) {
    try {
      const result = await userModel.deleteOne({ num });
      return result;
    } catch (error) {
      console.error({ error });
      return null;
    }
  }
  
}



export default UserDAO;
