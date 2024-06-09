import React from "react";
import { NavLink } from "react-router-dom";
import throttle from "lodash/throttle";

/**

  A Link

*/
const MenuItem = function(props) {
  const { className = "menu-item" } = props;
  return (
    <div className={className + "-li"} role="listitem">
      <NavLink activeClassName="active" className={className} {...props}>
        {props.children}
      </NavLink>
    </div>
  );
};

/**

  The three-dot dropdown

*/
class KebabMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // true to display the drop-down options
      popupVisible: false,
      // hack to check if the component has been mounted
      // https://github.com/facebook/react/issues/3417
      // on the first render we cannot set the hidden class because we need its width on the parent menu componentDidMount
      mounted: false
    };
    this.bodyClick = this.bodyClick.bind(this);
    this.switchPopupVisible = this.switchPopupVisible.bind(this);
  }

  switchPopupVisible() {
    this.setState({
      popupVisible: !this.state.popupVisible
    });
  }

  bodyClick(e) {
    if (this.state.popupVisible) {
      this.setState({
        popupVisible: false
      });
    }
  }

  componentDidMount() {
    document.body.addEventListener("click", this.bodyClick);
    this.state.mounted = true;
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.bodyClick);
  }

  render() {
    const { children, className } = this.props;
    const { popupVisible, mounted } = this.state;

    return (
      <div
        role="presentation"
        className={
          className +
          ((!children || !children.length) && mounted ? " hidden" : "")
        }
      >
        <a
          className="kebab-menu-button"
          onClick={this.switchPopupVisible}
          aria-hidden="true"
        >
          <span className="kebab-menu-button-dot" />
          <span className="kebab-menu-button-dot" />
          <span className="kebab-menu-button-dot" />
        </a>

        <div
          className={className + "-contents" + (popupVisible ? "" : " hidden")}
          aria-hidden="false"
        >
          {children}
        </div>
      </div>
    );
  }
}

/**

  Menu will be rendered as a nav with nested links inside
  We are not using ul/li because 

  (a) it's a royal pain in the ass, and 
  (b) https://css-tricks.com/navigation-in-lists-to-be-or-not-to-be/

*/
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementWidths: null
    };
    this.getMenuContainerWidth = this.getMenuContainerWidth.bind(this);
    this.onResize = throttle(this.onResize.bind(this), 200, { leading: false });
    this.myRef = React.createRef();
  }

  // calculate the widths of all children, and trigger render again
  componentDidMount() {
    window.addEventListener("resize", this.onResize, false);
    let elementWidths = this.state.elementWidths;
    if (!elementWidths) {
      // array of widths of each menu item
      // const elementWidths = Object.keys(this.refs).map((ref, index) => {
      const domNode = this.myRef.current;

      // width where we should make the menu fit
      const menuContainerWidth = this.getMenuContainerWidth();
      elementWidths = Array.prototype.map.call(domNode.children, function(
        childDomNode
      ) {
        const ew = childDomNode.offsetWidth;
        return ew;
      });
      this.setState({
        elementWidths,
        menuContainerWidth
      });
    }
  }

  getMenuContainerWidth() {
    const width = this.myRef.current.parentElement.offsetWidth;
    const kebabWidth = 40;
    return width - kebabWidth;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize, false);
  }

  // recalculate menu layout on window resize
  onResize() {
    this.setState({
      menuContainerWidth: this.getMenuContainerWidth()
    });
  }

  render() {
    const { elementWidths, menuContainerWidth } = this.state;
    const {
      children,
      className = "responsive-menu",
      popupClassName,
      ...navProps
    } = this.props;

    // menu items to be displayed on the left
    let menuItems = [];

    // menu items to be collapsed on the right
    let kebabMenuItems = [];

    if (elementWidths) {
      // accumulated widths of menu items displayed on the left
      let accWidth = 0;

      // identify all items that may fit
      React.Children.map(children, function(element, index) {
        // if it's not a string
        if (React.isValidElement(element)) {
          const copy = React.cloneElement(element, {
            key: "__" + index
          });

          if ((accWidth += elementWidths[index]) <= menuContainerWidth) {
            // if elements still fit
            menuItems.push(copy);
          } else {
            // otherwise next under kebab menu
            kebabMenuItems.push(copy);
          }
        }
      });
    } else {
      menuItems = children;
    }

    return (
      <nav
        className={`${className}-nav ${
          !this.state.elementWidths ? " hidden" : ""
        }`}
        {...navProps}
      >
        <div className={className} role="list" ref={this.myRef}>
          {menuItems}
          <KebabMenu className={popupClassName || "kebab-menu"}>
            {kebabMenuItems}
          </KebabMenu>
        </div>
      </nav>
    );
  }
}

export { Menu, MenuItem };