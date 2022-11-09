#!/usr/bin/env node
// Entrypoint to API server
// Load dependencies
import { roll } from './lib/roll.js'
import express from 'express'
import minimist from 'minimist'
const app = express()
const args = minimist(process.argv.slice(2))

// Default to port 5000 if no arg given
const port = args.port || 5000
app.listen(port)
// Default values for dice roll
const sides = 6
const dice = 2
const rolls = 1

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Default endpoint for undefined endpoints
app.get('*', (req, res, next) => {
  res.status(404).send('NOT FOUND')
})

// Create endpoint at /app/ that returns 200 OK
app.get('/app/', (req, res, next) => {
	res.status(200).send('OK')
})

// Create endpoint for /app/roll/ that returns JSON for a default roll
app.get('/app/roll/', (req, res, next) => {
	// Check if args were provided as JSON or URLencoded
	const arg_sides = req.body.sides || sides
	const arg_dice = req.body.dice || dice
	const arg_rolls = req.body.rolls || rolls
	res.status(200).type('json').json(roll(arg_sides, arg_dice, arg_rolls))
})

// Dice roll endpoint for /app/roll/:sides/
app.get('/app/roll/:sides/', (req, res, next) => {
	// Roll dice with sides param
	res.status(200).type('json').json(roll(req.params.sides, dice, rolls))	
})

// Dice roll endpoint for /app/roll/:sides/:dice/
app.get('/app/roll/:sides/:dice/', (req, res, next) => {
  // Roll dice with sides and dice params
  res.status(200).type('json').json(roll(req.params.sides, req.params.dice, rolls))
})

// Dice roll endpoint for /app/roll/:sides/:dice/
app.get('/app/roll/:sides/:dice/', (req, res, next) => {
  // Roll dice with sides, dice, and rolls params
  res.status(200).type('json').json(roll(req.params.sides, req.params.dice, req.params.rolls))
})



