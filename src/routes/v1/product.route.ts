import express from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "../../controllers/product.controller";
import { requireUser } from "../../middlewares/requireUser";
import { checkResource } from "../../middlewares/checkResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../../schemas/product.schema";
const productRouter = express.Router();

productRouter.post(
  "/products",
  [requireUser, checkResource(createProductSchema)],
  createProductHandler
);

productRouter.put(
  "/products/:productId",
  [requireUser, checkResource(updateProductSchema)],
  updateProductHandler
);

productRouter.get(
  "/products/:productId",
  checkResource(getProductSchema),
  getProductHandler
);

productRouter.delete(
  "/products/:productId",
  [requireUser, checkResource(deleteProductSchema)],
  deleteProductHandler
);

export default productRouter;
