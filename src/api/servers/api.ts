import { service } from '../index'
// 首页轮播图
const getBanner = () => { return service.get('/banner', {}) }
// 首页icon入口
const iconMenu = () => { return service.get('/homepage/dragon/ball') }
// 获取每日推荐歌曲
const getRecommendSongs = () => { return service.get('/recommend/songs').then((res) => {
  document.cookie = "MUSIC_U=21f904186b81b2a5ad871f8e4155b976260680200e9c771e418ed94dedf80983519e07624a9f0053358b15d619bb2579ba526406dfa5b20819f5cb4406e2de95ab939185882b0c1bd4dbf082a8813684; __csrf=2b16b934aa3dfd81633b95dce2a1f3ab; NMTID=00OlbIbVA07W4L9i0KHq6Qa3aYmIcQAAAGHozJ3RA";
  document.cookie = " __csrf=2b16b934aa3dfd81633b95dce2a1f3ab;";
  document.cookie = "NMTID=00OlbIbVA07W4L9i0KHq6Qa3aYmIcQAAAGHozJ3RA";
  return res;
}) }
// 搜索
const search = ( keywords = '' ) => { return service.get(`/search?keywords=${keywords}`, {}) }
// 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
const cloudsearch = (keywords = '', type = '1018', limit = 30, offset = 0, ) => { return service.get(`/cloudsearch?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`, {}) }
// 热门搜索
const serachHot = () => { return service.get('/search/hot', {}) }
// 热门搜索详细
const serachHotDetail = () => { return service.get('/search/hot/detail', {}) }
const serachSuggest = ( keywords = '' ) => { return service.get(`/search/suggest?keywords=${keywords}`, {}) }
const serachMatch = ({ keywords = '' }) => { return service.get(`/search/multimatch?keywords=${keywords}`, {}) }
// 登录
const login = ({ phone = '', pwd = '', realIP = '43.241.243.255' }) => { return service.post(`/login/cellphone`, {phone, password: pwd, realIP}) }

/**
 *  生成key
*/
const createKey = () => { return service.get(`/login/qr/key?t=${Date.now()}`) }

/**
*   生成二维码
*/
const createQr = async(key: string) => { 
  return service.get(`/login/qr/create?key=${key}&qrimg=true`) 
}

// 检查登陆状态
const checkQr = (key: string) => {
  return service.get(`/login/qr/check?key=${key}&t=${Date.now()}`)
}

/**
 * 
 * @returns 
 */
// const loginByCode = ()
// 退出登录
const logout = () => { return service.get('/logout', {}) }
// 获取用户详情
const getUserInfo = ({ uid = '' }) => { return service.get(`/user/detail?uid=${uid}`, {}) }
// 音乐是否可用
const checkSong = ({ id = '' }) => { return service.get(`/check/music?id=${id}`, {}) }

/* ********* 歌单 ********* */
// 热门歌单分类
const hotList = () => { return service.get('/playlist/hot', {}) }
// 歌单列表
const playList = ({ order = 'hot', cat = '', limit = 50, offset = 0 }) => { return service.get(`/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`, {}) }
// 推荐歌单
const personalized = (limit = 30) => { return service.get(`/personalized?limit=${limit}`, {})}
// 精品歌单
const highquality = (limit = 20, before = 0) => { return service.get(`/top/playlist/highquality?limit=${limit}&before=${before}`, {}) }
// 精品歌单标签
const highqualitytag = () => { return service.get('/playlist/highquality/tags', {}) }
// 歌单分类
const catlist = () => { return service.get('/playlist/catlist', {}) }
// 歌单详情
const playlistdetail = (id: number, s = 8 ) => {
  return service.get(`/playlist/detail?id=${id}&s=${s}`, {})
  .then(res => {
    const playlist: playListTypes = formatPlayListData(res.playlist);
    res.playlist = playlist;
    res.playlist.songs.forEach((it: songTypes) => {
      it.resourceType = 'SONG';
    });
    return res;
  })
};
// 歌单收藏用户
const playlistSCollect = ({ id = '', limit = 20, offset = 0 }) => { return service.get(`/playlist/subscribers?id=${id}&limit=${limit}&offset=${offset}`, {}) }
// 相关歌单推荐
const playlistRelated = ({ id = '' }) => { return service.get(`/related/playlist?id=${id}`, {}) }
// 歌单评论
const playlistComment = ({ id = '', limit = 20, offset = 0, before = 0 }) => { return service.get(`/comment/playlist?id=${id}&limit=${limit}&offset=${offset}&before=${before}`, {}) }
// 收藏、取消歌单 1：收藏 2取消
const subPlayList = ({ t = 1, id = '' }) => { return service.get(`/playlist/subscribe?t=${t}&id=${id}`, {}) }
// 获取用户歌单
const playlistUser = ({ uid = '', limit = 30, offset = 0 }) => { return service.get(`/user/playlist?uid=${uid}&limit=${limit}&offset=${offset}`, {}) }
// 添加歌曲到歌单
const addPlayList = ({ op = 'add', pid = '', tracks = '' }) => { return service.get(`/playlist/tracks?op=${op}&pid=${pid}&tracks=${tracks}`, {}) }

