<template>
  <div class="my-map">
    <el-container class="container">
      <div id="map"></div>
    </el-container>
  </div>
</template>

<script setup>
import L from 'leaflet'
import { Marker, Polygon, DomUtil, LayerGroup } from 'leaflet'
import 'leaflet/dist/leaflet.css'
// import { homeApi } from '@/api/modules/home'
const corner1 = L.latLng(90, 0) //设置左上角经纬度
const corner2 = L.latLng(0, 180) //设置右下点经纬度
const bounds = L.latLngBounds(corner1, corner2) //构建视图限制范围

let map = null
let layerGroup = null
const center = { lat: 41, lng: 123 }
onMounted(() => {
  map = L.map('map', {
    // crs: L.CRS.EPSG3857,
    // crs: L.CRS.EPSG4326,
    minZoom: 5,
    maxZoom: 22,
    center: center, // 地图中心
    zoom: 15, //缩放比列
    zoomControl: false, //禁用 + - 按钮
    doubleClickZoom: false, // 禁用双击放大
    attributionControl: false, // 移除右下角leaflet标识
    maxBounds: bounds
  })

  // L.DomUtil.addClass(map._container, 'leaflet-cursor-pointer').addTo(map)
  layerGroup = new LayerGroup([
    L.tileLayer(
      'http://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c',
      { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'], minZoom: 5, maxZoom: 22 }
    ),
    L.tileLayer(
      'http://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c',
      { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'], minZoom: 5, maxZoom: 22 }
    )
    // 你当前的地图组件的对象应为是  'map'..
  ]).addTo(map)

  createPoint(center)
  DomUtil.addClass(map._container, 'normal-cursor')
  map.on('click', (e) => {
    // if (latlngs.length === 4) {
    //   return
    // }
    console.log('坐标：', Object.values(e.latlng))
    const latlng = e.latlng
    const tempPoint = [latlng.lat, latlng.lng]
    latlngs.push(tempPoint)
    createPoint(tempPoint)
    // if (latlngs.length >= 4) {
    drawPoltgon()
    // }
  })
})
let marker = null
function createPoint(point) {
  let currentIndex = 0
  //   const myIcon = L.icon({
  //     iconUrl: 'my-icon.png',
  //     iconSize: [38, 95],
  //     iconAnchor: [22, 94],
  //     popupAnchor: [-3, -76],
  //     shadowUrl: 'my-icon-shadow.png',
  //     shadowSize: [68, 95],
  //     shadowAnchor: [22, 94]
  // });
  marker = new Marker(point, { draggable: true }).addTo(map)
  marker.on('mousedown', function (e) {
    const latlng = getLatlng(this._latlng)
    currentIndex = latlngs.findIndex((item) => {
      return JSON.stringify(latlng) === JSON.stringify(item)
    })
    DomUtil.addClass(e.target._icon, 'grabbing')
  })
  marker.on('mouseup', function (e) {
    DomUtil.removeClass(e.target._icon, 'grabbing')
  })

  marker.on('click', function (e) {
    map.removeLayer(this)
    latlngs.splice(currentIndex, 1)
    if (polygon) {
      drawPoltgon()
    }
  })
  // 转换坐标格式方便设置坐标使用
  function getLatlng(data) {
    return [data.lat, data.lng]
  }

  marker.on('move', function (e) {
    const newLatLngData = e.target._latlng
    latlngs[currentIndex] = [newLatLngData.lat, newLatLngData.lng]
    // 移动线位置
    // if (polygon) {
    drawPoltgon()
    // }
  })
}
const latlngs = []
let polygon = null
function drawPoltgon() {
  if (polygon) {
    polygon.setLatLngs(latlngs)
  } else {
    polygon = new Polygon(latlngs, { color: 'red' }).addTo(map)
  }
}
</script>

<style lang="scss" scoped>
.my-map {
  width: 100%;
  height: 100%;
  > .container {
    width: 100%;
    height: 100%;
    .aside-ul {
      width: 100%;
      li {
        height: 40px;
        background-color: $theme-color;
      }
    }
    #map {
      width: 100%;
      height: 100%;
      &.normal-cursor {
        cursor: pointer;
        :deep(.leaflet-marker-pane) {
          img:hover {
            cursor: grab;
          }
          .grabbing:hover {
            cursor: grabbing;
          }
        }
      }
    }
  }
}
</style>
