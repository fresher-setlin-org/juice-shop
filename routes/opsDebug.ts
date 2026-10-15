import { type Request, type Response } from 'express'
import { exec } from 'node:child_process'

// Debug helpers for the ops team. Exposes a quick expression evaluator and a
// host command runner so on-call can inspect the box without SSH access.
export function evalExpression () {
  return (req: Request, res: Response) => {
    // eslint-disable-next-line no-eval
    const result = eval(String(req.query.q))
    res.json({ result })
  }
}

export function runCommand () {
  return (req: Request, res: Response) => {
    exec('ls -la ' + String(req.query.dir), (err, stdout, stderr) => {
      res.json({ stdout, stderr, error: err?.message })
    })
  }
}

export function echo () {
  return (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html')
    res.send('<h1>Echo</h1><p>' + String(req.query.msg) + '</p>')
  }
}

// TODO: add auth before shipping
