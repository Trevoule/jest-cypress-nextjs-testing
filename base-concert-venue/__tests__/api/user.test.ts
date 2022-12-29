import { testApiHandler } from "next-test-api-route-handler";
import userAuthHandler from "@/pages/api/users/index";

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
