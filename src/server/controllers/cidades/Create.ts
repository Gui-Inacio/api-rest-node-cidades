import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';


interface ICidade {
  nome: string;
  estado: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false }); //abortEarly serve para mapear varios erros ao mesmo tempo
    return next();
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const validationErrors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      error.message
      if (error.path === undefined) return;

      validationErrors[error.path] = error.message;
    });


    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErrors,
    });
  }

}


export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body);

  return res.send('Create!');
}