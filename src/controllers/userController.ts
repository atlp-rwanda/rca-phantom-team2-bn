import { hashPassword } from "./../utils/passwords/hashPassword";
import { Request, Response } from "express";
import dotenv from "dotenv";
import UserModel from "../models/UserModel";
import { API_RESPONSE } from "../utils/response/response";
import { sendEmail } from "../utils/email/sendEmail";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  const { email, role, firstName, lastName } = req.body;

  const password: string = Math.random().toString(36).substring(2, 8);

  try {
    const userExists: UserModel | null = await findUserByEmail(email);

    if (userExists) {
      return API_RESPONSE(res, {
        success: false,
        message: res.__("user_exits_message"),
        status: 400,
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      role: role,
    });
    const { password: _, ...rest } = newUser.toJSON();

    sendEmail(email, password, res);

    return API_RESPONSE(res, {
      success: true,
      message: res.__("user_created_message"),
      data: rest,
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return API_RESPONSE(res, {
      success: false,
      message: res.__("failed_to_create_user_message"),
      status: 400,
    });
  }
};

const findUserByEmail = async (email: string) => {
  try {
    const user: UserModel | null = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const signIn = (req: Request, res: Response) => {
  UserModel.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return API_RESPONSE(res, {
          success: true,
          message: res.__("user_not_found_message"),
          data: {},
          status: 404,
        });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return API_RESPONSE(res, {
          success: false,
          message: res.__("invalid_password_message"),
          status: 401,
        });
      }

      // let token = jwt.sign({ id: user.id }, String(process.env.AUTH_KEY), {
      //   expiresIn: 86400, // 24 hours
      // });

      let token = jwt.sign({ id: user.id }, "PHANTOM_KEYZ", {
        expiresIn: 86400, // 24 hours
      });

      let uObject = (({ id, firstName, lastName, email, role }) => ({
        id,
        firstName,
        lastName,
        email,
        role,
      }))(user);

      return API_RESPONSE(res, {
        success: true,
        message: res.__("signin_successful_message"),
        data: { uObject, accessToken: token },
        status: 200,
      });
    })
    .catch((err) => {
      return API_RESPONSE(res, {
        success: false,
        message: res.__("failed_to_sign_in_message"),
        status: 400,
      });
    });
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).send("Logged out successfully");
  });
};
