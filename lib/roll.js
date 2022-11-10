// Dice rolling function
export function roll(sides, num, rolls) {
	// Simulate rolling num dice and store result in results
	let roll_results = []
	for (let i=0; i < rolls; i++) {
		let total = 0
		for (let j=0; j < num; j++) {
			total += 1 + Math.floor(Math.random() * sides)
		}
		roll_results[i] = total
	}
	// Object to return. Contains args given and results of rolls
	const ret = {
		sides: parseInt(sides),
		dice: parseInt(num),
		rolls: parseInt(rolls),
		results: roll_results
	}
	return ret
}
