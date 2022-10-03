import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { z } from "https://deno.land/x/zod@v3.19.1/mod.ts";

export const checkSchema = <P extends string>(
  schema: z.ZodObject<z.ZodRawShape>,
) =>
async (
  ctx: RouterContext<P>,
  next: () => Promise<unknown>,
) => {
  try {
    const body = await ctx.request.body().value;
    ctx.state.body = schema.parse(body);
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.body = `Bad Request\n\n${err.message}`;
    ctx.response.status = 400;
  }
};

