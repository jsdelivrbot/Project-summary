import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    bubble:{
      open:true
    },
    friends:{
      update:false
    },
    fresh:{
      isFresh:false
    },
    audio:{
      play:true,
      volumn:''
    },
    userAgent:{
      weiXinClass:false,
      qqClass:false
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    CLOSE_BUBBLE:state =>{
      state.bubble.open=false
    },
    UPDATE_FRIENS:state =>{
      state.friends.update=true
    },
    FRESH:state =>{
      state.fresh.isFresh=true
    },
     
    
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseBubble:({commit}) =>{
      commit('CLOSE_BUBBLE')
    },
    UpdateFriens:({commit}) =>{
      commit('UPDATE_FRIENS')
    },
    Fresh:({commit}) =>{
      //debugger;
      commit('FRESH')
    },
    ControlAudioSwitch:({commit,state}) =>{
      state.audio.play=!state.audio.play;
    },
    ControlAudioSlider:({commit,state},audioData) =>{
      //debugger;
      state.audio.volumn= audioData;
    }
  }
}

export default app
