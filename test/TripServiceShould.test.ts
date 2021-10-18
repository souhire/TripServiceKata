import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";

describe("TripServiceShould", () => {
    let tripService: TripService;
    let loggedUser: User;
    let userTrips: Trip[];

    beforeEach( () => {
        tripService = new TripService(() => loggedUser, (_: User) => userTrips);
    });

    it("Utilisateur non connecté doit jeter une exception", () => {
        loggedUser = null;

        expect(() => tripService.getTripsByUser(new User())).toThrow(UserNotLoggedInException);
    });

    it("Utilisateur connecté n'est pas un ami de Utilisateur doit retourner une liste vide", () => {
        loggedUser = new User();
        const user = new User();

        expect(tripService.getTripsByUser(user)).toEqual([]);
    });

    it("Doit retourner la liste des voyages de l'utilisateur si il est ami de l'utilisateur connecté", () => {
        loggedUser = new User();
        userTrips = [new Trip()];
        const dummyUser = new User();
        dummyUser.addFriend(loggedUser);

        const expectedTrips = [new Trip()];


        expect(tripService.getTripsByUser(dummyUser)).toEqual(expectedTrips);
    });
});
