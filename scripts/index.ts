import { tap } from 'node:test/reporters';
import { showFailedMessage, showSuccessMessage } from './utils'

const urll = process.env.NEXT_PUBLIC_API_URL;

export const getUserId = async () => {
    try {
        // Get the URL
        let url = window.location.href;


        // Decode the URL twice
        let decodedUrl = decodeURIComponent(decodeURIComponent(url));

        // Parse URL to get query parameters
        let queryString = decodedUrl.split('#tgWebAppData=user=')[1];

        if (Object.hasOwn(localStorage, "url")) {
            url = localStorage.getItem('url') || '/';
            decodedUrl = decodeURIComponent(decodeURIComponent(url));
            queryString = decodedUrl.split('#tgWebAppData=user=')[1];
        } else {
            if (queryString !== undefined) {
                localStorage.setItem('url', url);
            } else {
                url = localStorage.getItem('url') || '/';
                decodedUrl = decodeURIComponent(decodeURIComponent(url));
                queryString = decodedUrl.split('#tgWebAppData=user=')[1];
            }
        }


        const querytring = queryString.split('&')[0];
        // Parse user data JSON
        const userData = JSON.parse(querytring);

        // Extract user information
        const userId = userData.id;
        const firstName = userData.first_name;
        const lastName = userData.last_name;
        const username = userData.username;


        return userId;
    } catch {
        // showFailedMessage("Your userid and info could not be retreived");
    }

}
export const getUsername = async () => {
    try {
        // Get the URL
        let url = window.location.href;


        // Decode the URL twice
        let decodedUrl = decodeURIComponent(decodeURIComponent(url));

        // Parse URL to get query parameters
        let queryString = decodedUrl.split('#tgWebAppData=user=')[1];
        if (Object.hasOwn(localStorage, "url")) {
            url = localStorage.getItem('url') || '/';
            decodedUrl = decodeURIComponent(decodeURIComponent(url));
            queryString = decodedUrl.split('#tgWebAppData=user=')[1];
        } else {
            if (queryString !== undefined) {
                localStorage.setItem('url', url);
            } else {
                url = localStorage.getItem('url') || '/';
                decodedUrl = decodeURIComponent(decodeURIComponent(url));
                queryString = decodedUrl.split('#tgWebAppData=user=')[1];
            }
        }

        const querytring = queryString.split('&')[0];
        // Parse user data JSON
        const userData = JSON.parse(querytring);

        // Extract user information
        const userId = userData.id;
        const firstName = userData.first_name;
        const lastName = userData.last_name;
        const username = userData.username || userData.first_name || lastName || "Name Unknown";


        return username;
    } catch {
        // showFailedMessage("Your username and info could not be retreived");
    }

}

export const fetchApi = async (endpoint: string, parameters: Object | null, httpMethod: string) => {
    const url = urll + endpoint;

    try {
        const response = await fetch(url, {
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json', // You might need to adjust this based on your API
            },
            body: httpMethod !== 'GET' ? JSON.stringify(parameters) : undefined,
        });

        // Parse the JSON response
        const data = await response.json();
        return data;

    } catch (err) {
        console.error('Error:', err);
        //showFailedMessage("Failed to fetch " + endpoint)
        return { message: "Failed" }
    }
};

export const registerUser = async (userId: string | null, username: string | null) => {
    const endpoint = '/api/users/register_me';
    const parameters = {
        "user_id": userId,
        "username": username
    }
    const httpMethod = 'POST';
    const response = await fetchApi(endpoint, parameters, httpMethod);
    ////console.log(response);
    if (!(response && 'message' in response) && !('errors' in response)) {
        //showFailedMessage(response.message);
        return;
    }

}

