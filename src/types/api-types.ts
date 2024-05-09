import { Bar, Line, Order, Pie, Product, Stats, User, cartItem, shippingInfo } from "./types";


export type CustomError={
    status:number;
    data:{
        message:string;
        success:boolean;
    };
};

export type MessageRespone =
{
    success:boolean;
    message:string;
};

export type AllUserResponse =
{
    success:boolean;
    users:User[];
};

export type UserRespone =
{
    success:boolean;
    user :User;
};

export type AllProductsResponse={
    success:boolean;
    products:Product[];
};

export type CategoriesResponse={
    success:boolean;
    categories:string[];
};

export type SearchProductsResponse={
    success:boolean;
    products:Product[];
    totalPage:number;
};

export type searchProductsRequest = {
    price:number;
    page:number;
    category:string;
    search:string;
    sort:string;

};

export type ProductResponse={
    success:boolean;
    product:Product;
}


export type NewProductRequest =
{
    id:string;
    formData:FormData;
};


export type UpdateProductRequest =
{
    userId:string;
    productId:string;
    formData:FormData;
};

export type DeleteProductRequest =
{
    userId:string;
    productId:string;
};

export type NewOrderRequest =
{    shippingInfo:shippingInfo;
    orderItems: cartItem[],
    subtotal:number;
    tax:number;
    shippingCharges:number;
    discount:number;
    total:number;
    user:string;
   
};

export type UpdateOrderequest =
{    
    userId:string;
    orderId:string;
   
};


export type DeleteUserRequest={
    userId:string,
    adminUserId:string
}

export type AllOrdersResponse={
    success:boolean;
    orders:Order[];
};


export type OrderDetailsResponse={
    success:boolean;
    order:Order;
};


export type StatsResponse={
    success:boolean;
    stats:Stats;
};

export type PieResponse={
    success:boolean;
    charts:Pie;
};



export type BarResponse={
    success:boolean;
    charts:Bar;
};


export type LineResponse={
    success:boolean;
    charts:Line;
};