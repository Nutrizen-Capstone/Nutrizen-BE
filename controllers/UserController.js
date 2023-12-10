import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword){
        return res.status(400).json({
            msg: "Password tidak sesuai"
        })
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({
            msg: "Register berhasil"
        })
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) {
            return res.status(400).json({
                msg: "Password salah!"
            });
        }

        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;

        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '5m'
        });

        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });

        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });

    } catch (error) {
        res.status(400).json({
            msg: "Email tidak ditemukan"
        });
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(204);
        const userId = user[0].id;
        await Users.update({refresh_token: null},{
            where:{
                id: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (req, res) => {
    try {
        // Mengambil ID pengguna dari parameter permintaan
        const userId = req.params.id;

        // Mencari pengguna berdasarkan ID
        const user = await Users.findByPk(userId);

        // Jika pengguna ditemukan, kirimkan data pengguna sebagai respons JSON
        if (user) {
            res.json(user);
        } else {
            // Jika pengguna tidak ditemukan, kirim respons dengan status 404
            res.status(404).json({ msg: "Pengguna tidak ditemukan" });
        }
    } catch (error) {
        // Tangani kesalahan dan kirim respons dengan status 500
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

export const completeProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await Users.findOne({
            where: {
                id: userId,
                isDataCompleted: false
            }
        });

        if (user) {
            const { photoUrl, birthDate, age, gender, weight, height, activity, goal } = req.body;

            await Users.update(
                {
                    photoUrl,
                    birthDate,
                    age,
                    gender,
                    weight,
                    height,
                    activity,
                    goal,
                    isDataCompleted: true
                },
                {
                    where: {
                        id: userId
                    }
                }
            );

            res.json({ msg: "Profil berhasil dilengkapi" });
        } else {
            res.status(403).json({ msg: "Profil sudah lengkap atau pengguna tidak ditemukan" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};