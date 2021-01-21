const Exer = require('./exer')
const exercise = Exer.exerDoc

var document = [
  {
    'title': '颈部慢性疼痛缓解方案',
    'mission': '缓解长期错误姿势造成的颈部压力，舒缓肌肉，减少疼痛',
    'exer': [{text: '准备'}, {text: '动作一'}, {text: '动作二'}, {text: '动作三'}, {text: '动作四'}, {text: '动作五'}],
    'detail': [{'准备': '准备器材：瑜伽垫、椅子、桌子'}, {'动作一': '麦肯基坐式头部回缩运动'}, {'动作二': '麦肯基坐式头部回缩运动进阶'}, {'动作三': '麦肯基坐式颈部伸展运动'}, {'动作四': '麦肯基平躺头部回缩运动'}, {'动作五': '麦肯基仰卧颈部伸展运动'}]
  },
  {
    'title': '颈椎病疼痛缓解方案',
    'mission': '缓解颈部肌肉长期劳损，迅速缓解疼痛，改善局部活动度',
    'exer': [{text: '准备'}, {text: '动作一'}, {text: '动作二'}, {text: '动作三'}, {text: '动作四'}, {text: '动作五'}],
    'detail': [{'准备': '准备器材：椅子'}, {'动作一': '斜角肌拉伸'}, {'动作二': '胸椎后伸运动'}, {'动作三': '颈屈旋转拉伸'}, {'动作四': '颈正位屈曲'}, {'动作五': '颈部旋转拉伸'}]
  },
  {
    'title': '颈椎痉挛锻炼方案',
    'mission': '松解肩颈肌肉，减缓因剧烈运动或长期劳损造成的局部肌肉痉挛',
    'exer': [{text: '准备'}, {text: '动作一'}, {text: '动作二'}, {text: '动作三'}, {text: '动作四'}, {text: '动作五'}],
    'detail': [{'准备': '准备器材：椅子'}, {'动作一': '斜角肌拉伸'}, {'动作二': '胸椎后伸运动'}, {'动作三': '颈屈旋转拉伸'}, {'动作四': '颈正位屈曲'}, {'动作五': '颈部旋转拉伸'}]
  },
  {
    'title': '颈椎拉伤锻炼方案',
    'mission': '通过肩颈部拉伸，改善局部血运，促进损伤修复',
    'exer': [{text: '准备'}, {text: '动作一'}, {text: '动作二'}, {text: '动作三'}, {text: '动作四'}, {text: '动作五'}],
    'detail': [{'准备': '准备器材：椅子、瑜伽垫'}, {'动作一': '颈部旋转拉伸'}, {'动作二': '肩胛后缩运动'}, {'动作三': '仰卧颈部卷曲'}, {'动作四': '主动颈部侧弯曲'}, {'动作五': '颈部屈曲'}]
  },
]

module.exports.planDoc = document
module.exports.composeExer = function(name) {
  //计划名称列表，如['颈部慢性疼痛缓解方案', ...]
  var list = document.map(a => a.title)
  // var list = []
  // for(let i=0; i<document.length; i++){
  //   list.push(document[i].title)
  // }
  var index = list.indexOf(name) //如果计划内容是写死的，则根据索引就可以生成计划内容
  var exer = [] //计划内容
  switch(index)
  {
    case 0:
      exer.push(exercise.slice(0, 5))
      break
    case 1:
      exer.push(exercise.slice(5, 10))
      break
    case 2:
      exer.push(exercise.slice(5, 10))
      break
    case 3:
      exer.push(exercise.slice(10, 15))
      break
  }
  return exer
}