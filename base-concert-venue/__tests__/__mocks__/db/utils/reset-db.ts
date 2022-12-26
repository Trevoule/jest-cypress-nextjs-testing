/* eslint-disable import/no-unresolved */
// file that will read data from json files from fakeData
// and will write it to db json files
import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { filenames, writeJSONToFile } from "@/lib/db/db-utils";

// method that  will reset data fro db
// async method as we need to read file
export const resetDB = async () => {
  // failsafe against resetting production db!
  const safeToReset = process.env.NODE_ENV === "test" || process.env.CYPRESS;

  if (!safeToReset) {
    console.log(
      "WARNING: database reset unavailable outside test environment!"
    );
    return;
  }

  //  read files
  const { fakeShows, fakeBands, fakeUsers, fakeReservations } =
    await readFakeData();

  // overwrite data in files
  // filenames would be known from function 'getDbPath'
  // file created according to enum 'filenames' types
  await Promise.all([
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.users, fakeUsers),
    writeJSONToFile(filenames.reservations, fakeReservations),
  ]);
};
