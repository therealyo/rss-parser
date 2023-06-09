import { z } from "zod"

/**
 * @openapi
 * components:
 *   schemas:
 *     SearchResults:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Post'
 *         total:
 *           type: number
 *         pageSize:
 *           type: number
 *       required:
 *         - results
 *         - total
 *         - pageSize
 * 
 */

export const searchPostQuery = z.object({
    search: z.string().optional(),
    creator: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    pubDate: z.array(z.string()).optional(),
    sort: z.enum(['alph.asc', 'alph.desc', 'date.asc', 'date.desc']).default("alph.asc"),
    page: z.string().default("1"),
    pageSize: z.string().default("10")
}).strict()

export const searchPostRequest = z.object({
    query: searchPostQuery
});

export type SearchPostRequest = z.infer<typeof searchPostRequest>;
export type SearchPostQuery = z.infer<typeof searchPostQuery>