export const changeOverflow = (val: boolean) => {
	const html = document.querySelector('html') as HTMLElement

	val === false
		? (html.style.overflowY = 'hidden')
		: (html.style.overflowY = 'scroll')
}

export const decode = (token: string) => {
	const [header, payload, signature] = token.split('.')
	const decodedHeader = JSON.parse(atob(header))
	const decodedPayload = JSON.parse(atob(payload))

	return {
		header: decodedHeader,
		payload: decodedPayload,
		signature: signature,
	}
}

export const request = (filters: any) => {
	let st = '?'
	for (let key in filters) {
		if (filters[key] !== false) {
			if (key === 'other' && filters[key].length > 0) {
				for (let i = 0; i < filters[key].length; i++) {
					st += `${filters[key][i]}=true&`
				}
			} else if (key === 'float' && filters[key].length > 0) {
				st += `float=0-${filters[key]}&`
			} else if ((key === 'price' && filters[key].min) || filters[key].max) {
				st += `price=${filters[key].min}-${
					filters[key].min && !filters[key].max
						? '9999999999'
						: filters[key].max
				}&`
			} else {
				for (let i = 0; i < filters[key].length; i++) {
					st += `${key}` + `=${filters[key][i]}&`
				}
			}
		}
	}
	return st.substr(0, st.length - 1)
}
