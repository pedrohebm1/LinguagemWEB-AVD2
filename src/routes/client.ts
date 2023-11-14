import fastify, { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { calculateTotal } from "../util/calculateTotal";

import { z } from "zod";

const app = fastify();

export async function clientRoutes(app: FastifyInstance) {
    app.get('/clients', async () => {
        return await prisma.client.findMany()   
    })
    
    app.get('/clients/:id', async request => {
        const pararmSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = pararmSchema.parse(request.params);

        return await prisma.client.findFirstOrThrow({
            where: { id }
        })
    })
    
    //3
    app.get('/clients/salesorder', async () => {
        return await prisma.client.findMany({
            include: {
                sales: true
            }
        })
    })
    //4
    app.get('/clients/salesorderunit/:id', async request => {
        const pararmSchema = z.object({
            id: z.string()
        })
        
        const { id } = pararmSchema.parse(request.params)

        return await prisma.client.findFirstOrThrow({
            where: {
                id
            },
            select: {
                id: true,
                name_cliente: true,
                cpf: true,
                sales: {
                    select: {
                        product_name: true,
                        sales_order_data: true,
                        amount: true,
                        unitary_value: true
                    }
                }
            }
        })
    })

    //5
    app.get('/clients/salesordertotal/:id', async request => {
        const pararmSchema = z.object({
            id: z.string()
        })

        const { id } = pararmSchema.parse(request.params)

        const client = await prisma.client.findMany({
            where: {
                id
            },
            include: {
                sales: true
            }
        })

        return client.map(client => {
            return {
                id: client.id,
                name_client: client.name_cliente,
                telephone: client.telephone,
                include: client.sales.map(sales => {
                    return {
                        product_name: sales.product_name,
                        quantity: sales.amount,
                        unitary_value: sales.unitary_value,
                        order_total: calculateTotal(sales.unitary_value, sales.amount)
                    }
                })
            }
        })
    })

    //6
    app.get("/clients/customer_sales_order/:cpf", async request => {
        const pararmSchema = z.object({
            cpf: z.string()
        })

        const { cpf } = pararmSchema.parse(request.params)

        return await prisma.client.findMany({
            where: { cpf },
            include: {
                sales: true
            }
        })
    })


    app.post('/clients', async request => {
        const bodySchema = z.object({
            name_cliente: z.string(),
            email: z.string(),
            cpf: z.string(),
            telephone: z.string()
        })

        const { name_cliente, email, cpf, telephone } = bodySchema.parse(request.body);

        const client = await prisma.client.create({
            data: { 
                name_cliente,
                email,
                cpf,
                telephone
            }
        })

        return client
    })

    app.put('/clients/:id', async request => {
        const pararmSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = pararmSchema.parse(request.params)

        const bodySchema = z.object({
            name_cliente: z.string(),
            email: z.string(),
            cpf: z.string(),
            telephone: z.string()
        })

        const { name_cliente, email, cpf, telephone } = bodySchema.parse(request.body);

        const client = prisma.client.update({
            where: {
                id
            },
            data: {
                name_cliente,
                email,
                cpf,
                telephone
            }
        })
    })

    app.delete('/clients/:id', async request => {
        const pararmSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = pararmSchema.parse(request.params)

        return await prisma.client.delete({
            where: { id }
        })
    })
}