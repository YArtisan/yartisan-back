interface artisantDto {
  artisant_id?: string
  email?: string
  password?: string
  firstname?: string
  lastname?: string
  compagny_name?: string
  phone_number?: Number
  profile_picture?: string
  job_description?: string
  average_price?: Number
  number_of_employees?: Number
  isVisible?: Boolean
  opening_hours?: openingHoursDto[]
}

interface openingHoursDto {
  day_of_week: string
  opening_time: string
  closing_time: string
}

export { artisantDto }
