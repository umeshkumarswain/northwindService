import { Request, Response, NextFunction, RequestHandler } from 'express';
import joi from 'joi';

function validationMiddleware(Schema: joi.Schema): RequestHandler {
    return async(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<void> => {
        const validationOptions  = {
            abortEarly:false,
            allowUnknown:true,
            stripeUnknown:true,
        };

        try {
            const value = await Schema.validateAsync(req.body,validationOptions);
            req.body = value;
            next();
        } catch (e:any) {
            const errors :string[] =[];
            e.details.array.forEach((element:joi.ValidationErrorItem) => {
                errors.push(element.message);
            });

            res.status(400).send({error:errors});
        }
    }
}

export default validationMiddleware;
