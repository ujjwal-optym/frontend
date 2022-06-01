import type { NextApiRequest, NextApiResponse } from 'next'
import conn from '../../lib/db'
import jwt from 'jwt'

type Data = {
    ok: boolean
    userExists: boolean
}

type userData = {
    email: string,
    password: string
}

const generateToken =  (user : userData) : string => {
    const token = jwt.sign(
        {
            email: user.email
        }, 
        process.env.SECRET_KEY, 
        {
            expiresIn: '10h'
        }
    );
    return token;
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { email, password } = req.body;
        const values = [email , password]

        const findUserQuery = `SELECT * FROM users WHERE email = $1`;
        const userResult : any = await conn.query(
            findUserQuery,
            [email]
        )
        console.log(userResult.rows);
       
        const query = `INSERT INTO users(email, password) VALUES($1, $2)`

        if(userResult.rows.length === 0) {
            const result = await conn.query(
                query,
                values,
                (err: Error, result: any) => {
                    console.log("Error :", err)
                    console.log("Result: ", result)
                }
            )
            res.status(200).send( { ok: true, userExists: false })
        }
        else res.status(200).send( {ok: false, userExists: true });
    } catch ( error ) {
        res.status(400).send({ ok: false, userExists: true })
    }
};