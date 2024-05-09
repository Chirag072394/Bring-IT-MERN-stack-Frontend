
export type User= {
  name:string;
  email:string;
  gender:string;
  photo:string;
  role:string;
  dob:string;
  _id:string;

}

export type Product ={
  name:string;
  price:number;
  stock:number;
  category:string;
  photo:string;
  _id:string;
}


export type shippingInfo ={
  address:string;
  city:string;
  state:string;
  country:string;
  pinCode:string

}

export type cartItem ={
  productId:string;
  photo:string;
  name:string;
  price:number;
  quantity:number;
  stock:number;
}


export type OrderItem =Omit<cartItem,"stock">& {_id:string}


export type Order={
  orderItems:OrderItem[];
  shippingInfo:shippingInfo;
  subtotal:number;
  tax:number;
  shippingCharges:number;
  discount:number;
  total:number;
  status:string;
  user:{
    name:string;
    _id:string
  };
  _id:string;

}

type CountAndChange={

    revenue: number;
    product: number;
    user: number;
    order: number;
}

type LatestTransaction={
  _id:string;
  amount:number;
  discount:number;
  quantity:number;
  status:string;

}
export type Stats ={

  categoryCount:Record<string,number>[],
  changePercent:CountAndChange,
  count:CountAndChange,
  chart: {
    order: number[],
    revenue: number[],
  },
  userRatio:{
    male:number;
    female:number;
  },
  latestTransaction: LatestTransaction[],
}
type RevenueDistribution =
  {
    netMargin:number;
    discount:number;
    productionCost:number;
    burnt:number;
    marketingCost:number;
  }

type OrderFullFillment ={
  processing:number;
  shipped:number;
  delivered:number;
};


type UserAgeGroup={
  teen:number;
  adult:number;
  old:number;
}

export type Pie ={

  orderFullFillment:OrderFullFillment,
  productCategories:Record<string,number>[],
  stockAvailability:{
    inStock:number;
    outOfStock:number;
  },
  revenueDistribution:RevenueDistribution,
  usersAgeGroup:UserAgeGroup,
  adminCustomer:{
    admin:number;
    customer:number;
  }
}

export type Bar ={
    products: number [];
    users: number[];
    orders:number[];
  }
  
export type Line ={
    users:number[];
    products:number[];
    discount:number[];
    revenue:number[];
}