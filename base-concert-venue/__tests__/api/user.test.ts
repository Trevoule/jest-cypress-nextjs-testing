import { testApiHandler } from "next-test-api-route-handler";
import userAuthHandler from "@/pages/api/users/index";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";
import { validateToken } from "@/lib/auth/utils";

// running mock test for authentication *__mocks__
jest.mock("@/lib/auth/utils");

const mockValidateToken = validateToken as jest.Mock;

test("POST /api/users receives token with correct credentials", async () => {
  await testApiHandler({
    handler: userAuthHandler,
    test: async ({ fetch }) => {
      // sending POST request with body
      const res = await fetch({
        method: "POST",
        headers: {
          // Must use correct content type
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.test",
          password: "test",
        }),
      });

      // check res status
      expect(res.status).toBe(200);

      const json = await res.json();

      // as token is constantly changing, we will check userId and email
      expect(json).toHaveProperty("user");
      expect(json.user.id).toEqual(1);
      expect(json.user.email).toEqual("test@test.test");
      expect(json.user).toHaveProperty("token");
    },
  });
});

test("GET api/user/[userId]/reservations returns correct number of reservations", async () => {
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
      expect(json.userReservations).toHaveLength(2);
    },
  });
});

test("GET api/user/12345/reservations returns no reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.userReservations).toHaveLength(0);
    },
  });
});

test("GET api/user/[userId]/reservations returns 401 when validation failed", async () => {
  // getting error as validate token not from mocks and don't have specified method
  //   validateToken.mockResolvedValue(false);

  // so we need to sign validateToken as Jest.Mock
  mockValidateToken.mockResolvedValue(false);

  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      // eslint-disable-next-line no-param-reassign
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(401);
    },
  });
});
