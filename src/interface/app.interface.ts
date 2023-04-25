import { Product } from "./product.interface";

export interface AppState {
    products:Array<Product>;
    cart:Array<Product>;
}