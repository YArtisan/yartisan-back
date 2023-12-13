interface createArtisantdto {
  userid: Number;
  compagny_name: string;
  phone_number: Number;
  profile_picture: string;
  job_description: string;
  average_price: Number;
  number_of_employees: Number;
  isVisible: Boolean;
  // created_at: Date;
  last_update: Date;
}

interface updateArtisantdto {
  userid: Number;
  compagny_name: string;
  phone_number: Number;
  profile_picture: string;
  job_description: string;
  // average_price: Number;
  number_of_employees: Number;
  isVisible: Boolean;
  // created_at: Date;
  last_update: Date;
}

export { createArtisantdto, updateArtisantdto };
