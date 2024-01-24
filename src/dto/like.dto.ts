interface CreateLikeDto {
	userId : number
	postId : string
	password : string
	email : string
	address_id : Number
	profile_picture : string
	is_artisant : boolean
	created_at : Date
	last_update : Date
}

interface UpdateLikeDto {
	userId : number
	likeId : string
	postId : string
	userid : Number
	firstname : string
	lastname : string
	password : string
	email : string
	address_id : Number
	profile_picture : string
	is_artisant : boolean
	created_at : Date
	last_update : Date
}

export { CreateLikeDto, UpdateLikeDto };
