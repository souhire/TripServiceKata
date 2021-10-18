import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    public getTripsByUser(user: User): Trip[] {
        const loggedUser: User = UserSession.getLoggedUser();

        if (loggedUser != null) {
            if (user.isFriend(loggedUser)) {
                return TripDAO.findTripsByUser(user);
            }
            return [];
        } else {
            throw new UserNotLoggedInException();
        }
    }
}
