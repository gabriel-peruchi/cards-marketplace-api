import fastify from 'fastify'
import cors from '@fastify/cors'

import { Login } from './routes/Login'
import { CreateTrade } from './routes/CreateTrade'
import { DeleteTrade } from './routes/DeleteTrade'
import { GetProfile } from './routes/GetProfile'
import { ListMyCards } from './routes/ListMyCards'
import { ListCards } from './routes/ListCards'
import { ListTrades } from './routes/ListTrades'
import { RegisterUser } from './routes/RegisterUser'
import { AddOnMyCards } from './routes/AddOnMyCards'
import AuthPlugin from '../lib/auth'
import { GetCard } from './routes/GetCard'

const app = fastify()

app.register(cors, { origin: '*' })
app.register(AuthPlugin)

app.register(Login)
app.register(GetProfile)
app.register(RegisterUser)

app.register(ListCards)
app.register(ListMyCards)
app.register(AddOnMyCards)
app.register(GetCard)

app.register(ListTrades)
app.register(CreateTrade)
app.register(DeleteTrade)

app
  .listen({ 
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log('Server is running!'))