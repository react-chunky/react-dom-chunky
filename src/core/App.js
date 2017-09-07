import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import URL from 'url-parse'

export default class App extends PureComponent{

  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    this._resolve()
    this.setState({ loading: false })
  }

  _resolveTransitionFromURI(uri) {
      const url = new URL(uri, true)
      return {
        name: `show${url.hostname.charAt(0).toUpperCase()}${url.hostname.substring(1).toLowerCase()}`,
        type: url.protocol.slice(0, -1).toLowerCase(),
        route: url.hostname
      }
  }

  _createSectionNavigatorRoutes(element, section) {
    // We want to look at a stack element and figure out its parent chunk;
    // Note that chunks may also have flavours so this looks for the flavor, if any
    const [ chunkName, chunkFlavorName ] = element.split("/")

    // This is our chunk, if it actually exists
    const chunk = this.props.chunks[chunkName]

    if (!chunk) {
      // Let's verify that it actually points to a real chunk
      return
    }

    if (chunkFlavorName && (!chunk.flavors || !chunk.flavors[chunkFlavorName])) {
      // Great, let's check the flavor now
      return
    }

    // Great, so we've cleared the chunk and its flavor, if any, let's check the icon
    // const iconName = `${chunkName}/${ chunkFlavorName ? chunkFlavorName : 'icon' }`

    if (!chunk.routes || chunk.routes.length === 0) {
      // One last thing, let's also make sure the chunk has routes
      return
    }

    // These routes will be the ones we want to parse out of the chunk, as necessary
    var routes = []

    var rootRoute = {}

    // Let's build up global transitions, if any
    var globalTransitions = {}

    if (this.props.transitions) {
        this.props.transitions.forEach(transitionUri => {
          // Let's resolve global transitions
          const transition = this._resolveTransitionFromURI(transitionUri)
          globalTransitions[transition.name] = transition
        })
    }

    var menu = []
    for (let routeName in chunk.routes) {
      // Great, this chunk has routes, let's look through all of them
      var route = chunk.routes[routeName]

      if (Object.keys(rootRoute).length === 0) {
        route.root = true
        route.menuTitle = route.title
        rootRoute = Object.assign({}, route)
      } else {
        route.icon = rootRoute.icon
        route.menuTitle = rootRoute.menuTitle
      }

      // Construct a menu
      menu.push({ id: `${menu.length}`, title: route.menuTitle, link: `/${menu.length === 0 ? '' : route.path}` })

      // Let's build up the transitions, if any
      var transitions = {}

      if (chunk.transitions) {
        chunk.transitions.forEach(transitionUri => {
          // Parse this transition's URI
          const transition = this._resolveTransitionFromURI(transitionUri)

          if (transition.route && chunk.routes[transition.route]) {
            // This is a local transition, so let's resolve locally
            transition.route = `${section.name}/${chunkName}/${transition.route}`
            transitions[transition.name] = transition
            return
          }

          if (globalTransitions[transition.name]) {
            // Let's look through the global transitions, if any
            transitions[transition.name] = Object.assign({}, globalTransitions[transition.name])
          }
        })
      }

      // Let's pass over the theme as well
      const theme = this.props.theme

      // For each route, we want to compose its properties
      const screenProps = Object.assign({
        // Defaults
        strings: {},
        startOperationsOnMount: true
      }, { theme, transitions, ...route, chunkName, menu })

      // Resolve strings
      var resolvedStrings = {}
      for (const string in screenProps.strings) {
        resolvedStrings[string] = this.props.strings[screenProps.strings[string]] || `??${screenProps.strings[string]}??`
      }
      screenProps.strings = Object.assign({}, this.props.strings, resolvedStrings)

      // Now that we have properties, we're ready to initialize the route's screen
      const RouteScreen = route.screen
      const Screen = (props) => {
        return <RouteScreen {...props} {...screenProps}/>
      }
      const ScreenPath = route.path
      routes.push(<Route exact path={`/${routes.length === 0 ? '' : ScreenPath}`} key={ScreenPath} render={(props) => <Screen {...screenProps} {...props} />}/>)
    }

    // We've got ourselves some routes so we should be done with this
    return routes
  }

  _createSectionNavigator(section) {
    if (!section || !section.stack) {
      // We don't even consider stackless sections
      return
    }

    // These are the routes that we need to compile for this section's navigator
    var routes = []
    var menu = []

    // Let's look through the stack and build some routes for this section's navigator
    var elementIndex = 0
    section.stack.forEach(element => {
      var elementRoutes = []
      if (element && typeof element === 'string') {
        // The first kind of element in the sack is a plain string, that signifies a chunk
        elementRoutes = elementRoutes.concat(this._createSectionNavigatorRoutes(element, section))
      } else if (element &&  Array.isArray(element) && element.length > 0) {
        // Another type of element in the sack is a list of strings, that each signifies a chunk
        var composedRoutes = []
        element.forEach(subElement => { composedRoutes = composedRoutes.concat(this._createSectionNavigatorRoutes(subElement, section)) })
        elementRoutes = elementRoutes.concat(composedRoutes)
      }

      routes = routes.concat(elementRoutes)
    })
    return { routes, menu }
  }

  _resolve() {
    this._routes = []
    this._sections = []

    for(const sectionName in this.props.sections) {
      // Look through all the app's sections and for each, build defaults if necessary
      var section = this.props.sections[sectionName]
      section.name = sectionName
      section.layout = section.layout || "default"
      section.navigator = this._createSectionNavigator(section)
      this._sections.push(section)
      this._routes = this._routes.concat(section.navigator.routes)
    }

  }

  get menu() {
    return this._menu || {}
  }

  get routes() {
    return this._routes || []
  }

  get sections() {
    return this._sections || []
  }

  render() {
    if (!this.routes || this.routes.length === 0) {
      return (<div/>)
    }

    return (<Router>
      <div>
        { this.routes }
      </div>
    </Router>)
  }
}
