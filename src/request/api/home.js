import service from '../index'

export function getBanner() {
    return service({
        method: "GET",
        url: "/banner?type=2"
    })
}

export function getMusicList() {
    return service({
        method: "GET",
        url: "/personalized?limit=10"
    })
}

export function getPhone(data) {
    return service({
        method: "GET",
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
// 搜索/search?keywords=
export function getSearch(data) {
    return service({
        method: "GET",
        url: `/search?keywords=${data}`
    })
}