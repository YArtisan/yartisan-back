interface artisantDto {
  artisant_id?: string;
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  company_name?: string;
  phone_number?: string;
  profile_picture?: string;
  job_description?: string;
  average_price?: Number;
  number_of_employees?: Number;
  isVisible?: Boolean;
  opening_hours?: openingHoursDto[];
  adress_id?: string;
}

interface openingHoursDto {
  day_of_week: string;
  opening_time: string;
  closing_time: string;
}

interface addressDto {
  address_number: Number;
  city: string;
  street_name: string;
  postal_code: string;
  country: string;
  lat: string;
  lon: string;
}

export { artisantDto , addressDto};
