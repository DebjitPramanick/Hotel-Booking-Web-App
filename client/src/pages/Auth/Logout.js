const Logout = () => {
    localStorage.removeItem('user')
    window.location.href = "/login"
    return null
}

export default Logout
