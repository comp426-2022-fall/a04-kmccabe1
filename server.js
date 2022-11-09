#!/usr/bin/env node
// Entrypoint to API server
// Load dependencies
import { roll } from './lib/roll.js'
const express = require('expres')
const app = express()
const args = require('minimist')(process.argv.slice(2))

// Default to port 5000 if no arg given
const port = args.port || 5000
// Default values for dice roll
const sides = 6
const dice = 2
const rolls = 1

app.use(express.json())
app.use(expres.urlencoded({ extended: true }))

// Create endpoint at /app/ that returns 200 OK
app.get('/app/', (req, res, next) => {
	res.status(200)
})

// Create endpoint for /app/roll/ that returns JSON for a default roll
app.get('/app/roll/', (req, res, next) => {
	const arg_sides = req.body.sides || sides
	const arg_dice = req.body.dice || dice
	const arg_rolls = req.body.rolls || rolls
	res.status(200).json(roll(arg_sides, arg_dice, arg_rolls))
})

// Dice roll endpoint for /app/roll/:sides/
app.get('/app/roll/:sides/', (req, res, next) => {
	res.status(200).json(roll(req.params.sides, dice, rolls))	
})



app.listen(port, () => {
		console.log("Server listening on port " + port + ".")
})
