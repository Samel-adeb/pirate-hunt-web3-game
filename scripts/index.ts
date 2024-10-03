import { showFailedMessage, showSuccessMessage } from './utils'

const urll = process.env.NEXT_PUBLIC_API_URL;

export const getUserId = async () => {
    // Get the URL
    let url = window.location.href;


    // Decode the URL twice
    let decodedUrl = decodeURIComponent(decodeURIComponent(url));

    // Parse URL to get query parameters
    let queryString = decodedUrl.split('#tgWebAppData=user=')[1];
    if(queryString !== undefined){
        localStorage.setItem('url', url);
    }else{
        
        url = localStorage.getItem('url') || '/';
        decodedUrl = decodeURIComponent(decodeURIComponent(url));
        queryString = decodedUrl.split('#tgWebAppData=user=')[1];
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

}
export const getUsername = async () => {
    // Get the URL
    let url = window.location.href;


    // Decode the URL twice
    let decodedUrl = decodeURIComponent(decodeURIComponent(url));

    // Parse URL to get query parameters
    let queryString = decodedUrl.split('#tgWebAppData=user=')[1];
    if(queryString !== undefined){
        localStorage.setItem('url', url);
    }else{
       
        url = localStorage.getItem('url') || '/';
        decodedUrl = decodeURIComponent(decodeURIComponent(url));
        queryString = decodedUrl.split('#tgWebAppData=user=')[1];
    }

    const querytring = queryString.split('&')[0];
    // Parse user data JSON
    const userData = JSON.parse(querytring);

    // Extract user information
    const userId = userData.id;
    const firstName = userData.first_name;
    const lastName = userData.last_name;
    const username = userData.username;



    return username;

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
        showFailedMessage("Failed to fetch " + endpoint)
        return { message: "Failed" }
    }
};

export const regusterUser = async (userId: string | null, username: string | null) => {
    const endpoint = '/api/users/register';
    const parameters = {
        "user_id": userId,
        "username": username
    }
    const httpMethod = 'POST';
    const response = await fetchApi(endpoint, parameters, httpMethod);
    ////console.log(response);
    if (!(response && 'message' in response) && !('errors' in response)) {
        showFailedMessage(response.message);
        return;
    }

}

export const getUserInfo = async (userId: string | null, setUsername: Function, setLevel: Function, setUser_tap_rate_level: Function, setUserBalance: Function, setUserRank: Function, setUserDailyRewardInfo: Function) => {
    const endpoint = '/api/users/user-info/' + userId + '/';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    ////console.log(response);
    if (!(response && 'user_id' in response)) {
        showFailedMessage(response.message);
        return;
    } else {
        setUsername(response.username);
        setLevel(response.level);
        setUser_tap_rate_level(response.user_tap_rate_level);
        getUserBalance(userId, setUserBalance);
        getUserLevel(userId, setLevel);
        getUserRank(userId, setUserRank);
        getDailyRewardInfo(userId, setUserDailyRewardInfo);
    }

}

export const getUserBalance = async (userId: string | null, setUserBalance: Function) => {
    const endpoint = '/api/transactions/balance/' + userId + '/';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    ////console.log(response);
    if (!(response && 'coin_balance' in response)) {
        showFailedMessage(response.message);
        return;
    } else {
        setUserBalance(response.coin_balance);
    }
}

export const getUserRank = async (userId: string | null, setUserRank: Function) => {
    const endpoint = '/api/ranks/user/' + userId + '/';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    ////console.log(response);
    if (!(response && 'user_id' in response)) {
        showFailedMessage(response.message);
        return;
    } else {
        setUserRank(response);
        
    }
}

export const getUserLevel = async (userId: string | null, setLevel: Function) => {
    const endpoint = '/api/levels/level/' + userId + '/';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && 'current_level' in response)) {
        showFailedMessage(response.message);
        return;
    } else {
        setLevel(response);
    }
}

export const getDailyRewardInfo = async (userId: string | null, setUserDailyRewardInfo: Function) => {
    const endpoint = '/api/bonuses/daily/next-claim-time/' + userId + '/';
    const httpMethod = 'GET';
    const response = await fetchApi(endpoint, null, httpMethod);
    //console.log(response);
    if (!(response && 'next_claim_time' in response)) {
        showFailedMessage(response.message);
        return;
    } else {
        setUserDailyRewardInfo(response);
    }
}

export const addTapTransaction = async (userId: string | null, amount: number) => {
    const endpoint = '/api/transactions/add/' + userId + '/';
    const httpMethod = 'POST';
    const parameters = {
        "transaction_type":"credit",
        "transaction_description": "User earned from tap",
        "transaction_amount" :amount,
        "transaction_name":"tap"
    }
    const response = await fetchApi(endpoint, parameters, httpMethod);
    //console.log(response);
    if (!(response && 'message' in response)) {
        showFailedMessage(response.message);
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
    if (!(response && 'username' in response[0])) {
        showFailedMessage(response.message);
        return;
    } else {
        setAllRanks(sortUsersByRank(response));
        // console.log(response);
        
        
    }
}
const sortUsersByRank = (userArray:Array<any>) => {
    return userArray.sort((a, b) => a.rank - b.rank);
};
