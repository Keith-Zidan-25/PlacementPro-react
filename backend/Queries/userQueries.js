import users_Mongoose from '../models/users_Mongoose.js';
import badges from '../models/badges.js';

class UserQueries {
    constructor() {}
    
    async getUserData(username) {
        return await users_Mongoose.findOne({ username }, 'userkey username password email');
    }
    
    async getUserKey(username) {
        const user = await users_Mongoose.findOne({ username }, 'userkey');
        return user?.userkey || null;
    }
    
    async getAllBadges() {
        return await badges.find({}, 'badgeKey badgeTitle requiredQuizzes requiredScore imageUrl');
    }
    
    async getUserBadges(userkey) {
        const user = await users_Mongoose.findOne({ userkey }, 'userBadges');
        if (!user || !user.userBadges || user.userBadges.length === 0) {
            return [];
        }
        
        const badgeKeys = user.userBadges.map(b => b.badgeKey);
        
        const badges = await badges.find({ badge_key: { $in: badgeKeys } });
        
        return user.userBadges.map(badge => ({
            badgeKey: badge.badgeKey,
            awarded_at: badge.awardedAt
        }));
    }
    
    async insertNewUserData(username, password, email) {
        const lastUser = await users_Mongoose.findOne().sort({ userkey: -1 }).limit(1);
        const userkey = lastUser ? lastUser.userkey + 1 : 1;
        
        const newUser = new users_Mongoose({ 
            userkey,
            username, 
            password, 
            email,
            personalDetails: [],
            userBadges: []
        });
        await newUser.save()
        return { success: true };
    }
    
    async awardUserBadge(userkey, badgeKey) {
        return await users_Mongoose.updateOne(
            { userkey },
            { $push: { userBadges: { badgeKey, awardedAt: new Date().toISOString() } } }
        );
    }
    
    async checkUserBadge(userkey, badgeKey) {
        const user = await users_Mongoose.findOne({ userkey });
        return user?.userBadges?.some(b => b.badgeKey === badgeKey) || false;
    }
    
    async checkIfEmailExists(email) {
        const user = await users_Mongoose.findOne({ email });
        return !!user;
    }
    
    async upsertPersonalDetails(userkey, newDetails) {
        const user = await users_Mongoose.findOne({ userkey });
    
        if (!user) {
            return { success: false, msg: "user not found"};
        }
    
        if (user.personalDetails.length > 0) {
            user.personalDetails[0] = newDetails;
        } else {
            user.personalDetails.push(newDetails);
        }
    
        await user.save();
        return { success: true };
    }
}

const userQueries = new UserQueries();
export default userQueries;