const getters = {
    sidebar: state => state.app.sidebar,
    bubble:state => state.app.bubble,
    friends:state => state.app.friends,
    fresh:state => state.app.fresh,
    audio:state => state.app.audio,
    userAgent:state => state.app.userAgent,
    id: state => state.user.id,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    clientData: state => state.clientData,
}
export default getters