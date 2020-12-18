import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "../../common-components";
import { ShiftDrawerMode } from "./shift-drawer.component";
import { DisplayedShiftData } from "../../../common-models/shift-info.model";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ScssVars from "../../../assets/styles/styles/custom/_variables.module.scss";

const useStyles = makeStyles(() =>
  createStyles({
    tableCellH: {
      fontWeight: "bolder",
      color: ScssVars.primary,
      padding: "0px",
    },
  })
);

interface EnhancedTableProps {
  toggleDrawer: (open: boolean, mode?: ShiftDrawerMode) => void;
}

interface ShiftDataCell {
  id: keyof DisplayedShiftData;
  label: string;
}

const headCells: ShiftDataCell[] = [
  { id: "name", label: "Nazwa zmiany" },
  { id: "hours", label: "Godziny" },
  { id: "code", label: "Skrót" },
  { id: "color", label: "Kolor" },
];

export function EnhancedTableHeaderComponent(props: EnhancedTableProps): JSX.Element {
  const { toggleDrawer } = props;
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          return (
            <TableCell className={classes.tableCellH} key={headCell.id}>
              {headCell.label}
            </TableCell>
          );
        })}
        <TableCell align="right">
          <Button
            variant="primary"
            onClick={(): void => {
              toggleDrawer(true, ShiftDrawerMode.ADD_NEW);
            }}
          >
            Dodaj zmianę
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