export const getUserInfo = async (userId: string | null, setUsername: Function, setUserInfo: Function, setLevel: Function, setUser_tap_rate_level: Function, setUser_temp_tap_rate_level: Function, setUserBalance: Function, setUserRank: Function, setUserDailyRewardInfo: Function, setUserTaprateCount:Function) => {
    const endpoint = '/api/users/user-info/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    ////console.log(response);
    if (!(response && 'user_id' in response)) {
        //showFailedMessage(response.message);
        if (response && 'message' in response) {
            //showFailedMessage(response.message);
            setUserInfo(response);
            return;
        }
        return;
    } else {
        setUsername(response.username);
        setLevel(response.level);

        const energy_capacity = await getEnergyCapacity(userId);
        setUserInfo({ ...response, energy_capacity: energy_capacity });

        const tapRate = await getTapRate(userId, setUserTaprateCount);
        
        setUser_tap_rate_level(tapRate);
        setUser_temp_tap_rate_level(tapRate);
        getUserBalance(userId, setUserBalance);
        getUserLevel(userId, setLevel);
        getUserRank(userId, setUserRank);
        getDailyRewardInfo(userId, setUserDailyRewardInfo);
    }

}

export const getUserBalance = async (userId: string | null, setUserBalance: Function) => {
    const endpoint = '/api/transactions/balance/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    ////console.log(response);
    if (!(response && 'coin_balance' in response)) {
        //showFailedMessage(response.message);
        return;
    } else {
        setUserBalance(response.coin_balance);
    }
}
export const getEnergyCapacity = async (userId: string | null) => {
    const endpoint = '/api/energy-capacity/tap/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    ////console.log(response);
    if (!(response && 'energy_capacity' in response)) {
        //showFailedMessage(response.message);
        return 100;
    } else {
        return (response.energy_capacity);
    }
}
export const getTapRate = async (userId: string | null, setUserTaprateCount:Function) => {
    const endpoint = '/api/tap-rate/tap/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    ////console.log(response);
    if (!(response && 'tap_rate_reward' in response)) {
        //showFailedMessage(response.message);
        return 1;
    } else {
        setUserTaprateCount(response);
        return parseInt(response.tap_rate_reward);
    }
}

export const getAllLevelTapRate = async (setTapTreasures: Function) => {
    const endpoint = '/api/tap-rate/all';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        //showFailedMessage(response.message);
        return;
    } else {
        setTapTreasures(response.data);
        // console.log(response);

    }
}
export const boostTapRateBonus = async (userId: string | null, id: number) => {
    const endpoint = '/api/tap-rate/boost/' + userId + '';
    const httpMethod = 'POST';
    const parameters = {
        "level_tap_rate_id": id
    }
    const response = await fetchApi(endpoint, parameters, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response) || (response && 'status' in response && response.status=='failed')) {
        showFailedMessage(response.message);
        return false;
    } else {
        showSuccessMessage(response.message);
        return response;
    }
}

export const updateWalletAddress = async (userId: string | null, wallet_address: string | null) => {
    const endpoint = '/api/users/update-wallet-address/' + userId + '';
    const httpMethod = 'PUT';
    const parameters = {
        "wallet_address": wallet_address,
    }
    if (!wallet_address) {
        return;
    }
    const response = await fetchApi(endpoint, parameters, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        //showFailedMessage(response.message);
        return;
    } else {
        // showSuccessMessage("Updated wallet address successfully!");
    }
}

export const logUserInOut = async (userId: string | null, isLogin: boolean) => {
    let endpoint = null;
    let httpMethod = null;
    if (isLogin) {
        endpoint = '/api/users/log-online-status/' + userId + '';
        httpMethod = 'PUT';
    }
    else {
        endpoint = '/api/users/cancel-online-status/' + userId + '';
        httpMethod = 'DELETE';
    }

    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        //showFailedMessage(response.message);
        return;
    } else {
        // showSuccessMessage("logged user "+(isLogin ? "in" : "out")+" successfully");
    }
}



export const getUserRank = async (userId: string | null, setUserRank: Function) => {
    const endpoint = '/api/ranks/user/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    ////console.log(response);
    if (!(response && 'user_id' in response)) {
        //showFailedMessage(response.message);
        return;
    } else {
        setUserRank(response);

    }
}

export const getUserLevel = async (userId: string | null, setLevel: Function) => {
    const endpoint = '/api/levels/level/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && 'current_level' in response)) {
        //showFailedMessage(response.message);
        return;
    } else {
        setLevel(response);
    }
}

