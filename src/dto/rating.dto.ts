interface RatingDto {
  user_id: String
  artisant_id: String
  score: Number
  avis: String
}

interface GetAllRatingUserDto {
  user_id: String
}

interface GetAllArtisantRatingDto {
  artisant_id: String
}

export {RatingDto, GetAllRatingUserDto, GetAllArtisantRatingDto};