"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    initMap: () => void;
  }
  // 先添加类型声明
  const AMap: any;
}

const GoogleMapComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://webapi.amap.com/maps?v=2.0&key=9f7208f3712c3c2ced8e9b491413b6e6";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const mapElement = document.getElementById("map");
      if (mapElement) {
        // 初始化高德地图
        let marker, map = new AMap.Map(mapElement, {
          zoom: 14,
          center:  [113.96,35.30], // 地图中心点
          features: ['bg', 'road', 'building'], // 地图显示的元素
          mapStyle: 'amap://styles/normal', // 地图样式
          pitch: 45, // 地图俯仰角度
          viewMode: '3D', // 地图模式
        });

        map.plugin(
          [
            "AMap.ToolBar",
            "AMap.Scale",
            "AMap.HawkEye",
            "AMap.MapType",
            "AMap.Geolocation",
            "AMap.ControlBar",
          ],
          function () {
            //添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            map.addControl(new AMap.ToolBar());
        
            //添加比例尺控件，展示地图在当前层级和纬度下的比例尺
            map.addControl(new AMap.Scale());
        
            //添加鹰眼控件，在地图右下角显示地图的缩略图
            map.addControl(new AMap.HawkEye({ isOpen: true }));
        
            //添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
            map.addControl(new AMap.MapType());
        
            //添加定位控件，用来获取和展示用户主机所在的经纬度位置
            map.addControl(new AMap.Geolocation());
        
            //添加控制罗盘控件，用来控制地图的旋转和倾斜
            map.addControl(new AMap.ControlBar());
          }
        );
        // 添加标记
        marker = new AMap.Marker({
          icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          position: [113.953,35.29700001],
          map: map,
          title: "Mylocation"
        });
        marker.setMap(map);
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default GoogleMapComponent;
