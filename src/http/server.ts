import fastify from 'fastify'

import { Login } from './routes/Login'
import { CreateCard } from './routes/CreateCard'
import { CreateTrade } from './routes/CreateTrade'
import { DeleteTrade } from './routes/DeleteTrade'
import { GetProfile } from './routes/GetProfile'
import { ListMyCards } from './routes/ListMyCards'
import { ListCards } from './routes/ListCards'
import { ListTrades } from './routes/ListTrades'
import { RegisterUser } from './routes/RegisterUser'
import { AddOnMyCards } from './routes/AddOnMyCards'
import AuthPlugin from '../lib/auth'

const app = fastify()

app.register(AuthPlugin)

app.register(Login)
app.register(GetProfile)
app.register(RegisterUser)

app.register(ListCards)
app.register(CreateCard)
app.register(ListMyCards)
app.register(AddOnMyCards)

app.register(ListTrades)
app.register(CreateTrade)
app.register(DeleteTrade)

app
  .listen({ 
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log('Server is running!'))