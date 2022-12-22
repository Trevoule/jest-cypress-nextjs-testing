// src/mocks/handlers.js
import { rest } from "msw";

import { localEnvBaseUrl } from "@/lib/axios/axiosInstance";
import { routes } from "@/lib/axios/routes";

import { readFakeData } from "../fakeData";
import { fakeUserReservations } from "../fakeData/userReservations";

export const handlers = [
  // handler intercepting request
  rest.get(
    `${localEnvBaseUrl}/api/${routes.shows}/:showId`,
    async (req, res, ctx) => {
      const { fakeShows } = await readFakeData();

      // run response method and creates json
      return res(ctx.json({ show: fakeShows[0] }));
    }
  ),

  rest.get(
    `${localEnvBaseUrl}/api/${routes.users}/:userId/reservations`,
    (req, res, ctx) =>
      // run response method and creates json
      res(ctx.json({ userReservations: fakeUserReservations }))
  ),
];
