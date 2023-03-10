import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";

// createHandler creates for handling endpoint
const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.APP_ENV !== "test") {
    return res
      .status(401)
      .json({ message: "endpoint only available for test use" });
  }

  // when request passed test
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    res.status(401).json({ message: "invalid revalidation secret" });
  }

  // revalidate pages that can have ISR data updates
  // note: this will change to `res.revalidate` when
  // revalidate on-demand is out of beta
  await res.revalidate("/shows");
  await res.revalidate("/bands");

  return res.status(200).end();
});

export default handler;
