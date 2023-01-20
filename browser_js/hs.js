// 已知数据格式，实现一个函数 fn ，给一个 id 找出链条中其对应的所有的父级 name
// 示例1: 传入 id ddrr2, 返回 广东省深圳市福田区A街道
// 示例2: 传入 id sdsd, 返回 广东省深圳市
var cityData = [{
  id: 'axzx',
  name: '广东省',
  children: [
    {
      id: 'sdsd',
      name: '深圳市',
      children: [
        {
          id: '45dss',
          name: '南山区'
        },
        {
          id: 'sdsd11',
          name: '福田区',
          children: [{
            id: 'ddrr2',
            name: 'A街道'
          }]
        }
      ]
    },
    {
      id: '2323d',
      name: '东莞市',
      children: [
        {
          id: 'xxs2',
          name: 'A区'
        },
        {
          id: 'kklio2',
          name: 'B区',
        }
      ]
    }
  ]
}];


// run(cityData, 'ddrr2');
run(cityData, 'sdsd');
// debug(findAddr);
function run(cityData, addrId) {
	const addrList = [];
	findAddr(cityData, addrId, addrList);
	return addrList;
}

function findAddr(cityData, addrId, addrList) {
	for(let i = 0; i < cityData.length; i++) {
		const item = cityData[i];
		addrList.push({
			id: item.id,
			name: item.name,
		});
		if(item.id === addrId) {
			console.log(getName(addrList)); // 拿到结果
			return true;
		}
		if(item.children?.length) {
			if(findAddr(item.children, addrId, addrList)) {
			   return true;
			}
		}
		addrList.pop();
	}
	console.log(addrList);
}
function getName(list) {
	return list.map(item => item.name).join(',');
}


// function Foo() {
//   getName = function(){ console.log(1); };
//   return this;
// }
// Foo.getName = function() { console.log(2); };
// Foo.prototype.getName = function(){ console.log(3); };
// var getName = function() { console.log(4); };
// function getName(){ console.log(5); };

// Foo.getName();      // 2  // 2
// getName();          // 5  // 4
// Foo().getName();    // 1  // 1
// getName();          // 1  // 1
// new (Foo.getName)(); // 2 // 2
// (new Foo()).getName(); // 1 // 3

 