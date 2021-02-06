import React from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, EnumPanelStyle } from "@amplication/design-system";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <NavigationItem name="Users" to="/users" />
      <NavigationItem name="platforms" to="/platforms" />
      <NavigationItem name="workout_types" to="/workout-types" />
      <NavigationItem name="instructors" to="/instructors" />
      <NavigationItem
        name="instructor_workout_types"
        to="/instructor-workout-types"
      />
      <NavigationItem name="classes" to="/classes" />
    </>
  );
};

export default Navigation;

const NavigationItem = ({
  to,
  name,
}: {
  to: string;
  name: string;
}): React.ReactElement => (
  <Link to={to}>
    <Panel panelStyle={EnumPanelStyle.Bordered}>
      <PanelHeader>{name}</PanelHeader>
      Create, update, search and delete {name}
    </Panel>
  </Link>
);
