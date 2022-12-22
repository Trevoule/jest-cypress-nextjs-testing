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
      // provide showId from params for different conditions response
      const { showId } = req.params;

      const { fakeShows } = await readFakeData();

      // run response method and creates json
      // hard coded response
      //   return res(ctx.json({ show: fakeShows[0] }));

      // for different conditions based on prop
      // dynamic response
      return res(ctx.json({ show: fakeShows[Number(showId)] }));
    }
  ),

  rest.get(
    `${localEnvBaseUrl}/api/${routes.users}/:userId/reservations`,
    (req, res, ctx) => {
      const { userId } = req.params;

      //   let userReservations;

      //   if (userId) {
      //     userReservations = fakeUserReservations;
      //   } else {
      //     userReservations = null;
      //   }

      // alternative ternary
      // string so we need transform to Number
      const userReservations = Number(userId) > 0 ? fakeUserReservations : null;

      // run response method and creates json
      return res(ctx.json({ userReservations }));
    }
  ),
];
