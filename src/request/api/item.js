import service from '../index'

export function getMusicItemList(data) {
    return service({
        method: "GET",
        url: `/playlist/detail?id=${data}`
    })
}
export function getMusicDetail(data) {
    return service({
        method: "GET",
        url: `/playlist/track/all?id=${data}&limit=20&offset=1`
    })
}
// 获取歌词
export function getMusicLyric(data) {
    return service({
        method: "GET",
        url: `/lyric?id=${data}`
    })
}