export const getDailyRewardInfo = async (userId: string | null, setUserDailyRewardInfo: Function) => {
    const endpoint = '/api/bonuses/daily/next-claim-time/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && 'next_claim_time' in response)) {
        //showFailedMessage(response.message);
        return;
    } else {
        setUserDailyRewardInfo(response);
    }
}
// copy this and change
export const addTapTransaction = async (userId: string | null, amount: number) => {
    const endpoint = '/api/transactions/add/' + userId + '';
    const httpMethod = 'POST';
    const parameters = {
        "transaction_type": "credit",
        "transaction_description": "User earned from tap",
        "transaction_amount": amount,
        "transaction_name": "tap"
    }
    const response = await fetchApi(endpoint, parameters, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        //showFailedMessage(response.message);
        return;
    } else {
        //showSuccessMessage("Tap transaction added successfully!");
    }
}

export const addClaimRandomTransaction = async (userId: string | null, amount: number) => {
    const endpoint = '/api/transactions/add/' + userId + '';
    const httpMethod = 'POST';
    const parameters = {
        "transaction_type": "credit",
        "transaction_description": "User earned from claiming random chest",
        "transaction_amount": amount,
        "transaction_name": "claim"
    }
    const response = await fetchApi(endpoint, parameters, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        //showFailedMessage(response.message);
        return;
    } else {
        //showSuccessMessage("Tap transaction added successfully!");
    }
}

export const getAllRankInfo = async (setAllRanks: Function) => {
    const endpoint = '/api/ranks/all/full';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!Array.isArray(response) || response.length === 0 || !('username' in response[0])) {
        //showFailedMessage(response.message);
        return;
    } else {
        setAllRanks(sortUsersByRank(response));
        // console.log(response);


    }
}

export const getUserInvivites = async (userId: string | null, setUserInvites: Function) => {
    const endpoint = '/api/invitations/invites/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!response || !Array.isArray(response) || response.length === 0) {
        //showFailedMessage(response.message);
        return;
    } else {
        setUserInvites(response);
    }
}

export const getInviteLink = async (userId: string | null, setInviteLink: Function) => {
    const endpoint = '/api/invitations/invite-link/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && 'invite_link' in response)) {
        //showFailedMessage(response.message);
        return;
    } else {
        setInviteLink(response.invite_link);
    }
}

export const getAllDailyBounuses = async (setAllDailyBonues: Function) => {
    const endpoint = '/api/bonuses/daily';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!response || !Array.isArray(response) || response.length === 0) {
        //showFailedMessage(response.message);
        return;
    } else {
        setAllDailyBonues(response);
    }
}

export const claimDailyBonus = async (userId: string | null, bonusId: number) => {
    const endpoint = '/api/bonuses/daily/claim/' + userId + '';
    const httpMethod = 'POST';
    const parameters = {
        "daily_reward_id": bonusId
    }
    const response = await fetchApi(endpoint, parameters, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        showFailedMessage(response.error);
        return false;
    } else {
        showSuccessMessage("Daily bonus Reward claimed successfully");
        return true;
    }
}
export const getClaimedDailyBonuses = async (userId: string | null, setClaimedDailyBonuses: Function) => {
    const endpoint = '/api/bonuses/daily/claimed-rewards/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && !('message' in response))) {
        //showFailedMessage(response.message);
        return;
    } else {

        setClaimedDailyBonuses(response);
    }
}
export const getInviteClaimed = async (userId: string | null, setClaimedInvites: Function) => {
    const endpoint = '/api/invitations/claimed-rewards/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && !('message' in response))) {
        ////showFailedMessage(response.message);
        return;
    } else {

        setClaimedInvites(response);
    }
}
export const claimInviteReward = async (userId: string | null, invitation_id: number) => {
    const endpoint = '/api/invitations/claim/' + userId + '';
    const httpMethod = 'POST';
    const parameters = {
        "invitation_id": invitation_id
    }
    const response = await fetchApi(endpoint, parameters, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        showFailedMessage(response.error);
        return false;
    } else {
        showSuccessMessage("Invite Reward claimed successfully");
        return response;
    }
}
export const getAllTasks = async (setTask: Function) => {
    const endpoint = '/api/tasks/all';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!response || !Array.isArray(response) || response.length === 0) {
        //showFailedMessage(response.message);
        return;
    } else {
        setTask(response);
    }
}
export const getDoneTasks = async (userId: string | null, setDoneTasks: Function) => {
    const endpoint = '/api/tasks/done/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && !('message' in response))) {
        //showFailedMessage(response.message);
        return;
    } else {

        setDoneTasks(response);
    }
}


