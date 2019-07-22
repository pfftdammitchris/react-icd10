import React, { useState } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Typography from 'components/common/Typography'
import TableHeader from './TableHeader'
import ICD10Searcher from './ICD10Searcher'
import RowRenderer from './RowRenderer'

const styles = (theme) => ({
  root: {
    padding: '15px 0',
  },
  inputArea: {},
  label: {
    fontSize: '1rem',
    fontWeight: 400,
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },
  add: {
    margin: `${theme.spacing.unit}px 0`,
  },
  addButton: {
    padding: 1,
    fontSize: '0.6rem',
  },
})

const ProviderPortalDrawerNotesICD10 = ({ classes, fields, label }) => {
  const [highlightedField, setHighlightedField] = useState(0)
  const highlightField = (index) => () => setHighlightedField(index)
  const onAdd = () => fields.push({ code: '', description: '', comment: '' })
  const onDelete = (index) => () => fields.remove(index)
  React.useEffect(() => {
    if (highlightedField !== fields.length - 1)
      setHighlightedField(fields.length - 1)
    // eslint will try to automatically put highlightedField into the deps array, but that is not what we want here
    // eslint-disable-next-line
  }, [fields.length])

  return (
    <div className={classes.root}>
      <Typography className={classes.label} variant="subtitle2" darkBlue>
        {label}:
      </Typography>
      <ICD10Searcher
        highlightField={highlightField}
        highlightedField={highlightedField}
        updateField={fields.update}
        popField={fields.pop}
        pushField={fields.push}
        forEachField={fields.forEach}
        removeField={fields.remove}
        totalFields={fields.length}
      />
      <Table padding="checkbox">
        <TableHeader />
        <TableBody>
          {fields.map((name, index) => (
            <RowRenderer
              key={`row_renderer${index}`}
              isHighlighted={highlightedField === index}
              highlightField={highlightField}
              name={name}
              index={index}
              delete={onDelete(index)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

ProviderPortalDrawerNotesICD10.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
}

export default withStyles(styles)(ProviderPortalDrawerNotesICD10)
