import React from 'react';

// 组件复合  类比vue slot分发
export default function () {
  return <ExposureDisappear className="container"
  exposure={e => console.log('上报A页面曝光')}
  disappear={e => console.log('上报A页面消失')}>
    <h2>AAA</h2>
    <h2>AAA</h2>
    <h2>AAA</h2>
    <h2>AAA</h2>
    <h2>AAA</h2>
    <h2>AAA</h2>
    <h2>AAA</h2>
    <h2>AAA</h2>
  </ExposureDisappear>
}

class ExposureDisappear extends React.Component {
  constructor(props) {
    super(props);
    this.id = `${Date.now()}-${Number.parseInt(Math.random() * 1000)}`;
  }
  componentDidMount() {
    this.el = document.getElementById(this.id);
    this.observer = new IntersectionObserver(([inst]) => {
      if(inst.intersectionRatio === 0) {
        this.props?.disappear();
      } else {
        this.props?.exposure();
      }
    }, {
      root: document.documentElement,
      rootMargin: '0px',
      threshold: [0] // 目标元素与根元素相交程度触发cb - [0 - 1]
    });
    this.observer.observe(this.el);
    document.addEventListener('visibilitychange', this.visibilitychange);
  }
  visibilitychange = ()=> {
    requestIdleCallback(() => {
      if(document.visibilityState === 'hidden') {
        this.el.setAttribute('style', 'display: none');
      } else {
        this.el.setAttribute('style', '');
      }
    });
  }
  componentWillUnmount() {
    this.observer?.disconnect();
    this.props?.disappear();
    document.removeEventListener('visibilitychange', this.visibilitychange);
  }
  render() {
    return <div id={this.id}>
      {this.props.children}
    </div>;
  }
}

