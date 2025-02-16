import express from "express"
import { addtoCart ,removefromCart,getCart} from "../controllers/CartControllers.js"
import authMiddleware from "../middlewares/auth.js";

const CartRouter=express.Router();
CartRouter.post("/add",authMiddleware, addtoCart)
CartRouter.post("/remove",authMiddleware, removefromCart)
CartRouter.post("/get",authMiddleware, getCart)

export default CartRouter;