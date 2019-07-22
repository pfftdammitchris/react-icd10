import withStyles from '@material-ui/core/styles/withStyles'
import TableCell from '@material-ui/core/TableCell'

const ProviderPortalMeetingICD10TableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

export default ProviderPortalMeetingICD10TableCell
