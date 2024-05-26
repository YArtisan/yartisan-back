interface orderDto {
  user_id?: string;
  artisan_id?: string;
  title?: string;
  description?: string;
  price?: Number;
  url?: string;
  stripeId?: string;
  status?: string; // done, shipping, paid, waiting, cancelled, refunded
  //   createdAt?: Date;
  //   lastUpdated?: Date;
}

export { orderDto };
