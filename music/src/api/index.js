/* eslint-disable*/
import axios from 'axios'
import { get, post } from './http'

// =======================> 用户 API
// 登录
export const loginIn = (params) => post(`user/login`, params)
// 注册
export const SignUp = (params) => post(`user/register`, params)
// 更新用户信息
export const updateUserMsg = (params) => put(`user/modify`, params)
// 返回指定ID的用户
export const getUserOfId = (id) => get(`user/userId=${id}`)


// =======================> 歌单 API
// 获取全部歌单
export const getSongList = () => get('systemList/getAll')
// 返回歌单里指定歌单ID的歌曲
export const getListSongOfSongId = (songListId) => get(`/collect/collectId=${songListId}`)


// =======================> 歌手 API
// 返回所有歌手
export const getAllSinger = () => get('singer/all')


// =======================> 收藏 API
// 返回的指定用户ID的收藏列表
export const getCollectionOfUser = (userId) => get(`collect/userId=${userId}`)
// 添加收藏的歌曲
export const setCollection = (params) => post(`collection/addSong/collectId=${id}$songId=${id}`, params)

//========================> 排行榜 API
//返回排行榜列表
export const getSortList = () => get('getRanks')


// =======================> 评论 API
// 添加评论
export const setComment = (params) => post(`comment/add`, params)
// 返回所有评论
export const getAllComment = (id) => get(`comment/songId=${id}`)


// =======================> 歌曲 API
// 返回指定歌曲ID的歌曲
export const getSongOfId = (id) => get(`song/songId=${id}`)
// 返回指定歌手ID的歌曲
export const getSongOfSingerId = (id) => get(`song/singerId=${id}`)
// 返回指定歌手名的歌曲
export const getSongOfSearch = (keywords) => get(`/song/search/name=${keywords}`)
// 下载音乐
export const download = (url) => axios({
  method: 'get',
  url: url,
  responseType: 'blob'
})
