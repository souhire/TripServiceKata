import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripDAO from "../src/trip/TripDAO";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserSession from "../src/user/UserSession";

describe("TripServiceShould", () => {
    const tripService = new TripService();
    // const dummyUser = new User();

    it("Utilisateur non connecté doit jeter une exception", () => {
        jest.spyOn(UserSession, 'getLoggedUser').mockReturnValue(null);

        expect(() => tripService.getTripsByUser(new User())).toThrow(UserNotLoggedInException);
    });

    it("Utilisateur connecté sans amis doit retourner une liste vide", () => {
        const dummyUser = new User();
        jest.spyOn(UserSession, 'getLoggedUser').mockReturnValue(dummyUser);

        expect(tripService.getTripsByUser(dummyUser)).toEqual([]);
    });

    it("Doit retourner la liste des voyages de l'utilisateur si il est ami de l'utilisateur connecté", () => {
        const dummyLoggedUser = new User();
        const dummyUser = new User();
        dummyUser.addFriend(dummyLoggedUser);

        const expectedTrips = [new Trip()];

        jest.spyOn(UserSession, 'getLoggedUser').mockReturnValue(dummyLoggedUser);
        jest.spyOn(TripDAO, 'findTripsByUser').mockReturnValue([new Trip()]);

        expect(tripService.getTripsByUser(dummyUser)).toEqual(expectedTrips);
    })
});
