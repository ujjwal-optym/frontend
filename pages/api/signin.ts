import type { NextApiRequest, NextApiResponse } from 'next'
import conn from '../../lib/db'
import jwt from 'jsonwebtoken'

type Data = {
    ok: boolean
    userExists: boolean
    token: string | null
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
        console.log(values);
        const findUserQuery = `SELECT * FROM users WHERE email = $1 AND password = $2`;
        const userResult : any = await conn.query(
            findUserQuery,
            values
        )
        // const errors = {};
        if(userResult.rows.length === 0) {
            res.status(401).send({ok: false, userExists: false, token: null});
        }
        else {
            const token = generateToken({ email });
            res.status(200).send({ok: true, userExists: true, token})
        }
    } catch ( error ) {
        res.status(400).send({ ok: false, userExists: true, token : null })
    }
};