import type { NextApiRequest, NextApiResponse } from 'next'
import conn from '../../lib/db'
import jwt from 'jsonwebtoken'

type Data = {
    ok: boolean
    userExists: boolean
    data: any
}

const secretKey : any = process.env.SECRET_KEY;

type userType = {
    email: string
}

const generateToken =  (user: userType) => {
    const token : string = jwt.sign(
        {
            email: user.email,
        }, 
        secretKey, 
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
        if(userResult.length > 0) console.log(userResult.rows);
       
        const query = `INSERT INTO users(email, password) VALUES($1, $2)`

        if(userResult.rows.length === 0) {
            const result = await conn.query(
                query,
                values,
                (err: Error, result: any) => {
                    if(err) console.log("Error :", err)
                    console.log("Result: ", result)
                }
            )
            const token : string = generateToken({ email })
            res.status(200).send( { ok: true, userExists: false, data: token })
        }
        else res.status(200).send( {ok: false, userExists: true, data: null });
    } catch ( error ) {
        res.status(400).send({ ok: false, userExists: true, data: null })
    }
};