export const claimTaskDoneReward = async (userId: string | null, taskId: number) => {
    const endpoint = '/api/tasks/mark-done/' + userId + '/' + taskId;
    const httpMethod = 'PUT';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        showFailedMessage(response.error);
        return false;
    } else {
        showSuccessMessage("Task Reward claimed successfully");
        return response;
    }
}
export const getNextClaimableReward = async (userId: string | null, setNextClaimableReward: Function) => {
    const endpoint = '/api/levels/next-claimable-reward/' + userId + '';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response)) {
        //showFailedMessage(response.message);
        return;
    } else {

        setNextClaimableReward(response);
    }
}
export const claimLevelUpReward = async (userId: string | null, levelId: number) => {
    const endpoint = '/api/levels/claim-reward/' + userId
    const httpMethod = 'POST';
    const parameters = {
        "level_id": levelId
    }
    const response = await fetchApi(endpoint, parameters, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        showFailedMessage(response.error);
        return false;
    } else {
        showSuccessMessage("Level Up Reward claimed successfully");
        return response;
    }
}
export const getAllTapTreausres = async (setTapTreasures: Function) => {
    const endpoint = '/api/tap-rate/all';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && !('message' in response))) {
        //showFailedMessage(response.message);
        return;
    } else {
        setTapTreasures(response);
        // console.log(response);

    }
}
export const getAllCoinTreausres = async (setCoinTreasures: Function) => {
    const endpoint = '/api/treasure/all';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && !('message' in response))) {
        //showFailedMessage(response.message);
        return;
    } else {
        setCoinTreasures(response.treasures);
        // console.log(response);


    }
}
export const AwardTreasurePurchse = async (userId: string | null, tresureId: number, info: { treasure_id: number, amount: number, name: string }) => {
    const endpoint = '/api/treasure/award-purchase/' + userId + '';
    const httpMethod = 'POST';
    const parameters = {
        "treasure_id": tresureId,
        "purchase_info": JSON.stringify(info),
    }
    const response = await fetchApi(endpoint, parameters, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        showFailedMessage(response.error);
        return false;
    } else {
        showSuccessMessage("Reward claimed successfully");
        return response;
    }
}
export const AwardTapboostPurchse = async (userId: string | null, boostId: number) => {
    const endpoint = '/api/tap-rate/boost/' + userId + '';
    const httpMethod = 'POST';
    const parameters = {
        "boost_id": boostId
    }
    const response = await fetchApi(endpoint, parameters, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        showFailedMessage(response.error);
        return false;
    } else {
        showSuccessMessage("Reward claimed successfully");
        return response;
    }
}
export const getTreasurePurchaseHistory = async (userId: string | null, setTreasurePurchaseHistory: Function) => {
    const endpoint = `/api/treasure/history/${userId}`;  // Template literals make the concatenation cleaner
    const httpMethod = 'GET';

    try {
        const response = await fetchApi(endpoint, null, httpMethod);

        // Check if the response has a valid purchase_history array
        if (!response || !Array.isArray(response.purchase_history) || response.purchase_history.length === 0) {
            console.error("No purchase history or invalid response format:", response);
            return;
        }

        // Proceed if the response is valid
        setTreasurePurchaseHistory(response.purchase_history);

    } catch (error) {
        console.error("Error fetching treasure purchase history:", error);
        // Optionally handle error messages (e.g., display to the user)
    }
};
export const uploadImage = async (imageDataUrl: string) => {
    // Send image data to your backend for storage
    const url = urll + '/api/upload/image';
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ image: imageDataUrl }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return process.env.NEXT_PUBLIC_API_URL + data.image_url; // URL of the uploaded image
};



const sortUsersByRank = (userArray: Array<any>) => {
    return userArray.sort((a, b) => a.rank - b.rank);
};

