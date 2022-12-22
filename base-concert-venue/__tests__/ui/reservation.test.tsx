import { render, screen } from "@testing-library/react";

import { Reservation } from "@/components/reservations/Reservation";

test("reservation shows correctly seats available", async () => {
  // * show id prop can be anything, as in msw handler we already have specified response
  // *** in case response is hard coded

  // submit purchase required prop but we can just provide jest.fn for ts
  render(<Reservation showId={0} submitPurchase={jest.fn()} />);

  // findBy used instead of getBy as we are waiting for response for data

  // const seatCountText = await screen.findByText(/10 seats left/i);
  // expect(seatCountText).toBeInTheDocument();
  //   alternative
  const seatCountText = await screen.findByText("Seats left", { exact: false });
  expect(seatCountText).toHaveTextContent("10");
});

test("reservations shows text show is sold out and no button", async () => {
  //   show id prop can be anything, as in msw handler we already have specified response
  // submit purchase required prop but we can just provide jest.fn for ts
  render(<Reservation showId={1} submitPurchase={jest.fn()} />);

  // findBy used instead of getBy as we are waiting for response for data

  const soldOutMessage = await screen.findByText(/show is sold out/i);
  expect(soldOutMessage).toBeInTheDocument();

  // we use queryBy instead of getBy in case element is not expected
  const purchaseButton = screen.queryByRole("button", { name: /purchase/i });
  expect(purchaseButton).not.toBeInTheDocument();
});
