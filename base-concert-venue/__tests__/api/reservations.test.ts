import { testApiHandler } from "next-test-api-route-handler";

import { validateToken } from "@/lib/auth/utils";
import reservationHandler from "@/pages/api/reservations/[reservationId]";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";

// running mock test for authentication *__mocks__
jest.mock("@/lib/auth/utils");

// because validateToken is hoisted we need to assign it as mock
const mockValidateToken = validateToken as jest.Mock;

test("POST /api/reservations/reservationId creates a reservation", async () => {
  await testApiHandler({
    handler: reservationHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.reservationId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          // Must use correct content type
          "content-type": "application/json",
        },
        body: JSON.stringify({
          seatCount: 5,
          userId: 1,
          showId: 0,
        }),
      });

      expect(res.status).toEqual(201);

      const json = await res.json();
    },
  });

  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.userReservations).toHaveLength(3);
    },
  });
});

test("GET api/user/[userId]/reservations returns only current reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toEqual(200);

      const json = await res.json();
      // if we perform separate test db will be reset before test
      expect(json.userReservations).toHaveLength(2);
    },
  });
});

test("POST /api/reservations/[reservationId] returns 401 when validation failed", async () => {
  // getting error as validate token not from mocks and don't have specified method
  //   validateToken.mockResolvedValue(false);

  // so we need to sign validateToken as Jest.Mock
  mockValidateToken.mockResolvedValue(false);

  await testApiHandler({
    handler: reservationHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.reservationId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          // Must use correct content type
          "content-type": "application/json",
        },
        body: JSON.stringify({
          seatCount: 5,
          userId: 1,
          showId: 0,
        }),
      });

      expect(res.status).toEqual(401);
    },
  });
});
