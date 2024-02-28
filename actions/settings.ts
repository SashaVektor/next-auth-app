"use server"

import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendVereficationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { SettingsSchema } from "@/schemas"
import * as z from "zod"
import bcrypt from 'bcryptjs'


export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser()

    if (!user) {
        return {
            error: "Unauthorized!"
        }
    }

    const dbUser = await getUserById(user.id ? user.id : "")

    if (!dbUser) {
        return {
            error: "Unauthorized!"
        }
    }

    if (user.isOAuth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled = undefined
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)

        if (existingUser && existingUser.id !== user.id) {
            return {
                error: "This email already in use!"
            }
        }

        const verificationToken = await generateVerificationToken(values.email)

        await sendVereficationEmail(verificationToken.email, verificationToken.token)

        return {
            success: "Verification email sent!"
        }
    }

    if(values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(values.password, dbUser.password)

        if(!passwordsMatch) {
            return {
                error: "Incorrect password"
            }
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10)
        values.password = hashedPassword
        values.newPassword = undefined
    }

    await db.user.update({
        where: {
            id: dbUser.id
        },
        data: {
            ...values
        }
    })

    return {
        success: "Settings updated!"
    }
}