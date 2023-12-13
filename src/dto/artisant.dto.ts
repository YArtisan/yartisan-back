interface ArtisanDto {
  userid: number;
  compagny_name: string;
  phone_number: number;
  profile_picture: string;
  job_description: string;
  average_price?: number; // Ajoutez le point d'interrogation pour rendre la propriété facultative
  number_of_employees: number;
  isVisible: boolean;
  // created_at: Date;
  last_update: Date;
}

export { ArtisanDto };

// interface createArtisantdto {
//   userid: Number;
//   compagny_name: string;
//   phone_number: Number;
//   profile_picture: string;
//   job_description: string;
//   average_price: Number;
//   number_of_employees: Number;
//   isVisible: Boolean;
//   // created_at: Date;
//   last_update: Date;
// }

// interface updateArtisantdto {
//   userid: Number;
//   compagny_name: string;
//   phone_number: Number;
//   profile_picture: string;
//   job_description: string;
//   // average_price: Number;
//   number_of_employees: Number;
//   isVisible: Boolean;
//   // created_at: Date;
//   last_update: Date;
// }

// export { createArtisantdto, updateArtisantdto };
