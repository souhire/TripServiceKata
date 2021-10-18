import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export function getLoggedUser(): User {
    return UserSession.getLoggedUser();
}

export function getUserTrips(user: User): Trip[] {
    return TripDAO.findTripsByUser(user);
}
export default class TripService {

    private loggedUser: () => User;
    private getTripsOfUser: (user: User) => Trip[];

    constructor(getCurrentUser: (() => User) = getLoggedUser,
                getTrips: (user: User) => Trip[] = getUserTrips) {
        this.loggedUser = getCurrentUser;
        this.getTripsOfUser = getTrips;
    }

    public getTripsByUser(user: User): Trip[] {
        if (this.loggedUser() != null) {
            return user.hasAsFriend(this.loggedUser()) ? this.getTripsOfUser(user) : [];
        } else {
            throw new UserNotLoggedInException();
        }
    }
}
