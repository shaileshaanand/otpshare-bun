import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import Database from "bun:sqlite";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Elysia, t } from "elysia";
import * as jose from "jose";
import * as elements from "typed-html";

import BaseHtml from "./components/BaseHtml";
import Otp from "./components/otp";
import { otps } from "./db/schema";
import { getLast10minuteOtps } from "./services/otp";
import { CFCookie } from "./types";

const app = new Elysia()
  .use(html())
  .use(
    staticPlugin({
      assets: "public",
      prefix: "/assets",
    })
  )
  .decorate("db", drizzle(new Database(process.env.DB_PATH)))
  .get("/", async () => {
    return (
      <BaseHtml>
        <div class="p-12">
          <div hx-get="/otp" hx-trigger="load, every 2s"></div>
        </div>
      </BaseHtml>
    );
  })
  .get("/otp", async ({ db }) => {
    const otpList = await getLast10minuteOtps(db);
    return (
      <div class="flex gap-4 flex-wrap">
        {otpList.length !== 0 ? (
          otpList.map((otp) => {
            return <Otp {...otp} />;
          })
        ) : (
          <p>No OTPs</p>
        )}
      </div>
    );
  })
  .post(
    "/otp/:id/claim",
    async ({ cookie, db, params: { id } }) => {
      try {
        const token = cookie.CF_Authorization.value;
        const { kid } = jose.decodeProtectedHeader(token);
        if (cookie.CF_Authorization) {
          const keyData = (await (
            await fetch(
              "https://shaileshlive.cloudflareaccess.com/cdn-cgi/access/certs"
            )
          ).json()) as CFCookie;
          const usedKey = keyData.public_certs.find((c) => c.kid === kid);
          if (usedKey) {
            const res = await jose.jwtVerify(
              token,
              await jose.importX509(usedKey.cert, "RS256")
            );
            const otp = (
              await db
                .update(otps)
                .set({ claimedBy: res.payload.email as string })
                .where(eq(otps.id, id))
                .returning()
            )[0];
            // eslint-disable-next-line no-console
            console.log(
              `OTP ${otp.otp} has been claimed by ${res.payload.email}.`
            );

            return { status: "success" };
          } else {
            throw Error("Invalid Cookie");
          }
        } else {
          throw Error("Cookie Not Found");
        }
      } catch (e) {
        return { status: "error" };
      }
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      transform({ params }) {
        const id = +params.id;
        if (!Number.isNaN(id)) params.id = id;
      },
    }
  )
  .post(
    "/otp",
    async ({ body, db, headers }) => {
      if (headers["x-api-key"] === process.env.API_SECRET) {
        const createdOtp = await db.insert(otps).values(body).returning();
        // eslint-disable-next-line no-console
        console.log(`OTP ${body.otp} has been created.`);
        return createdOtp;
      }
      return { status: "error" };
    },
    {
      body: t.Object({
        otp: t.Number(),
      }),
    }
  )
  .listen(3000);

// eslint-disable-next-line no-console
console.log(`App started on ${app.server?.port}`);
