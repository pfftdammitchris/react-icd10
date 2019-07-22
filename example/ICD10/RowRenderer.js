import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import cx from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import MaterialUIInput from '@material-ui/core/Input'
import TableRow from '@material-ui/core/TableRow'
import { IoIosCloseCircle } from 'react-icons/io'
import onlyUpdateForKeys from 'util/onlyUpdateForKeys'
import Cell from './Cell'

const styles = (theme) => ({
  field: {
    '&:hover': {
      '& $closeIcon': {
        visibility: 'visible',
      },
    },
    [theme.breakpoints.down('xs')]: {
      height: 38,
    },
    '& input': {
      padding: 10,
      border: `1px solid ${theme.palette.borders.cool}`,
      fontSize: '0.8rem',
      '&:hover': {
        border: `1px solid ${theme.palette.thirdary.dark}`,
        background: theme.palette.background.lightGrey2,
        color: theme.palette.text.soft,
        '&$highlightedCell': {
          border: 'none !important',
        },
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.7rem',
        padding: 3,
      },
    },
  },
  closeIcon: {
    transform: 'scale(1.6)',
    visibility: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.15s ease-out',
    '&:hover': {
      color: theme.palette.thirdary.dark,
      transform: 'scale(1.7)',
    },
  },
  highlightedCell: {
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.text.normal,
    '&:hover': {
      border: `1px solid ${theme.palette.thirdary.dark}`,
    },
  },
})

const ProviderPortalMeetingICD10RowRenderer = ({
  classes,
  name,
  index,
  delete: deleteRow,
  highlightField,
  isHighlighted,
}) => {
  const cells = ['code', 'description', 'comment']
  const CellRow = React.memo(({ cellName, cellType }) => (
    <Cell colSpan={3}>
      <Field
        FieldSubscription={{ blur: true }}
        name={cellName}
        render={({ input, meta }) => (
          <MaterialUIInput
            className={cx({
              [classes.highlightedCell]: isHighlighted,
            })}
            autoFocus={meta.active || (cellType === 'code' && isHighlighted)}
            {...input}
            disableUnderline
          />
        )}
      />
    </Cell>
  ))

  return (
    <TableRow
      onClick={highlightField(index)}
      className={classes.field}
      key={`${name}${index}`}
      title="notes-icd10-row"
    >
      {cells.map((cellName, index) => (
        <CellRow
          key={`${cellName}${index}`}
          cellName={`${name}.${cellName}`}
          cellType={cellName}
        />
      ))}
      <Cell colSpan={0}>
        <IoIosCloseCircle
          onClick={deleteRow}
          title="Delete this row"
          className={classes.closeIcon}
        />
      </Cell>
    </TableRow>
  )
}

ProviderPortalMeetingICD10RowRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  delete: PropTypes.func.isRequired,
  highlightField: PropTypes.func.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
}

export default onlyUpdateForKeys(['name', 'index', 'isHighlighted'])(
  withStyles(styles)(ProviderPortalMeetingICD10RowRenderer),
)
