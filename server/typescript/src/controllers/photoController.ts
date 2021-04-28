import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import {
} from "./../models/quizControllerModels";
import {
} from "./../checkers/quizControllerModelsChecker";

const router = express.Router();

const fs = require('fs')

async function ls(userId: number) {
    const path = `/server/php/photos/user${userId}`;
    await fs.promises.mkdir(path);
    const dir = await fs.promises.opendir(path);
    const ret: any = []
    for await (const dirent of dir) {
        ret.append(`path/${dirent.name}`)
    }
    return ret
}

router.post("/getPhotos", (req: Request, res: Response) => {
    const photoResponse: any = {
        "error": {},
        "results": []
    };

    ls(req.body.userId)
    .then((photos) => {
        photoResponse.results = {
            "photos": photos
        }
        res.json(photoResponse);
    })
    .catch((e) => {
        photoResponse.error = {
            "message": e
        }
        res.json(photoResponse);
    });
});  

export default router;