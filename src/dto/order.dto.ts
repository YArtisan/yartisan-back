interface orderDto {
    user_id?: String,
    artisant_id?: String,
    title?: String,
    description?: String,
    price?: Number,
    start_date_order?: Date,
    finish_date_order?: Date,
    status?: String,
    isFinish?: Boolean,
    createdAt?: Date
}

export { orderDto }