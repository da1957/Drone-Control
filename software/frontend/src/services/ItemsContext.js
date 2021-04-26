import { createContext, useContext } from "react";

const ItemsContext = createContext();

export function useItemsContext() {
    return useContext(ItemsContext);
}

export default ItemsContext;