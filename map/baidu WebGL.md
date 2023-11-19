# 百度地图WebGL

官方教程：https://lbsyun.baidu.com/index.php?title=jspopularGL/guide/getkey

控制台：https://lbsyun.baidu.com/apiconsole/key#/home 

api：https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_webgl_1_0.html#a0b0

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BMap_demo</title>
    <style>
      html,
      body,
      #map {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      function initMap() {
        // 地图初始化
        var MapOptions = {
          // minZoom: Number, // 地图允许展示的最小级别
          // maxZoom: Number, // 地图允许展示的最大级别 
          // mapType: BMAP_NORMAL_MAP, // 地图类型，BMAP_NORMAL_MAP(默认) | BMAP_EARTH_MAP
          // enableAutoResize: Boolean, // 开启自动适应地图容器变化，默认启用
        }
        var map = new BMapGL.Map("map", MapOptions); // 创建Map实例
        var point = new BMapGL.Point(116.316833, 39.998877); // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(point, 10); // 设初始化地图

        // 设置地图类型
        // map.setMapType(BMAP_NORMAL_MAP); // BMAP_NORMAL_MAP | BMAP_EARTH_MAP

        // 开启滚轮缩放
        map.enableScrollWheelZoom(true);

        // 设置3d效果
        map.setHeading(0);
        map.setTilt(0);
        /* var heading = 0
        map.setHeading(heading);
        map.setTilt(70);
        setInterval(() => {
          heading++;
          map.setHeading(heading);
        },500); */

        // 添加控件 https://lbsyun.baidu.com/index.php?title=jspopularGL/guide/widget
        var zoomCtrl = new BMapGL.ZoomControl();
        map.addControl(zoomCtrl);

        // 地图事件 https://lbsyun.baidu.com/index.php?title=jspopularGL/guide/event
        map.addEventListener("zoomstart", function () {
          // console.log(map.getZoom());
        });

        // 个性化地图 https://lbsyun.baidu.com/apiconsole/custommap
        map.setMapStyleV2({
          styleId: "d0eefc8d9976c54241c3562bceb2451b",
        });

        // 地图绘制
        var myIcon = new BMapGL.Icon(
          "https://www.youbaobao.xyz/datav-res/datav/location.png",
          new BMapGL.Size(60, 60),
          {}
        );
        var marker = new BMapGL.Marker(point, { icon: myIcon });
        map.addOverlay(marker);
      }
      window.onload = function () {
        var script = document.createElement("script");
        script.src = "https://api.map.baidu.com/api?v=1.0&type=webgl&ak=4Ef7OoS6xZwZkMS6GA7uRwWe77HG00r1&callback=initMap";
        document.body.appendChild(script);
      };
    </script>
  </body>
</html>

```
