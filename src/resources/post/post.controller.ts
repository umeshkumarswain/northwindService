import { Router,Request,Response,NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import validate from './post.validation'
import validationMiddleware from "../../middleware/validation.middleware";
import PostService from "./post.service";
import HTTPException from "../../utils/exceptions/http.exception";


class PostController implements Controller{
    public path =  '/post';
    public router =  Router();
    private postService = new PostService();

    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes():void{
        this.router.post(`${this.path}`,validationMiddleware(validate.create),)
    }

    private create = async (req:Request,res:Response,next:NextFunction):Promise<Response|void> => {
        try {
          const { title,body } = req.body;
          const post =  await this.postService.create(title,body);
          res.status(201).json({post});
        } catch (error) {
            next(new HTTPException(400,"Can not create a post."))
        }
    };

}

export default PostController;