import { hashPassword } from "./../utils/passwords/hashPassword";
import { Request, Response } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import UserModel from "../model/UserModel";
import { API_RESPONSE } from "../utils/response/response";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

export const createUser = async (req: Request, res: Response) => {
    const { email, role, firstName, lastName } = req.body

    const password: string = Math.random().toString(36).substring(2, 8)

    try {
        const userExists: UserModel | null = await findUserByEmail(email)

        if (userExists) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("user_exits_message"),
                status: 400,
            })
        }
        const hashedPassword = await hashPassword(password)
        const newUser = await UserModel.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            role: role
        })
        const { password: _, ...rest } = newUser.toJSON()

        sendEmail(email, password, res)
        
        return API_RESPONSE(res, {
            success: true,
            message: res.__("user_created_message"),
            data: rest,
            status: 201,
        })

    } catch (error) {
        console.log(error)
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_create_user_message"),
            status: 400,
        })
    }
}

const findUserByEmail = async (email: string) => {
    try {
        const user: UserModel | null = await UserModel.findOne({
            where: {
                email: email,
            },
        })
        return user
    } catch (error) {
        return null
    }
}

export const signIn = (req: Request, res: Response) => {
  UserModel.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: user.id }, String(process.env.AUTH_KEY), {
        expiresIn: 86400, // 24 hours
      });

      let uObject = (({ id, firstName, lastName, email, role }) => ({
        id,
        firstName,
        lastName,
        email,
        role,
      }))(user);

      res.status(200).send({
        user: uObject,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};


export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).send("Logged out successfully")
  });
};
