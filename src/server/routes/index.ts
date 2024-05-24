import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CidadesController } from './../controllers'

const router = Router();

router.get("/", (req, res) => {
  return res.send("Ola dev!");
});

router.post('/cidades', CidadesController.create);
export { router };