/* ********* 歌曲 ********* */
// 歌曲详情 多个id , 隔开
const songDetail = (ids = '', timestamp = 0) => { 
  return service.post(`/song/detail?timestamp=${timestamp}`, { ids: ids })
  .then((res: any) => {
    return formatSongData(res.songs);
  });
}
// 获取音乐URL
const songUrl = (id: number) => { return service.get(`/song/url?id=${id}`, {}) }
// 喜欢歌曲
const likeSong = ({ id = '', like = false }) => { return service.get(`/like?id=${id}&like=${like}`, {}) }
// 歌词
const lyrics = (id = '') => { return service.get(`/lyric?id=${id}`, {}) }
// 获取相似音乐
const simiSong = ({ id = '' }) => { return service.get(`/simi/song?id=${id}`, {}) }
// 包含这首歌的歌单
const simiPlayList = ({ id = '' }) => { return service.get(`/simi/playlist?id=${id}`, {}) }

/* ********* 歌曲评论 ********* */
// 歌曲评论
const commentSong = ({ id = '', limit = 20, offset = 0, before = 0, timestamp = 0 }) => { return service.get(`/comment/music?id=${id}&limit=${limit}&offset=${offset}&before=${before}&timestamp=${timestamp}`, {}) }
/*
    * 发送/删除评论
    * t: 0删除 1发送 2回复
    * type: 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
    * id: 对应资源id
    * content: 发送的内容/对应内容的id
    * commentId: 回复的评论id
*/
const comment = ({ t = 1, type = 0, id = '', content = '', commentId = '' }) => { return service.get(`/comment?t=${t}&type=${type}&id=${id}&content=${content}&commentId=${commentId}`, {}) }
/*
    * 给评论点赞
    * id: 对应资源id
    * cid: 评论id
    * t: 是否点赞 1: 是  0: 取消
    * type: 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
*/
const commentLike = ({ id = '', cid = '', t = 1, type = 0 }) => { return service.get(`/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}`, {}) }

/* ********* 专辑 ********* */
// 获取专辑内容
const album = ({ id = '' }) => { return service.get(`/album?id=${id}`, {}) }
const albumDynamic = ({ id = '' }) => { return service.get(`/album/detail/dynamic?id=${id}`, {}) }
const albumSub = ({ id = '', t = 1 }) => { return service.get(`/album/sub?id=${id}&t=${t}`, {}) }
// 专辑评论
const albumComment = ({ id = '', limit = 20, offset = 0, before = 0, timestamp = 0 }) => { return service.get(`/comment/album?id=${id}&limit=${limit}&offset=${offset}&before=${before}&timestamp=${timestamp}`, {}) }

/* ********* 歌手 ********* */
// 歌手介绍
const artistDesc = ({ id = '' }) => { return service.get(`/artist/desc?id=${id}`, {}) }
// 歌手热门歌曲
const artists = ({ id = '' }) => { return service.get(`/artists?id=${id}`, {}) }
// 收藏/取消收藏歌手
const artistSub = ({ id = '', t = '1' }) => { return service.get(`/artist/sub?id=${id}&t=${t}`, {}) }
// 获取歌手专辑
const artistAlbum = ({ id = '', limit = 50, offset = 0 }) => { return service.get(`/artist/album?id=${id}&limit=${limit}&offset=${offset}`, {}) }
// 获取歌手 mv
const artistMv = ({ id = '', limit = 50, offset = 0 }) => { return service.get(`/artist/mv?id=${id}&limit=${limit}&offset=${offset}`, {}) }
// 获取歌手列表
/*
    * 给评论点赞
    * type: -1:全部; 1:男歌手; 2:女歌手; 3:乐队
    * area: -1:全部; 7华语; 96欧美; 8:日本; 16韩国; 0:其他
    * initial: 按首字母索引查找参数, 热门传-1, #传0
    * limit: 30
    * offset: 0
*/
const artistList = ({ type = -1, area = -1, initial = '', limit = 50, offset = 0 }) => { return service.get(`/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`, {}) }
// 收藏的歌手列表
const subArtist = () => { return service.get('/artist/sublist', {}) }

/* ********* MV ********* */
// 获取 mv
const mv = ({ area = '', type = '', order = '', limit = 50, offset = 0 }) => { return service.get(`/mv/all?area=${area}&type=${type}&order=${order}&limit=${limit}&offset=${offset}`, {}) }
// 获取 mv详情
const mvDetail = ({ id = '' }) => { return service.get(`/mv/detail?mvid=${id}`, {}) }
// 获取 地址
const mvUrl = ({ id = '', r = 1080 }) => { return service.get(`/mv/url?id=${id}&r=${r}`, {}) }
// 获取mv评论
const commentMv = ({ id = '', limit = 20, offset = 0, before = 0, timestamp = 0 }) => { return service.get(`/comment/mv?id=${id}&limit=${limit}&offset=${offset}&before=${before}&timestamp=${timestamp}`, {}) }
// 相似mv
const simiMv = ({ id = '' }) => { return service.get(`/simi/mv?mvid=${id}`, {}) }

