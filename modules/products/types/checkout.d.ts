export type CheckoutSession = {
    line_items: {
      price_data: {
        currency: string;
        product_data: {
          name: string;
          images: string[];
        };
        unit_amount: number;
      };
      quantity: number;
    }[];
    mode: "payment";
    success_url: string;
    cancel_url: string;
  };
  