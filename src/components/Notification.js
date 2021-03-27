import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

import { history } from "../helpers";
import { alertService } from "../services";

const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

const defaultProps = {
  id: "default-alert",
  fade: true,
};

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alerts: [],
    };
  }

  componentDidMount() {
    this.subscription = alertService
      .onAlert(this.props.id)
      .subscribe((alert) => {
        if (!alert.message) {
          const alerts = this.state.alerts.filter(
            (x) => x.keepAfterRouteChange
          );

          alerts.forEach((x) => delete x.keepAfterRouteChange);

          this.setState({ alerts });
          return;
        }

        this.setState({ alerts: [...this.state.alerts, alert] });

        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 5000);
        }
      });

    this.historyUnlisten = history.listen(() => {
      alertService.clear(this.props.id);
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
    this.historyUnlisten();
  }

  removeAlert(alert) {
    if (this.props.fade) {
      const alertWithFade = { ...alert, fade: true };
      this.setState({
        alerts: this.state.alerts.map((x) => (x === alert ? alertWithFade : x)),
      });

      setTimeout(() => {
        this.setState({
          alerts: this.state.alerts.filter((x) => x !== alertWithFade),
        });
      }, 250);
    } else {
      this.setState({ alerts: this.state.alerts.filter((x) => x !== alert) });
    }
  }

  render() {
    const { alerts } = this.state;
    if (!alerts.length) return null;
    return (
      <div className="alerts">
        {alerts.map((alert, index) => (
          <Alert
            key={index}
            variant={alert.type}
            onClose={() => this.removeAlert(alert)}
            dismissible
          >
            <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
          </Alert>
        ))}
      </div>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;
