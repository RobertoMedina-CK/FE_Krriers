const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const login = (username, password) => {
    localStorage.setItem('user', JSON.stringify({user: username, password: password}))
}

const logout = () => 
    {
        localStorage.removeItem('user');
        if (localStorage.getItem('user')) { 
            //check something in local storage so you can know
            // if you should reload or not 
    
            window.location.reload();
        }
        return 'you were logout';
    };

export {
    getCurrentUser,
    login,
    logout
}
