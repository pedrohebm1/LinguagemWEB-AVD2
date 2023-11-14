import fastify, { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'

import { z } from "zod";
import dayjs from "dayjs";

const app = fastify();

export async function salesOrderRoutes(app: FastifyInstance) {
    app.get('/salesorder', async () => {
        return await prisma.salesOrder.findMany();
    })

    app.get('/salesorder/:id', async request => {
        const pararmSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = pararmSchema.parse(request.params);

        return await prisma.salesOrder.findFirstOrThrow({
            where: { id }
        })
    })
    
    app.post('/salesorder', async request => {
        const bodySchema = z.object({
            product_name: z.string(),
            sales_order_data: z.coerce.date(),
            amount: z.number(),
            unitary_value: z.number(),
            clientId: z.string()
        })

        const { product_name, sales_order_data, amount, unitary_value, clientId } = bodySchema.parse(request.body);

        const salOrder = await prisma.salesOrder.create({
            data: {
                product_name,
                sales_order_data: dayjs(sales_order_data).toDate(),
                amount,
                unitary_value,
                clientId
            }
        })

        return salOrder
    })

    app.put('/salesorder/:id', async request => {
        const pararmSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = pararmSchema.parse(request.params)

        const bodySchema = z.object({
            product_name: z.string(),
            sales_order_data: z.coerce.date(),
            amount: z.number(),
            unitary_value: z.number(),
            clientId: z.string()
        })

        const { product_name, sales_order_data, amount, unitary_value, clientId } = bodySchema.parse(request.body);

        const salesOrder = prisma.salesOrder.update({
            where: {
                id
            },
            data: {
                product_name,
                sales_order_data: dayjs(sales_order_data).toDate(),
                amount,
                unitary_value,
                clientId
            }
        })

        return salesOrder
    })

    app.delete('/salesorder/:id', async request => {
        const pararmSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = pararmSchema.parse(request.params)

        return await prisma.salesOrder.delete({
            where: { id }
        })
    })
}