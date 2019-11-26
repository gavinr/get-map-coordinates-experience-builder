/** @jsx jsx */
import { AllWidgetProps, BaseWidget, jsx } from "jimu-core";
import { IMConfig } from "../config";

// import { TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'jimu-ui';
import defaultMessages from "./translations/default";

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div
        className="widget-get-map-coordinates jimu-widget"
        style={{ overflow: "auto" }}
      >
        <p>showScale Config value: {this.props.config.showScale.toString()}</p>
        <p>showZoom Config value: {this.props.config.showZoom.toString()}</p>
      </div>
    );
  }
}
