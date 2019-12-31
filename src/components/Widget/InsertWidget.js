import React from "react";
import {
  Paper,
  IconButton,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import classnames from "classnames";

// styles
import useStyles from "./styles";

export default function InsertWidget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  ...props
}) {
  var classes = useStyles();

  return (
    <div className={classes.widgetWrapper}>
      <Paper className={classes.paper} classes={{ root: classes.widgetRoot }}>
        <div className={classes.widgetHeader}>
          {!disableWidgetMenu && (
            <IconButton
              color="primary"
              classes={{ root: classes.moreButton }}
              aria-owns="widget-menu"
              aria-haspopup="true"
              onClick={() => {props.insertNew()}}
            >
              <AddIcon />
            </IconButton>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
    </div>
  );
}