/* ********* 排行榜 ********* */
// 排行榜
const toplist = () => { return service.get('/toplist', {}) }
// 排行榜歌单列表
const topRankList = (id: number, s = 8 ) => { return service.get(`/playlist/detail?id=${id}&s=${s}`, {}) }
// 所有榜单内容摘要
const topListDetail = () => { return service.get('/toplist/detail', {}) }
// 歌单详情
const listDetail = ({ id = 0, s = 8 }) => { return service.get(`/playlist/detail?id=${id}&s=${s}`, {}) }

/* ********* video ********* */
// 视频播放地址
const videoUrl = ({ id = '', r = 1080 }) => { return service.get(`/video/url?id=${id}&r=${r}`, {}) }
// 获取 video 详情
const videoDetail = ({ id = '' }) => { return service.get(`/video/detail?id=${id}`, {}) }
// 相似video
const simiVideo = ({ id = '' }) => { return service.get(`/related/allvideo?id=${id}`, {}) }
// 获取video评论
const commentVideo = ({ id = '', limit = 20, offset = 0, before = 0, timestamp = 0 }) => { return service.get(`/comment/video?id=${id}&limit=${limit}&offset=${offset}&before=${before}&timestamp=${timestamp}`, {}) }

// 热门话题
const hotTopic = (limit = 20, offset = 20) => { return service.get(`/hot/topic`, {}) }
// 新碟上架
const topAlbum = ({ limit = 20, offset = 0, area = 'all', type = 'new', year = '', month = '' }) => { return service.get(`/top/album?limit=${limit}&offset=${offset}&area=${area}&type=${type}&year=${year}&month=${month}`, {}) }
// 热门歌手
const topArtists = ({ limit = 30, offset = 0 }) => { return service.get(`/top/artists?limit=${limit}&offset=${offset}`, {}) }
// 最新MV
const getNewMv = ({ limit = 30, area = '' }) => { return service.get(`/mv/first?limit=${limit}&area=${area}`, {}) }
// 热门电台
const getHotDj = ({ limit = 30, offset = 0 }) => { return service.get(`/dj/hot?limit=${limit}&offset=${offset}`, {}) } 

export {
  getBanner,
  iconMenu,
  getRecommendSongs,
  search,
  serachHot,
  serachHotDetail,
  serachSuggest,
  serachMatch,
  cloudsearch,
  login,
  createKey,
  createQr,
  checkQr,
  logout,
  getUserInfo,
  checkSong,
  hotList,
  playList,
  catlist,
  topRankList,
  playlistdetail,
  playlistSCollect,
  playlistRelated,
  playlistComment,
  subPlayList,
  playlistUser,
  addPlayList,
  songDetail,
  songUrl,
  likeSong,
  lyrics,
  simiSong,
  simiPlayList,
  commentSong,
  comment,
  commentLike,
  album,
  albumSub,
  albumDynamic,
  albumComment,
  artistDesc,
  artists,
  artistSub,
  artistAlbum,
  artistMv,
  artistList,
  mv,
  mvDetail,
  mvUrl,
  commentMv,
  simiMv,
  personalized,
  highquality,
  highqualitytag,
  videoUrl,
  videoDetail,
  simiVideo,
  commentVideo,
  hotTopic,
  topAlbum,
  toplist,
  topListDetail,
  listDetail,
  getNewMv,
  topArtists,
  subArtist,
  getHotDj
}


function formatSongData(songs: any, resource = {}) {
  const list = songs.map((song: any) => {
    const data: songTypes = {
      isVip: song.fee === 1,
      album: song.al,
      artist: song.ar && song.ar[0],
      artists: song.ar,
      id: song.id,
      name: song.name + (song.alia.length > 0 ? song.alia[0] : ''),
      mp3Url: '', // mp3
      duration: song.dt, // 时长
      resourceType: 'SONG',
      resource,
    };
    return data;
  });
  return list;
}

function formatPlayListData(playList: any) {
  const _playList: playListTypes = {
    ...playList,
    picUrl: playList.coverImgUrl,
    name: playList.name,
    id: playList.id,
    description: playList.description,
    createTime: playList.createTime,
    updateTime: playList.updateTime,
    shareCount: playList.shareCount, // 分享
    commentCount: playList.commentCount, // 评论
    subscribedCount: playList.subscribedCount, // 订阅
    creator: {
      ...playList.creator,
      nickname: playList?.creator?.nickname,
      userId: playList.creator.userId || playList.userId,
    },
    songs:
      playList.tracks &&
      formatSongData(playList.tracks, { playListId: playList.id }),
    resourceType: 'PLAYLIST',
  };
  return _playList;
}
