export function id() {
	return Math.random().toString(36).substr(2, 25);
}

export function time(){
	let date = Date.now();
    let newDate = new Date(date).getTime();
    return newDate;
}

export const api = "http://localhost:3001";
export const config = { headers: {'Content-Type': 'application/json', 'Authorization': 'user'}};