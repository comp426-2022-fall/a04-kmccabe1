#!/usr/bin/env node
// Entrypoint to API server
// Load dependencies
import { roll } from './lib/roll.js'
import express from 'express'
import minimist from 'minimist'
const app = express()
const args = minimist(process.argv.slice(2))

// Default to port 5000 if no arg given
let port = 5000
if (args.port) { port = args.port }
// Default values for dice roll
const sides = 6
const dice = 2
const rolls = 1

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Create endpoint at /app/ that returns 200 OK
app.get('/app/', (req, res, next) => {
  res.type('html')
  res.status(200).send('200 OK')
})

// Create endpoint for /app/roll/ that returns JSON for a default roll
app.get('/app/roll/', (req, res, next) => {
	// Check if args were provided as JSON or URLencoded
	let arg_sides = sides
  if (req.body.sides) {
	  arg_sides = parseInt(req.body.sides)
  }
	let arg_dice = dice
  if (req.body.dice) { 
	  arg_dice = parseInt(req.body.dice)
  }
	let arg_rolls = rolls
  if (req.body.rolls) { 
	  arg_rolls = parseInt(req.body.rolls)
  }
	res.status(200).type('json').json(roll(arg_sides, arg_dice, arg_rolls))
})

// Dice roll endpoint for /app/roll/:sides/
app.get('/app/roll/:sides/', (req, res, next) => {
	// Roll dice with sides param
	res.status(200).type('json').json(roll(parseInt(req.params.sides), dice, rolls))	
})

// Dice roll endpoint for /app/roll/:sides/:dice/
app.get('/app/roll/:sides/:dice/', (req, res, next) => {
	// Roll dice with sides and dice params
	res.status(200).type('json').json(roll(parseInt(req.params.sides), parseInt(req.params.dice), rolls))
})

// Dice roll endpoint for /app/roll/:sides/:dice/:rolls/
app.get('/app/roll/:sides/:dice/:rolls/', (req, res, next) => {
	// Roll dice with sides, dice, and rolls params
	res.status(200).type('json').json(roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls)))
})

// Default endpoint for undefined endpoints
app.get('*', (req, res, next) => {
	res.type('html')
	res.status(404).send('404 NOT FOUND')
})

app.listen(port)

