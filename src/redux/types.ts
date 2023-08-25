export type TSkin = {
	color: Array<string> | string
	exterior: string
	float: number
	imageUrl: string
	itemName: string
	onTrade: boolean
	price: number
	rarity: string
	skinName: string
	souvenir: boolean
	statTrak: boolean
	type: string
	user: string
	__v: number
	_id: string
}

export type TUser = {
	createdAt: string
	email: string
	fullName: string
	money: number
	updatedAt: string
	__v: number
	_id: string
}

export type TPost = {
	createdAt: string
	imageUrl: string
	tags: Array<string>
	text: string
	title: string
	updatedAt: string
	user: TUser
	viewsCount: number
	__v: number
	_id: string
}

export type TFilters = {
	itemName?: string
	skinName?: string
	exterior?: Array<string>
	rarity?: Array<string>
	type?: Array<string>
	statTrak?: boolean | ''
	souvenir?: boolean | ''
	price?: {
		min: string
		max: string
	}
	float?: string
	color?: Array<string>
}

export type TfetchAuthparams = {
	email: string
	password: string
}

export type TfetchRegisterparams = {
	fullName: string
	email: string
	password: string
}
