interface createUserdto {
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

interface updateUserdto {
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

export {createUserdto, updateUserdto}