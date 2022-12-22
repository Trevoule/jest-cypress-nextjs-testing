import { render, screen } from "@testing-library/react";

import { Reservation } from "@/components/reservations/Reservation";

test("reservation shows correctly seats available", async () => {
  //   show id prop can be anything, as in msw handler we already have specified response
  // submit purchase required prop but we can just provide jest.fn for ts
  render(<Reservation showId={0} submitPurchase={jest.fn()} />);

  // findBy used instead of getBy as we are waiting for response for data

  // const seatCountText = await screen.findByText(/10 seats left/i);
  // expect(seatCountText).toBeInTheDocument();
  //   alternative
  const seatCountText = await screen.findByText("Seats left", { exact: false });
  expect(seatCountText).toHaveTextContent("10");
});
