# react 生命周期
## < 16.4
- constructor
- componentWillMount
- render()
- componentDidMount
- willReceivePropsFromState
- shouldComnponentUpdate
- willUpdated(prevProps, prevState, snapshot)
- DidUpdated
- willUnmount

## >=16.4
- static getDrivedStateFromProps(props, state)
- getSnapShotBeforeUpdate(prevProps, prevState)

this.setState(state)
this.setState(state, (newState) => {})
this.setState(() => ({}))

class Comp{
  static propTypes = {

  }
  static defaultProps = {}
}

function Person() {

}
Person.propTypes
Person.defaultProps

- getDrivedStateFromErrors
- componentsDidCatch



