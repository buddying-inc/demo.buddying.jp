<script>
  import blueImp from 'blueimp-load-image'

  let preview = null
  let description = null

  const handleImage = (ev) => {
    const file = ev.currentTarget.files[0]

    preview.file = file

    const reader = new FileReader()
    reader.onload = (ev) => {
      preview.src = ev.target.result

      blueImp(ev.target.result, (img, data) => {
        const gpsInfo = data.exif && data.exif.get('GPSInfo')
        if (gpsInfo) {
          // console.log(gpsInfo.getAll())
          const gpsLatitude = gpsInfo.get('GPSLatitude') // 緯度（度・分・秒）
          const gpsLongitude = gpsInfo.get('GPSLongitude') // 経度（度・分・秒）

          const latitude = gpsLatitude[0] + (gpsLatitude[1] / 60) + (gpsLatitude[2] / 3600)
          const longitude = gpsLongitude[0] + (gpsLongitude[1] / 60) + (gpsLongitude[2] / 3600)

          description.innerText = '緯度:' + latitude + ',経度:' + longitude
        }
      }, { meta: true })
    }
    reader.readAsDataURL(file)
  }
</script>

<main>
    <input type="file" on:change={handleImage}>
    <img src="" bind:this={preview} alt=""/>
    <div bind:this={description}></div>
</main>

<style>
    img {
        display: block;
        width: 100%;
        max-width: 500px;
    }
</style>
