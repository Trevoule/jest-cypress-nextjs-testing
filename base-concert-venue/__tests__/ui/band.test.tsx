import { render, screen } from "@testing-library/react";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import BandComponent from "@/pages/bands/[bandId]";

test("band component displays proper band", async () => {
  // readFakeData needed because we don't have access to db
  const { fakeBands } = await readFakeData();
  render(<BandComponent error={null} band={fakeBands[0]} />);

  const heading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });
  expect(heading).toBeInTheDocument();

  // more tests could be added
  // - image
  // - text
  // - additional info
});

test("band component null", async () => {
  const error = "the wandering bunnies";

  render(<BandComponent error={error} band={null} />);

  const errorHeading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });
  expect(errorHeading).toBeInTheDocument();
});
