/**
 *
根据百分比计算多边形剪切的点
 *
  // @module fan-point
  diameter 半径
 */
//
function getPoint(percentage = 0, diameter = 70) {
  var ret = [];
  var angle = (percentage * 360).toFixed(0);//角度
  if (angle == 0) {
      ret.push("0 0");
  }
  else if (angle == 360) {
      ret.push("0 0");
      ret.push("100% 0");
      ret.push("100% 100%");
      ret.push("0 100% 0");
  }
  else {
      ret.push("50% 0");//
      if (angle <= 45) {
          ret.push(point(((tan(angle) + 1) * diameter)) + "% 0");
      }
      if (angle > 45) {
          ret.push("100% 0");//添加右上角点
      }

      if (angle > 45 && angle <= 90) {
          ret.push("100% " + point((1 - tan(90 - angle)) * diameter) + "%");
      }
      if (angle > 90 && angle <= 135) {
          ret.push("100% " + point(((tan(angle - 90) + 1) * diameter)) + "%");
      }
      if (angle > 90 && angle <= 135) {
          ret.push("100% " + point(((tan(angle - 90) + 1) * diameter)) + "%");
      }

      if (angle > 135) {
          ret.push("100% 100%");//添加右下角点
      }

      if (angle > 135 && angle <= 180) {
          ret.push(point(((tan(180 - angle) + 1) * diameter)) + "% 100%");
      }
      if (angle > 180 && angle <= 225) {
          ret.push(point(((1 - tan(angle - 180)) * diameter)) + "% 100%");
      }

      if (angle > 225) {
          ret.push("0 100%");//添加左下角点
      }

      if (angle > 225 && angle <= 270) {
          ret.push("0 " + point((tan(270 - angle) + 1) * diameter) + "%");
      }
      if (angle > 270 && angle <= 315) {
          ret.push("0 " + point((1 - tan(angle - 270)) * diameter) + "%");
      }

      if (angle > 315) {
          ret.push("0 0");//添加左上角点
      }

      if (angle > 315 && angle < 360) {
          ret.push(point((1 - tan(360 - angle)) * diameter) + "% 0");
      }

      ret.push("50% 50%");
  }
  return ret.toString();
}

function tan(angle) {
  return Math.tan(angle * 2 * Math.PI / 360);
}
function point(leng, diameter = 70) {
  if (leng == 0) {
      return 0;
  }
  else {
      return (leng / (diameter * 2) * 100).toFixed(2);
  }
}

module.exports = {
  getPoint: getPoint
}