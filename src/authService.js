const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const login = (username, password) => {
    localStorage.setItem('user', JSON.stringify({user: username, password: password}))
}

const logout = () => {
    localStorage.removeItem('user');
   }

export {
    getCurrentUser,
    login,
    logout
}

