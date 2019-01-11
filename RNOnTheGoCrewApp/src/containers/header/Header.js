import React, { PureComponent } from "react";
import HeaderUI from "./HeaderUI";

type Props = {};

export default class Header extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <HeaderUI {...this.props} />;
	}
}

Header.defaultProps = {};
