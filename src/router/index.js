import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home/home')
const MV = () => import('@/views/MV/mv')
const My = () => import('@/views/MY/my')
const myLike = () => import('@/views/MY/childView/myLike.vue')
const mySong = () => import('@/views/MY/childView/myLike/mySong')
const myPlaylist = () => import('@/views/MY/childView/myLike/myPlaylist')
const myAlbum = () => import('@/views/MY/childView/myLike/myAlbum')
const myMV = () => import('@/views/MY/childView/myLike/myMv')
const myFans = () => import('@/views/MY/childView/myFans')
const myFocus = () => import('@/views/MY/childView/myFocus.vue')
const mySinger = () => import('@/views/MY/childView/myFocus/mySinger')
const myUser = () => import('@/views/MY/childView/myFocus/myUser')

const Album = () => import('@/views/Album/album')
const PlayList = () => import('@/views/PlayList/playlist')
const Singer = () => import('@/views/Singer/singer')
const TopList = () => import('@/views/TopList/toplist')

//详情信息
const playlistDet = () => import('@/views/detail/playlistDet/playlistDet')
const singerDet = () => import('@/views/detail/singerDet/singerDet')
const albumDet = () => import('@/views/detail/albumDet/albumDet')
const songDet = () => import('@/views/detail/songDet/songDet')
const mvDet = () => import('@/views/detail/mvDet/mvDet')
const videoDet = () => import('@/views/detail/videoDet/videoDet')
const searchDet = () => import('@/views/detail/searchDet/searchDet')
const searchSinger = () => import('@/views/detail/searchDet/childComps/searchSinger')
const searchPlaylist = () => import('@/views/detail/searchDet/childComps/searchPlaylist')
const searchAlbum = () => import('@/views/detail/searchDet/childComps/searchAlbum')
const searchSong = () => import('@/views/detail/searchDet/childComps/searchSong')
const searchMv = () => import('@/views/detail/searchDet/childComps/searchMv')
//播放器
const playerDet = () => import('@/views/detail/playerDet/playerDet')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/MV',
    name: 'MV',
    component: MV
  },
  {
    path: '/My',
    name: 'My',
    component: My,
    children: [
      {
        path: '/',
        redirect: '/My/like'
      },
      {
        path: 'like',
        name: 'like',
        component: myLike,
        children: [
          {
            path: '/',
            redirect: '/My/like/song'
          },
          {
            path: 'song',
            name: 'mySong',
            component: mySong,
          },
          {
            path: 'Playlist',
            name: 'myPlaylist',
            component: myPlaylist,
          },
          {
            path: 'Album',
            name: 'myAlbum',
            component: myAlbum,
          },
          {
            path: 'MV',
            name: 'myMV',
            component: myMV,
          },
        ]
      },
      {
        path: 'Fans',
        name: 'Fans',
        component: myFans,
      },
      {
        path: 'Focus',
        name: 'Focus',
        component: myFocus,
        children: [
          {
            path: '/',
            redirect: '/My/Focus/singer'
          },
          {
            path: 'singer',
            name: 'mySinger',
            component: mySinger,
          },
          {
            path: 'user',
            name: 'myUser',
            component: myUser,
          }
        ]
      }
    ]
  },
  {
    path: '/Album',
    name: 'Album',
    component: Album
  },
  {
    path: '/PlayList',
    name: 'PlayList',
    component: PlayList
  },
  {
    path: '/Singer',
    name: 'Singer',
    component: Singer
  },
  {
    path: '/TopList',
    name: 'TopList',
    component: TopList
  },

  {
    path: '/Singer/:id',
    name: 'singerDet',
    component: singerDet
  },
  {
    path: '/Song/:id',
    name: 'songDet',
    component: songDet
  },
  {
    path: '/playlist/:id',
    name: 'playlistDet',
    component: playlistDet
  },
  {
    path: '/Album/:id',
    name: 'AlbumDet',
    component: albumDet
  },
  {
    path: '/mvDet/:id',
    name: 'mvDet',
    component: mvDet
  },
  {
    path: '/videoDet/:id',
    name: 'videoDet',
    component: videoDet
  },
  {
    path: '/search',
    name: 'search',
    component: searchDet,
    children: [
      {
        path: '/',
        redirect: '/search/song'
      },
      {
        path: 'song',
        name: 'searchSong',
        component: searchSong,
      },
      {
        path: 'artist',
        name: 'searchSinger',
        component: searchSinger,
      },
      {
        path: 'playlist',
        name: 'searchPlaylist',
        component: searchPlaylist,
      },
      {
        path: 'album',
        name: 'searchAlbum',
        component: searchAlbum
      },
      {
        path: 'mv',
        name: 'searchMv',
        component: searchMv
      }
    ]
  },
  {
    path: '/player',
    name: 'player',
    component: playerDet
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

export default router
