import React, { Component } from "react";
import { string, number, func, oneOfType, object } from "prop-types";

import geoIcon from "../../../assets/RegisterForm/icons/geo.png";
import mailIcon from "../../../assets/RegisterForm/icons/mail.png";
import lockIcon from "../../../assets/RegisterForm/icons/lock.png";
import profileIcon from "../../../assets/RegisterForm/icons/profile.png";
import phoneIcon from "../../../assets/RegisterForm/icons/phone.png";

class InputWithIcon extends Component {
  state = {
      icons: {
          geo: geoIcon,
          email: mailIcon,
          lock: lockIcon,
          profile: profileIcon,
          phone: phoneIcon
      },
      error: this.props.error
  };

  componentWillReceiveProps(newProps) {
      this.setState({
          error: newProps.error
      })
  }

  render() {
      const { type, icon, value, name, inputHandler } = this.props;
      const { icons, error } = this.state;

      return (
          <div className="inpwi_wrap">
              <input
                  auto-complete={`${name}-new`}
                  onChange={e => inputHandler(name, e)}
                  value={value}
                  name={name}
                  className={`inpwi${!icon ? " -no-icon" : ""}${error.active ? " -error" : ""}`}
                  type={type}
                  style={{ backgroundImage: `url(${icons[icon]})` }}
              />
              {error.active && <p className="inpwi_error-text">{error.text}</p>}
          </div>
      );
  }
}

InputWithIcon.propTypes = {
    type: string.isRequired,
    icon: string,
    name: string.isRequired,
    value: oneOfType([string, number]).isRequired,
    inputHandler: func.isRequired,
    error: object
};

export default InputWithIcon;
