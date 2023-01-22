const createTokenUser = (user) => {
    return { username: user.username, userId: user._id, name: user.name};
};

module.exports = createTokenUser;
