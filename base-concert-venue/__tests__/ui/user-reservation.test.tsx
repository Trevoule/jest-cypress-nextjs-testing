import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

test("displays reservations  and 'purchase more' button when reservations exist", async () => {
  render(<UserReservations userId={1} />);

  // await findByRole because button is showed based on response
  const purchaseMoreButton = await screen.findByRole("button", {
    name: /purchase more tickets/i,
  });
  expect(purchaseMoreButton).toBeInTheDocument();
});

test("displays no reservations  and 'purchase tickets' button when reservations not exist", async () => {
  render(<UserReservations userId={0} />);

  // await findByRole because button is showed based on response
  const purchaseMoreButton = await screen.findByRole("button", {
    name: /purchase tickets/i,
  });
  expect(purchaseMoreButton).toBeInTheDocument();
});
