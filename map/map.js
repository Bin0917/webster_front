// 베이스 url
const backend_base_url = "#";
const frontend_base_url = "#";
initMap();

// console.log("hi");

// $(function () {
//   initMap();
// });

function initMap() {
  //   const URL = `${backend_base_url}/map/`; // 예시 url 입니다.
  //   function getLatLngData() {
  //     fetch(URL)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         var data = data[0];
  //         console.log(data);
  //       });
  //   } ****************************************************************api 명세서나오면 추가 작성 예정

  async function getMyPageData() {
    // await fetch(API요청을 받는 백엔드 주소), {API요청에 담을 정보}
    const response = await fetch(`${backend_base_url}?아직 해당 링크 없음?}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "X-CSRFToken": csrftoken,
        Authorization: "Bearer " + token, // 토큰 할꺼?
      }
        .then((response) => response.json())
        .then((data) => {
          // 데이터 호출!!
          // var data = data.~~; data 에서 loc, lat, lng 등이 담긴 배열 가져오기
        }),
    });

    // data = await response.json();
    // return data;
  }

  var areaArr = new Array(); // 식당위치를 담는 배열 ( 식당/위도경도 )
  //   var step;
  // for (step = 0; step <= data.#.length; step++ ) 이 반복문으로 들어있는 데이터 갯수 만큼 areaArr.push 수행
  areaArr.push(
    /*식당 이름*/ /*위도*/ /*경도*/
    { location: "상명대", lat: "37.602", lng: "126.955" } // 예시
    // { location: data.~~, lat: data.~~, lng: data.~~ } json 으로 받아온 data 내에서 위치, 위도경도 가져와야함
  );

  let markers = new Array(); // 마커 정보를 담는 배열
  let infoWindows = new Array(); // 정보창을 담는 배열

  for (var i = 0; i < areaArr.length; i++) {
    // 지역을 담은 배열의 길이만큼 for문으로 마커와 정보창을 채워주자 !

    var mapOptions = {
      //지도 띄우기
      center: new naver.maps.LatLng(37.602, 126.955),
      zoom: 17,
    };

    var map = new naver.maps.Map("map", mapOptions);

    var marker = new naver.maps.Marker({
      map: map,
      title: areaArr[i].location, // 식당 이름
      position: new naver.maps.LatLng(areaArr[i].lat, areaArr[i].lng), // 식당의 위도 경도 넣기
    });

    /* 정보창 */ //여기도 for 문 돌려서 data.~~ 에 담긴 인자 갯수만큼 inforWindow 생성 , infoWindows 배열에 push 진행해야함
    var infoWindow = new naver.maps.InfoWindow({
      content:
        '<div style="width:200px;text-align:center;padding:10px"><b>' +
        areaArr[i].location +
        "</b><br> - 종로의 대학교  - </div>", // *******여기도 따로 정보를 가져와서 넣어야 할 듯 !!
    }); // 클릭했을 때 띄워줄 정보 HTML 작성

    markers.push(marker); // 생성한 마커를 배열에 담는다.
    infoWindows.push(infoWindow); // 생성한 정보창을 배열에 담는다.
  }

  function getClickHandler(seq) {
    return function (e) {
      // 마커를 클릭하는 부분
      var marker = markers[seq], // 클릭한 마커의 시퀀스로 찾는다.
        infoWindow = infoWindows[seq]; // 클릭한 마커의 시퀀스로 찾는다

      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker); // 표출
      }
    };
  }

  for (var i = 0, ii = markers.length; i < ii; i++) {
    console.log(markers[i], getClickHandler(i));
    naver.maps.Event.addListener(markers[i], "click", getClickHandler(i)); // 클릭한 마커 핸들러
  }
}

// ------------------------ 목록보기 기능 -----------------------------

const currnetState = false;

document.getElementById("beforeClickResList").onclick = function () {
  popUpResList();
};

function popUpResList() {
  document.getElementById("beforeClickResList").style.display = "none";
  document.getElementById("afterClickResList").style.display = "block";
  document.getElementById("restaurantListContainer").style.height = "400px";
  document.getElementById("restaurantListContainer").style.top = "-40%";

  //   currnetState = True;

  //   //식당 이름 리스트 애니메이션
  //   var list = document.getElementById("afterClickResList");

  //   window.setTimeout(function () {
  //     list.style.opacity = 1;
  //     list.style.transform = "scale(1)";
  //   }, 0);
}

// -------------- 영역 외 클릭시 이벤트 (목록 ON, OFF)----------
document.addEventListener("mouseup", function (e) {
  var container = document.getElementById("afterClickResList");
  var btn = document.getElementById("beforeClickResList");
  if (!container.contains(e.target)) {
    container.style.display = "none";
    btn.style.display = "inline";
    document.getElementById("restaurantListContainer").style.height = "46px";
    document.getElementById("restaurantListContainer").style.top = "-10%";
  }
});
