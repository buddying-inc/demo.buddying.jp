<script>
  import { onMount } from 'svelte'

  // api-key
  // https://console.cloud.google.com/apis/credentials/key/d9c58b3d-7029-42e5-aa29-b24fbd65b7b4?authuser=0&hl=ja&project=my-project-1513125814088

  // js
  // https://developers.google.com/maps/documentation/javascript/load-maps-js-api?hl=ja
  // https://cloud.google.com/blog/ja/products/maps-platform/more-control-loading-maps-javascript-api

  // marker
  // https://developers.google.com/maps/documentation/javascript/advanced-markers/graphic-markers?hl=ja
  // https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers?hl=ja

  import { Loader } from '@googlemaps/js-api-loader'

  // "http://localhost:5173/" で動かす場合は FireFox を使う.

  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLEM_MAP_API_KEY,
    version: 'weekly',
    libraries: ['maps', 'marker', 'routes'],
    language: 'ja',
    region: 'JP',
  })

  let map = null
  let directionsService = null
  let directionsRenderer = null
  const zoom = 13

  onMount(() => {
    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary('maps')
      const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary('routes')

      map = new Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: zoom,
      })
      map.panTo({ lat: 35.319016, lng: 139.550416 })

      const directionRequest = {
        origin: new google.maps.LatLng(35.319016, 139.550416), // 鎌倉駅
        destination: new google.maps.LatLng(35.337227, 139.545194), // 北鎌倉駅
        travelMode: google.maps.DirectionsTravelMode.DRIVING, // 移動手段（WALKING はベータ版）
      }
      directionsService = new DirectionsService()
      directionsService.route(directionRequest, (response, status) => {
        if (status !== google.maps.DirectionsStatus.OK) {
          return
        }

        const directionRendererOptions = {
          map: map, // 描画先の地図
          draggable: true, // ドラッグ可
          preserveViewport: true, // centerの座標、ズームレベルで表示
        }
        directionsRenderer = new DirectionsRenderer(directionRendererOptions)
        directionsRenderer.setDirections(response)
        console.log(response)
      })
    })

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords
        map.panTo({ lat: crd.latitude, lng: crd.longitude })

        const directionRequest = {
          origin: new google.maps.LatLng(crd.latitude, crd.longitude), // 現在地
          destination: new google.maps.LatLng(35.337227, 139.545194), // 北鎌倉駅
          travelMode: google.maps.DirectionsTravelMode.DRIVING, // 移動手段（WALKING はベータ版）
        }
        directionsService.route(directionRequest, (response, status) => {
          if (status !== google.maps.DirectionsStatus.OK) {
            return
          }

          directionsRenderer.setDirections(response)
          console.log(response)
        })
      },
      (err) => {
        alert(`ERROR(${err.code}): ${err.message}`)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    )
  })
</script>

<main>
    <h2>鎌倉駅から北鎌倉駅に車で行く道順</h2>
    <h3>※ 現在位置情報取得を許可すると現在地から北鎌倉駅まで道順</h3>
    <div id="map"></div>
</main>

<style>
    #map {
        width: 800px;
        height: 600px;
    }
</style>
